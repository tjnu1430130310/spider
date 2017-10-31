var configs = {
  domains: ["douban.com"],
  scanUrls: ["https://read.douban.com/kind/1"],
  //  https://read.douban.com/kind/1?start=40&sort=hot&promotion_only=False&min_price=None&max_price=None&works_type=None
  contentUrlRegexes: [/https:\/\/read\.douban\.com\/ebook\/\d+\//], //内容页url正则
  //  https://read.douban.com/ebook/12066254/
  helperUrlRegexes: [/https:\/\/read\.douban\.com\/kind\/1(\?start=(\d+)&sort=hot&promotion_only=False&min_price=None&max_price=None&works_type=None)/], //列表页url正则 可留空
  enableJS: true, // 设置enableJS为true，那么待爬队列里的所有网页都会自动进行JS渲染
  fields: [
    {
      name: "book_id",
      alias: "书ID",
      selector: "//div[@class='action-buttons']/@data-works-ids"
    },
    {
      // 抽取项
      name: "books_book.title",
      alias: "书名",
      selector: "//h1[contains(@class,'article-title')]", //默认使用XPath
      required: true //是否不能为空
    },
    {
      // 抽取项
      name: "books_book.author",
      alias: "作者",
      selector: "//p[contains(@class, 'author')]//span[contains(@class, 'labeled-text')]//a[contains(@class, 'author-item')]",
      required: true //是否不能为空
    },
    {
      // 抽取项
      name: "books_book.img",
      alias: "封面",
      selector: "//div[contains(@class, 'cover shadow-cover')]//img"
    },
    {
      name: "books_book.publisher",
      alias: "出版商",
      selector: "//span[contains(@itemprop, 'publisher')]"
    },
    {
      name: "books_book.publication_date",
      alias: "出版日期",
      selector: "//span[contains(@itemprop, 'datePublished')]"
    },
    // 步骤三：抽取出每页评价的内容
    {
      name: "comments",
      alias: "评论",
      selector: "//div[@id='sjs']/span", // 3、抽取出每页评价的内容
      repeated: true,
      enableJS: true,
      children: [
        { // 需要先定义"comments"最终的子抽取项,
          
          // 通过XPath提取出每页评论的页码
              name: "page", // 页码
              selector: "//text()",
              required: true,
          // 并将最终不需要的子抽取项"transient"设为"true"
             transient: true
        },
        {
          // 通过"attachedUrl"访问每页评论并爬取该页的所有评论
          name: "comments_comment",
          alias: "评论",
          sourceType: SourceType.AttachedUrl,  // attachedUrl表示在抽取过程中另发请求，再从返回的数据中抽取数据
          //  https://read.douban.com/ebook/958945/reviews?start=25&sort=score
          attachedUrl: "https://read.douban.com/ebook/{$.book_id}/reviews?start={page}&sort=score",
          enableJS: true,
          //selectorType: SelectorType.JsonPath, // 返回的数据是json，使用JsonPath抽取数据
          selector: "//li[contains(@itemscope, 'itemscope')]",
          repeated: true,
          //transient: true,
          children: [
            {
              name: "comments_content",
              alias: "内容",
              //selectorType: SelectorType.JsonPath,
              selector: "//div[contains(@itemprop, 'description')]",
              repeated: true
            },
            {
              name: "username",
              alias: "评价者",
              //selectorType: SelectorType.JsonPath,
              selector: "//meta[@itemprop='name']/@content",
              repeated: true
            },
            {
              name: "score_rating",
              alias: "评分",
              //selectorType: SelectorType.JsonPath,
              selector: "//meta[@itemprop='ratingValue']/@content",
              repeated: true
            },
            {
              name: "created_time",
              alias: "评论时间",
              //selectorType: SelectorType.JsonPath,
              selector: "//meta[@itemprop='datePublished']/@content",
              repeated: true
            }
          ]
        }
      ]
    }
  ]
};


// configs.afterDownloadAttachedPage = function(page, site) {
//     // "scanUrl"是包含某酒店房型价格的网页url
//     // 网页渲染后, 默认评论内容是折叠状态
//     //console.log(page.url);
//     // 获取到该网页中"加载评论"这个a标签的XPath
//     var xpath = "//a[@class='btn-view-detail']";
//     var options = {
//         method: "GET",
//         events: [
//             {
//                 // 在JS渲染网页后模拟点击"加载评论"a标签,
//                 // 页面内容会自动渲染更新为"加载评论"的加载信息,
//                 // 从而方便抽取需要的数据
//                 "click": xpath
//             }
//         ]
//     };
//     // 将带"options"的该网页添加到待爬队列中
//     site.addUrl(page.url, options);
//     return page;
// };


/*
  回调函数afterDownloadPage：对下载的网页进行处理，返回处理后的网页内容系统再进行数据抽取
*/
configs.afterDownloadPage = function(page, site) {
  //  https://read.douban.com/ebook/958945/reviews?start=25&sort=score
  var matches = /read\.douban\.com\/ebook\/(\d+)\//.exec(page.url);  

  //  如果当前下载的页面是内容页，需要先将要在抽取过程中发送的请求链接（获取评价）信息添加到页面中，方便抽取
  if (!matches) return page;

  // 步骤一：获取当前内容页的评论总页数  // 1、首先从内容页获取评价的总数
  var commentsCount = extract(page.raw, "//h3[contains(text()[1],'评论')]/span");
  commentsCount = parseInt(commentsCount);
  var commentsPageCount = Math.ceil(commentsCount/25); //根据总评价数算出总评价页数

  //  https://read.douban.com/ebook/958945/reviews?sort=score

  // 步骤二：将拼凑的HTML代码添加到当前内容页中  // 2、然后将评价的每个页码添加到内容页中返回处理
  // 将所有评论页码拼凑成HTML代码
  var extraHTML = '<div id="sjs">'; // id设置为一个特殊的值，方便抽取
  for (var i = 0; i < commentsPageCount; i++) {
    extraHTML += '<span>' + i*25 + '</span>';
  }
  extraHTML += '</div>';
  var index = page.raw.indexOf("</body>");
  page.raw = page.raw.substring(0, index) + extraHTML + page.raw.substring(index);
  //console.log(index);
  
  return page;
};

/*
  afterExtractPage：对抽取的整页数据进行处理
*/
configs.afterExtractPage = function(page, data, site) {
  console.log(data.book_id);
  if(!data.book_id)   console.log(data.page.url);
  
  if (!data.comments) return data;
  
  // 4、将抽取的每页评价数据拼成一个数组返回
  // 步骤四：将每页评论的评论数组拼成一个评论数组并重新赋值给"comments"抽取项
  var comments = [];
    for (var i = 0; i < data.comments.length; i++) {
        var pageComments = data.comments[i];
        for (var j = 0; j < pageComments.comments_comment.length; j++) {
            comments.push(pageComments.comments_comment[j]);
        }
    }
    data.comments = comments;
  
    return data;
};



var crawler = new Crawler(configs);
crawler.start();
