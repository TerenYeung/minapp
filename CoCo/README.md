# 使用 Trigger 实现简易的文章推荐功能

## 前言

如果你是文字工作者，一个时常遇到的需求是向用户推送精选文章。

为满足类似这般业务需求，知晓云为广大用户在引擎模块提供一个触发器的功能。

## 触发器 

触发器的执行过程实际是通过事件的，当前知晓云的触发器的事件类型包括：数据表的更新以及微信支付事件。

举个简单的例子，当用户在小程序中进行注册后，将会在知晓云的数据表建立一条数据，此时如果在触发器中设置一条触发功能：
当 user 表（存放用户信息的表）中有新用户注册时，就向用户的邮件发送一封回执信。

以上就是一个使用触发器的简单场景。

关于详细的触发器功能介绍，详见[](http://support.minapp.com/hc/kb/article/1080135/)。

## 文章推荐功能的开发

在本文中，笔者将带各位同学实现一个简易的文章推荐功能。

首先，讲一下大致的开发思路：

1. 在知晓云开发平台的内容库中创建需要展示的文章

2. 文章列表页和文章详情页的开发

3. 在触发器中设置触发事件和触发条件

### 1. 在内容库中创建需要展示的文章

知晓云在数据模块提供 2 个内置表**_userprofile** 和 **_richtextcontent**，**_userprofile** 表存储了授权后的小程序的用户信息, 而 **_richtextcontent** 表存储了内容库模块所创建的文章的记录。

在本文中，我们主要利用 **_richtextcontent** 表去扩展内容库的文章字段。

内容库的文章创建/编辑面板的默认字段为 **标题**、**分类**、**封面图**和**摘要**。

![创建内容默认字段示意图](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1ecS4mhWYPXQBQvV.png)

通过在 **_richtextcontent** 中添加 **author**、**about** 和 **recommend** 字段，为文章添加额外的信息。

接下来我们在内容库模块添加 2 篇文章：

![创建内容示意图](https://cloud-minapp-9472.cloud.ifanrusercontent.com/1ecSJMHDjnqiXhcJ.png)

![内容库列表](https://cloud-minapp-9472.cloud.ifanrusercontent.com/1ecSKYvIUMCUStvm.png)

### 2. 文章列表页和文章详情页的开发

小程序的项目目录结构如下：

```
.
├── README.md
├── app.js
├── app.json
├── app.wxss
├── lib
│   ├── sdk-v1.1.4.js
│   └── wxParser
├── pages
│   ├── articleDetail
│   └── index
└── project.config.json
```

在 index.js 中，我们在首页加载完的阶段拉取文章列表，此时就可以在知晓云提供的获取文章列表接口中拿到在内容库中创建的两篇文章的数据。

关于内容库相关接口详情知晓云[开发文档](https://doc.minapp.com/content/operate.html)。

```
// pages/index/index.js

Page({
  data: {
    contentList: null,
    avatar: '',
  },
  onLoad(opts) {
    // 获取文章列表
    this.getContentList()
      .then(res => {
        let ret = res.data.objects.map(item => {
          // 对 Unix 时间戳的处理
          item.created_at = this.formatTime(item.created_at)
        })
        this.setData({
          contentList: res.data.objects,
        })
      })
    
    let userinfo = wx.BaaS.storage.get('userinfo')
    this.setData({
      avatar: userinfo.avatarUrl
    })
  },
  getContentList() {
    // 定义在 app.js 中 globalData 属性下，知晓云平台的存放文章的内容库 ID
    let CONTENT_GROUP_ID = app.globalData.CONTENT_GROUP_ID
    // 知晓云提供的关于内容库操作的相关接口，详见开发文档
    let CG = new wx.BaaS.ContentGroup(CONTENT_GROUP_ID)

    return CG.orderBy('-created_at').find()
  },
  formatTime(timestamps) {
    let d = new Date(timestamps * 1000)
  
    let
      year = d.getFullYear(),
      month = (d.getMonth() + 1),
      date = d.getDate(),
      hours = d.getHours(),
      minutes = d.getMinutes(),
      seconds = d.getSeconds()
  
    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds
  
    return `${hours}:${minutes}:${seconds}，${month} 月 ${date} 日`
  },
})
```

![文章列表示意图](https://cloud-minapp-9472.cloud.ifanrusercontent.com/1ecSQoDKLRSoWmJk.png)

在 articleDetail.js 中，我们再开发文章详情页的页面逻辑。

文章详情页是用户通过点击首页的某篇文章作为交互入口的，因此需要在文章列表中绑定点击事件。

```
// pages/index/index.wxml
<view>
<!-- 顶部栏部分代码 -->
<view class="article-list">
    <scroll-view
      scroll-y
      bindscrolltoupper="upper" bindscrolltolower="lower">
      <view
        class="article-item"
        wx:for="{{contentList}}"
        wx:key="{{item.id}}"
        data-cid="{{item.id}}"
        bindtap="gotoDetail"
        >
        <!-- 文章具体条目代码 -->
        </view>
    </scroll-view>
</view>
</view>
```

在 index.js 中，我们设置一个 **gotoDetail** 的事件回调函数以及调用 wx.navigateTo 方法进行页面的跳转。

```
// pages/index/index.js
Page({
  gotoDetail(e) {
    // 通过 event 对象可以获取绑定在当前节点上的 dataset 属性的数据
    let cid = e.currentTarget.dataset.cid
    let url = `/pages/articleDetail/articleDetail?cid=${cid}`
    wx.navigateTo({
      url,
    })
  }
})
```

接下来是文章详情页的开发，通过首页路由传参跳转方式，我们可以在 **articleDetail.js** 中获取到当前文章的 id。

此时，我们可以在文章详情页的加载阶段调用知晓云的获取文章详情接口获取对应 id 的文章详情数据，值得注意的是我们需要将返回的数据的 **content** 字段的 HTML 富文本渲染为 wxml ，所以使用一款 HTML 转 wxml 的解析器，这里笔者选用了 [wxParser](https://github.com/ifanrx/wxParser)。

首先，我们需要分别在 articleDetail.wxml、articleDetail.wxss 和 articleDetail.js 中分别引入对应的 wxParser 文件。

引入 wxparser.wxml 模板用于内容的渲染；

```
// pages/articleDetail/articleDetail.wxml
<import src="path/to/wxparser.wxml">

<!-- 文章详情页代码 -->
<view class="article-detail">
  <view class="article-detail">
    <template is="wxParser" data="{{wxParserData:richText.nodes}}" />
  </view>
</view>
```

引入 wxparser.js 用于将拉取到的文章详情数据绑定到视图层；

```
// pages/articleDetail/articleDetail.js
const wxParser = require('path/to/wxparser.js')

// 文章详情页代码
var app = getApp()
Page({
  data: {
    article: null,
  },
  onLoad(opts) {
    // 通过首页传递的文章 id
    let cid = opts.cid
    this.renderContent(cid)
  },
  renderContent(id) {
    this.getArticle(id)
      .then(res => {
        wxParser.parse({
          bind: 'richText',
          html: res.data.content || '' ,
          target: this,
        })
      })
  },
  getArticle(cid) {
    // 在内容库模块创建的内容库 id
    let CONTENT_GROUP_ID = app.globalData.CONTENT_GROUP_ID
    let richTextID = cid
    let CG = new wx.BaaS.ContentGroup(CONTENT_GROUP_ID)
    
    return CG.getContent(richTextID)
  }
})
```

引入 wxParser 的样式用于渲染 wxparser 模板；

```
// pages/articleDetail/articleDetail.wxss
@import '../../lib/wxParser/index.wxss';
// 文章详情页代码
```

文章详细页的效果图如下：

![](https://cloud-minapp-3906.cloud.ifanrusercontent.com/1ecUJ7VBnuSqJIiL.png)

接下来，我们在右下角设计一个“当日文章推荐”的按钮，以模板消息的形式给用户发送当日的推荐文章。

目前，模板消息通过支付和提交表单的两种方式完成。

在本文中，我们采用提交表单的方式实现模板消息的发送。

```
// pages/index/index.wxml

<view class="index">
  <!-- some code here -->
  <form bindsubmit="formSubmit" report-submit>
      <button
        class="book-btn"
        formType="submit" size="default">
        <view>当日</view>
        <view>文章</view>
        <view>推荐</view>
      </button>
  </form>
</view>
```

页面的 **<form/>** 组件的属性report-submit为true时，可以声明为需发模板消息，此时点击按钮提交表单可以获取formId，用于发送模板消息。

具体使用方法可参考[小程序开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/form.html)。

然后，我们在 **index.js** 脚本中将用户点击后获取到的 **formid** 通过 **wx.BaaS.wxReportTicket** 上传给知晓云的服务器，后续的发送模板消息所需要的一些请求发送操作交由知晓云去做。

```
// pages/index/index.js

Page({
  formSubmit(e) {
    let formID = e.detail.formId
    // 知晓云提供的封装的发送模板消息的接口
    // 具体使用方法，详见知晓云开发手册：https://doc.minapp.com/templateMessage/
    wx.BaaS.wxReportTicket(formID)
  },
})
```

### 3. 在触发器中设置触发事件和触发条件

在第 2 节，我们已经在小程序端完成了模板消息的发送逻辑，接下来的环节就是在知晓云的引擎模块中配置触发器，以真正实现模板消息的发送功能。
首先，进入引擎模块，添加一个触发器。

触发类型有数据表和微信支付，我们设置触发器的逻辑是通过将每日新增的文章的其中一篇的 recommend 字段设置为 **true** 后，就发送模板消息。因此，我们需要监听的事件是数据表的内容的变化，因此触发类型选择数据表。

![1-配置触发器](http://o97duqgf5.bkt.clouddn.com/18-1-21/62139619.jpg)

第 2 步中，我们将进一步设置详细的触发事件的条件，设置 **_richtextcontent** 表中的 recommend 字段设置为 true 这一条件。

![2-设置条件](http://o97duqgf5.bkt.clouddn.com/18-1-21/45300052.jpg)

第 3 步是设置触发事件后的动作，如果你在之前没有在小程序后台创建过模板消息的话，那么在触发器面板会出现以下场景：

![3-设置动作](http://o97duqgf5.bkt.clouddn.com/18-1-21/74836800.jpg)

因此，你需要先在小程序后台创建模板消息。

登录小程序后台后，按照以下几个流程就可以创建一个模板消息。

![模板消息-1](http://o97duqgf5.bkt.clouddn.com/18-1-21/29156452.jpg)

![模板消息-2](http://o97duqgf5.bkt.clouddn.com/18-1-21/48557452.jpg)

![模板消息-3](http://o97duqgf5.bkt.clouddn.com/18-1-21/86671573.jpg)

在小程序后台创建完模板消息后，回到知晓云开发者平台，你就可以设置动作：

![3-设置动作](http://o97duqgf5.bkt.clouddn.com/18-1-21/20425781.jpg)

到此，所有的开发工作就已经完成了，接下来就让我们测试一下实际的效果。

