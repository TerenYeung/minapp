import config from './config/config'
//app.js
App({
  onLaunch: function() {

    require('./utils/sdk-v1.0.3.js');
    wx.BaaS.init(config.BAAS_CLIENT_ID);


    wx.BaaS.login().then(res => {

    }).catch(err => {
      console.log(err);
    });


  },

})
