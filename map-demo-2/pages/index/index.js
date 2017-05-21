import constant from '../../config/constant';
import config from '../../config/config';
import utils from '../../utils/utils';
import * as store from '../../utils/storage';

//index.js

//获取应用实例
var app = getApp()

Page({

  onLoad(options) {
    this.getMarkers(this.data.activeTab);
    this.getControls()
  },

  data: {

    // 通用属性
    // 标识地图显示情况
    isMapShow: true,

    // tabs组件 数据
    tabs: constant.tabs,
    activeTab: constant.tabs[0].id,
    // map组件 数据

    // 中心坐标
    mapLongitude: 113.324520,
    mapLatitude: 23.099994,

    // makers标记 数据
    // 通过getMarkers()动态获取
    markers: [],
    activeMarker: '',
    isMarkerTapped: false,
    distance: 0,

    // controls控件
    controls: [],
    isFirstRecord: true,
    isCarWindowShow: false,
  },

  //  通用关闭弹窗事件

  closePopup(e) {
    this.setData({
      isMapShow: true,
      isMarkerTapped: false,
      isCarWindowShow: false,
    })
  },

  //@param { String }  activeTab  代表激活的tab
  getMarkers(activeTab) {

    // 根据传入的激活tab 导入markers数据进markers
    let that = this
    let markers = []
    let markers_items = constant.markers
    markers_items.forEach((elem) => {
      if (activeTab == elem.meta.id) {

        that.setData({
          markers: elem.data
        })
        return;
      }
    })
  },

  // 绑定标记组件事件回调
  markerTap() {
    let that = this

    // 获取标记地点距离当前的距离
    // 这里本是向BaaS后台获取数据

    this.setData({
      isMarkerTapped: true,
      isMapShow: false,
      distance: 0,
    })
  },


  // 点击后，关闭标记事件触发的弹窗
  hiddenMerchantInfo() {
    this.setData({
      isMarkerTapped: false,
      isMapShow: true,
    })
  },

  // 获取控件 数据
  getControls() {
    let controls = []
    let controls_items = constant.controls

    controls_items.forEach(elem => {
      controls.push(elem)
    })

    this.setData({
      controls,
    })
  },

  // 绑定控件事件回调
  controlTap(e) {
    let id = e.controlId
    switch (id) {
      case 'myLocation':
        this.getCurPosition()
        break
      case 'news':
        this.navigateToNews()
        break
      case 'car':
        this.recordCar()
        break
      default:
        this.getCurPosition()
        break
    }
  },

  getCurPosition() {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      complete(res) {
        if (res.errMsg == 'getLocation:ok') {
          let cur_position = {
            longitude: res.longitude,
            latitude: res.latitude
          }
          store.saveItem('cur_position', cur_position)
            .then(curPos => {
              that.setData({
                mapLongitude: curPos.longitude,
                mapLatitude: curPos.latitude
              })
            })
        }
      }
    })
  },

  navigateToNews() {
    wx.navigateTo({
      url: config.ROUTE.TIT_NEWS
    })
  },

  recordCar() {
    this.setData({
      isCarWindowShow: true,
      isMapShow: false,
    })
  },

  hiddenCarWindow() {
    this.setData({
      isCarWindowShow: false,
      isMapShow: true,
    })
  }
})