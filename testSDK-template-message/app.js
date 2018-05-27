//app.js
App({
  onLaunch: function() {
    require('./vendor/sdk-v1.1.0b.js')
    // require('./vendor/sdk-v1.1.0.js')
    wx.BaaS.init('e2a4421678bb43dd6d31')
  }
})