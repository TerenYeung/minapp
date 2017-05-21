module.exports = {
  tabs: [{
    id: 'it',
    value: '科技IT',
    length: 84
  }, {
    id: 'design',
    value: '创意设计',
    length: 112
  }, {
    id: 'fashion',
    value: '时尚服装',
    length: 112
  }, {
    id: 'culture',
    value: '休闲文化',
    length: 112
  }, {
    id: 'washroom',
    value: '洗手间',
    length: 84
  }],
  markers: [{
    meta: {
      id: 'it',
      category: '科技IT'
    },
    data: [{
      id: 'wechat',
      latitude: 23.099994,
      longitude: 113.324520,
      iconPath: '/resources/0@3x.png',
      width: 32,
      height: 40,
      callout: {
        content: 'wechat',
        bgColor: '#EEE'
      }
    }, {
      id: 'ifanr',
      longitude: 113.323990,
      latitude: 23.099440,
      iconPath: '/resources/0@3x.png',
      width: 32,
      height: 40,
      callout: {
        content: 'ifanr',
        bgColor: '#EEE'
      }
    }, {
      id: 'maka',
      longitude: 113.326000,
      latitude: 23.099090,
      iconPath: '/resources/0@3x.png',
      width: 32,
      height: 40,
      callout: {
        content: 'MAKA',
        bgColor: '#EEE'
      }
    }]
  }, {
    meta: {
      id: 'design',
      category: '创意设计'
    },
    data: []
  }],
  controls: [{
    id: 'myLocation',
    iconPath: '/resources/my-location@3x.png',
    clickable: true,
    position: {
      left: 0,
      top: 489,
      width: 48,
      height: 48
    }
  }, {
    id: 'car',
    iconPath: '/resources/stop-find-car@3x.png',
    clickable: true,
    position: {
      left: 303,
      top: 480,
      width: 64,
      height: 64,
    }
  }, {
    id: 'news',
    iconPath: '/resources/news@3x.png',
    clickable: true,
    position: {
      left: 303,
      top: 406,
      width: 64,
      height: 64,
    }
  }],
  activeMerchantList: [{
    id: 'wechat',
    title: '微信'
  }, {
    id: 'ifanr',
    title: '爱范儿'
  }, {
    id: 'maka',
    title: 'MAKA'
  }]
}
