import config from '/config/config'

//app.js
App({

  onLaunch: function() {

    let that = this

    require('/utils/sdk-v1.0.2.js')


    // 完成BaaS的验证和登录
    wx.BaaS.init(config.BAAS_CLIENT_ID)

    const userId = this.getUserId()

    if (!userId) {
      wx.BaaS.login()
        .then(res => {
          console.log('BaaS is logined...')
        }).catch(err => {
          console.log(err)
        })
    }
  },

  getUserId() {
    if (this.userId) {
      return this.userId
    }

    const userId = wx.BaaS.storage.get('uid')
    this.userId = userId

    return userId
  },

  /**
   * 跳转到首页，根据当前页面栈的层级判断调用 wx.redirectTo 或 wx.navigateBack 方法
   * 整个页面不超过三层路由
   */
  navToHome() {
    const currentPages = getCurrentPages();
    const currentPagesLen = currentPages.length;
    console.log(currentPages)

    if (currentPagesLen === 1) {
      wx.redirectTo({
        url: config.ROUTE.NAVIGATOR,
      });
    } else {
      wx.navigateBack({
        delta: currentPagesLen
      });
    }
  },

})