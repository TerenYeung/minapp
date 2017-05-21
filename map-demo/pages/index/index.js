import constant from '../../config/constant';
import config from '../../config/config';
import utils from '../../utils/utils';
//index.js

//获取应用实例
var app = getApp()

Page({
  // 页面生命周期
  onLoad(options) {
    this.getControls();
    this.getMarkers();
  },
  data: {

    /* tabs组件 数据 */
    tabs: constant.tabs,

    /* map 组件数据 */

    // 中心坐标
    mapLongitude: '113.324520',
    mapLatitude: '23.099994',

    // controls preset
    isMapShow: true,
    isFirstRecord: true,
    isCarWindowShow: false,
    carImg: '/resources/car@3x.png',
    parkingLocation: '',

    // 地图控件
    controls: [],

    // 地点标记
    markers: [],
    polyline: [],

    /* 地点公司列表数据 */
    activeMerchantList: [],
    category: '商户',
    isSpread: true,
    scrollLeft: 0,

  },

  getControls() {
    let controls = [];
    let controls_items = constant.controls;
    controls_items.forEach((elem, index) => {
      controls.push(elem);
    })

    this.setData({
      controls: controls
    })
  },

  getMarkers() {
    let markers = [];
    let markers_items = constant.markers;
    console.log(markers_items)
    markers_items.forEach((elem, index) => {
      Object.assign(elem, {
        width: 32,
        height: 40,
        iconPath: '/resources/0@3x.png',
        callout: {
          content: elem.id,
          borderRadius: '4rpx',
          bgColor: '#eee'
        }
      })
      markers.push(elem)
    })

    this.setData({
      markers: markers
    })
  },

  controlsTapped(e) {
    let event = e || {
      controlId: 'myLocation'

    }
    let id = event.controlId
    let that = this

    // 用户点击我的位置，重置地图中心坐标
    if (id == 'myLocation') {
      wx.getLocation({
        type: 'gcj02',
        complete: (res) => {
          if (res.errMsg == 'getLocation:ok') {
            that.setData({
              mapLongitude: res.longitude,
              mapLatitude: res.latitude,
            })
          }
        }
      })
    } else if (id == 'car') {
      this.setData({
        isMapShow: false,
        isCarWindowShow: true
      })
    } else if (id == 'news') {
      wx.navigateTo({
        url: config.ROUTE.TIT_NEWS
      })
    }
  },

  // 记录车位
  recordLocation(e) {
    let that = this;

    wx.getLocation({
      type: 'gcj02',
      complete: (res) => {
        if (res.errMsg == 'getLocation:ok') {
          let longitude = res.longitude
          let latitude = res.latitude

          that.setData({
            parkingLocation: utils.assembleLocation(0, longitude, latitude)
          })
          setTimeout(() => {
            that.setData({
              isCarWindowShow: false,
              isFirstRecord: false
            })
          }, 2000)
        }
      }
    })
  },

  // 关闭car-window
  closePopup(e) {
    this.setData({
      isMapShow: !this.data.isMapShow,
      isCarWindowShow: false
    })
  },

  getActiveMerchantList(e) {
    let activeMerchantList = []
    let merchant_items = constant.activeMerchantList

    merchant_items.forEach(elem => {
      activeMerchantList.push(elem)
    })

    this.setData({
      activeMerchantList: activeMerchantList
    })
  }
})
