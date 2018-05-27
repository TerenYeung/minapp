//app.js
App({
  onLaunch: function () {
    // 引入 BaaS SDK
    require('./lib/sdk-v1.1.0')

    // 从 BaaS 后台获取 ClientID
    let clientId = this.globalData.CLIENT_ID

    wx.BaaS.init(clientId)

    let userId = this.getUserId()
    if (!userId) {
      wx.BaaS.login()
        .then(res => {
          console.log('BaaS is logined!')
        }).catch(err => {
          console.dir(err)
        })
    }
  },
  getUserId() {
    if (this.userId) {
      return this.userId
    }

    this.userId = wx.BaaS.storage.get('uid')
    return this.userId
  },
  globalData: {
    systemInfo: {},
    CLIENT_ID: '3a459411e8fb2d922740',
    TABLE_ID: {
      BANNER: 2645,
      PRODUCTS: 2662,
    },
  }
})