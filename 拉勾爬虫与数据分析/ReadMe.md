# 参考文献
《数据分析师挣多少钱？“黑”了招聘网站告诉你！》网址：https://zhuanlan.zhihu.com/p/25704059

《如何用Python做中文分词》网址：http://www.jianshu.com/p/721190534061

# 正文

## 想法
学了一点数据分析的概念，突然想要看看Python的就业形势怎样，于是就想试试使用数据分析一下。数据整理和清洗没做好，接下来会继续认真学习数据分析。

## 爬虫、数据来源和数据集
数据来自拉勾网，通过神箭手云爬虫工具爬取数据。主要使用Pandas作为数据整理和统计分析的工具，jieba作为分词工具，wordcloud制作词云，使用matplotlib画图。代码在https://github.com/tjnu1430130310/spider/blob/master/%E6%8B%89%E5%8B%BE%E7%88%AC%E8%99%AB%E4%B8%8E%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/Lagou_python_by20171107.ipynb
爬虫代码和数据集稍后给出。

## 地域分布
![](https://github.com/tjnu1430130310/spider/blob/master/拉勾爬虫与数据分析/img/city_count.png)
在拉勾网上，全国有34个城市的企业需求python人才，其中大多数需求产生于北京市。需求量排在前5的分别是：北京、上海、深圳、杭州、广州。需要大量使用python编程语言的职业大量集中在北上广深四大一线城市，以及杭州这个互联网和电子商务企业的聚集地。我国大量互联网企业在北京聚集，因而北京市占据了巨大的需求比重。

python人才的工作机会集中在北上广深以及杭州；另一个方面，这些城市也都集中了大量的各行业人才，机遇与挑战并存。(这一大段话其实都是胡说八道，捂脸)

## 薪酬分布
![](https://github.com/tjnu1430130310/spider/blob/master/%E6%8B%89%E5%8B%BE%E7%88%AC%E8%99%AB%E4%B8%8E%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/img/min_salary.png)
拉勾网薪酬值是一个区间值，并且有虚高的现象存在，保守起见所以取区间最小值作为代表值进行分析。分析结果如图。薪酬状态忽高忽低，分别集中在10k到14k之间。。。

## 不同城市薪酬分布
![](https://github.com/tjnu1430130310/spider/blob/master/%E6%8B%89%E5%8B%BE%E7%88%AC%E8%99%AB%E4%B8%8E%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/img/data_by7city_min_salary.png)
各地的薪酬相差无几，较高的在北京、深圳、上海，成都、广州稍低。。。为什么我的箱型图上会有圈圈呢？

## 工作经验分布
![](https://github.com/tjnu1430130310/spider/blob/master/%E6%8B%89%E5%8B%BE%E7%88%AC%E8%99%AB%E4%B8%8E%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/img/JingYan.png)
python语言开发的工作经验需求集中在1-3年；python语言目前较为年轻，国内引进较晚，暂时没有出现10年以上工作经验需求。。。呃。。。？

## 不同工作经验薪酬分布
![](https://github.com/tjnu1430130310/spider/blob/master/%E6%8B%89%E5%8B%BE%E7%88%AC%E8%99%AB%E4%B8%8E%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/img/salary_by_JingYan.png)
薪酬随经验上升而上升

## 职业技能关键词
![](https://github.com/tjnu1430130310/spider/blob/master/%E6%8B%89%E5%8B%BE%E7%88%AC%E8%99%AB%E4%B8%8E%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/img/wordcloud_by_pyplot.png)
需要忽略“nbsp”和“br”（数据没清洗干净。。。）
python开发主要是web开发，web框架有django、Flask，环境使用Linux，数据库多使用MySQL，需要一些爬虫、Java、php和asp的经验，需要团队意识。

### 未完待续
