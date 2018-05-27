//index.js
//获取应用实例
const wxParser = require('../../lib/wxParser/index')

var app = getApp()
Page({
  data: {
    article: null,
  },
  onLoad(opts) {
    let cid = opts.cid
    this.renderContent(cid)
  },
  renderContent(id) {
    this.getArticle(id)
      .then(res => {
        wxParser.parse({
          bind: 'richText',
          html: res.data.content || '<p>Hello</p>' ,
          target: this,
        })
      })
  },
  getArticle(cid) {
    let CONTENT_GROUP_ID = app.globalData.CONTENT_GROUP_ID
    let richTextID = cid
    let CG = new wx.BaaS.ContentGroup(CONTENT_GROUP_ID)
    
    return CG.getContent(richTextID)
  }
})