//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    contentList: null,
    avatar: '',
  },
  onLoad(opts) {
    this.getContentList()
      .then(res => {
        let ret = res.data.objects.map(item => {
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
    let CONTENT_GROUP_ID = app.globalData.CONTENT_GROUP_ID
    let CG = new wx.BaaS.ContentGroup(CONTENT_GROUP_ID)

    return CG.orderBy('-created_at').find()
  },
  gotoDetail(e) {
    console.dir(e)
    let cid = e.currentTarget.dataset.cid
    let url = `/pages/articleDetail/articleDetail?cid=${cid}`
    wx.navigateTo({
      url,
    })
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
  
    return `${month} 月 ${date} 日 ${hours}:${minutes}:${seconds} `
  },
  formSubmit(e) {
    let formID = e.detail.formId
    let tableID = 22969
    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.create()
    let payload = {
      name: 'teren',
    }

    product.set(payload).save()
      .then(res => {
        console.log('formID', formID)
        wx.BaaS.wxReportTicket(formID)
      })
  },
  payModal() {
    wx.showModal({
      title: 'VIP 服务支付提示',
      content: '成为 VIP，将要支付 100 元',
      success(res) {
        if (res.confirm) {
          let params = {
            totalCost: 100,
            merchandiseDescription: 'VIP 服务套餐'
          }
          wx.BaaS.pay(params)
            .then(res => {
              console.log('pay success', res)
            })
        } else if (res.cancel) {

        }
      }
    })
  }
})