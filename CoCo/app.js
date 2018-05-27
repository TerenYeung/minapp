//app.js
App({
  onLaunch: function () {
    // 引入 BaaS SDK
    require('./lib/sdk-v1.3.0a')
    let CLIENT_ID = this.globalData.CLIENT_ID
    wx.BaaS.init(CLIENT_ID)
    wx.BaaS.login()
      .then(res => {
        // ...
      })
      .catch(err => {})
  },
  globalData:{
    CLIENT_ID: '835a69481e98fbc5bf6a',
    CONTENT_GROUP_ID: '1516264856733759',
    USER_ID: 25089,
  }
})