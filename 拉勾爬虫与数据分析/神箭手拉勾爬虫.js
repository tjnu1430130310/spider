var configs = {
  domains: ["lagou.com"],
  scanUrls: ["https://www.lagou.com/jobs/list_python?cl=false&fromSearch=true&labelWords=&suginput="],
  contentUrlRegexes: ["https://www\\.lagou\\.com/jobs/\\d+\\.html"],
  helperUrlRegexes: ["https://www\\.lagou\\.com/jobs/positionAjax\\.json\\?needAddtionalResult=false&isSchoolJob=0"],
  fields: [
    {
      name: "positionName",
      alias: "职位",
      selector: "/html/body/div[2]/div/div[1]/div/span"
    },
    {
      name: "company",
      alias: "公司状况",
      selector: "//*[@id='job_company']",
      children : [
        {
          name: "companyFullName",
          alias : "公司全称",
          selector : "//dt/a/img/@alt"
        },
        {
          name: "field",
          alias : "领域",
          selector : "//dd/ul/li[1]"
        },
        {
          alias : "发展阶段",
          selector : "//dd/ul/li[2]",
          name: "development_stage"
        },
        {
          name: "scale",
          alias : "规模",
          selector : "//dd/ul/li[3]"
        },
        {
          name: "homepage",
          alias : "公司主页",
          selector : "//dd/ul/li[4]"
        }
      ]
    },
    {
      name: "publish_time",
      alias: "发布时间",
      selector: "//dd/p[contains(@class, 'publish_time')]"
    },
    {
      name: "education",
      alias: "学历",
      selector: "/html/body/div[2]/div/div[1]/dd/p[1]/span[4]"
    },
    {
      name: "JingYan",
      alias: "工作经验",
      selector: "/html/body/div[2]/div/div[1]/dd/p[1]/span[3]"
    },
    {
      name: "salary",
      alias: "工资范围",
      selector: "/html/body/div[2]/div/div[1]/dd/p[1]/span[1]"
    },
    {
      name: "position_label",
      alias : "职位标签",
      selector : "/html/body/div[2]/div/div[1]/dd/ul"
    },
    {
      name: "destription",
      alias: "职位描述",
      selector: "//*[@id='job_detail']/dd[2]/div"
    },
    {
      name:"city",
      alias : "城市",
      selector : "/html/body/div[2]/div/div[1]/dd/p[1]/span[2]"
    },
    {
      name: "address",
      alias: "工作地点",
      selector: "//*[@id='job_detail']/dd[3]/div[1]"
    }
  ]
};


configs.beforeCrawl = function(site) {
  var helperUrl = "https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&isSchoolJob=0"
  var options = {
    method: "post", // 列表页是post请求
    headers: {
      referer: "https://www.lagou.com/jobs/list_python?labelWords=&fromSearch=true&suginput"
    },
    data: { // post请求的参数
      first: true,
      kd: "python",
      pn: 1
    }
  };
  // 将第一页列表页（包括post请求的参数）添加到待爬队列中
  site.addUrl(helperUrl, options);
};

configs.onProcessScanPage = function(page, content, site) {
  //取消自动从入口页发现新链接
  return false;
};

/*
  回调函数onProcessHelperPage：
  获取下一页列表页以及从列表页中获取内容页链接，并手动添加到待爬队列中
*/
configs.onProcessHelperPage = function(page, content, site) {
  // 列表页返回的数据是json，需要先转换成json格式
  var jarr = JSON.parse(content);
  //console.log(jarr);
  var pn = jarr.content.pageNo;
  var pagesize = jarr.content.pageSize;
  for (var i = 0; i < pagesize; i++) {
    console.log( pn + "/"+ totalpn + "页. " + ((pn-1)*15+i+1) + "/" + totalCount + "个");
    var positionID = jarr.content.positionResult.result[i].positionId;
    //console.log("positionID: " + jarr.content.positionResult.result[i].positionId);
    // 将拼出的新url添加到待爬队列中
    var contentUrl = "https://www.lagou.com/jobs/" + positionID + ".html";
    console.log("contentUrl: " + contentUrl);
    site.addUrl(contentUrl);
  }
  
  var nextpn = pn + 1;
  var helperUrl = "https://www.lagou.com/jobs/positionAjax.json?needAddtionalResult=false&isSchoolJob=0"
  var options = {
    method: "post",
    headers: {
      referer: "https://www.lagou.com/jobs/list_python?labelWords=&fromSearch=true&suginput"
    },
    data: {
      first: false,
      kd: "python",
      pn: nextpn
    },
    reserve: true // 列表页的url是一样的，神箭手默认不会将重复的url添加至待爬队列。所以要设置reserve为true，表示强制将此url插入待爬队列中
  };
  // 将下一页列表页（包括post请求的参数）添加到待爬队列中
  site.addUrl(helperUrl, options);

  return true; // 返回true表示从当前列表页中自动发现新的链接，从而避免添加无用的链接，提高爬取速度
};

configs.onProcessContentPage = function(page, content, site) {
  //console.log("onProcessContentPage.page: " + page.raw);
  //取消自动从内容页发现新链接
  return false;
};

var crawler = new Crawler(configs);
crawler.start();
