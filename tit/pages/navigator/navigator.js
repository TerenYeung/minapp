// app导航页
import config from '../../config/config'
import constant from '../../config/constant'
import utils from '../../utils/utils'

const app = getApp()

Page({
  data: {

    // 控制蒙层
    isMapShow: true,
    src: utils.imgUrl('overlay', 'jpeg'),

    // tabs
    tabs: constant.tabs,
    // 存放所有分类商户的data
    merchantsData: [],
    activeMerchantsList: [],
    activeMerchant: null,
    activeMerchantIndex: -1,
    activeTab: 0,
    // map parts
    coreLongitude: '113.32498',
    coreLatitude: '23.09733',
    // 设置在map的markers
    markers: [],
    // 存放所有分类商户的markers
    tabsMarkers: [],
    isMerchantInfoShow: false,
    // merchants parts
    isSpread: true,
    scrollLeft: 0,
  },

  onLoad(options) {

    // 初始化定位
    // this.getCoreLocation()

    // 获取company并设置到markers

    let intervalId = setInterval(() => {
      let uid = app.getUserId()
      console.log(uid)
      if (uid) {
        this.getCategory()
        clearInterval(intervalId)
      }
    }, 30)

  },

  // tabs part
  // 获取分类下的所有merchants数据
  getCategory() {
    let that = this
    let merchantID = config.TABLE_ID.MERCHANTS
    let merchantsData = []
    let tabs = this.data.tabs

    // this.data.tabs.forEach((item, index) => {

    //   let params = {
    //     tableID: merchantID,
    //     category__in: item.value,
    //     priority__gte: 1,
    //     order_by: 'priority'
    //   }

    //   wx.BaaS.getRecordList(params)
    //     .then(res => {
    //       let merchants = res.data.objects

    //       merchantsData.push(merchants)

    //       // console.log(merchants)
    //       that.setData({
    //         merchantsData
    //       })

    //       // 获取merchants数据后，将数据
    //       // 格式化到tabsMarkers
    //       that.setTabsMarkers(index, merchants)

    //     }, err => {})
    // }, that)

    // 简化版tit只需要科技IT的数据
    let params = {
      tableID: merchantID,
      category__in: this.data.tabs[0].value, // 分类为科技IT
      priority__gte: 1,
      order_by: 'priority'
    }

    wx.BaaS.getRecordList(params)
      .then(res => {
        let merchants = res.data.objects

        merchantsData.push(merchants)

        // console.log(merchants)
        that.setData({
          merchantsData
        })

        // 获取merchants数据后，将数据
        // 格式化到tabsMarkers
        that.setTabsMarkers(0, merchants)

      }, err => {})

  },

  setTabsMarkers(index, merchants) {
    let tabsMarker = []
    let tabsMarkers = this.data.tabsMarkers

    merchants.forEach((item) => {
      let marker = {
        id: item.id,
        longitude: item.response.longitude,
        latitude: item.response.latitude,
        iconPath: '../../resources/' + index + '@3x.png',
        width: 32,
        height: 40
      }
      tabsMarker.push(marker)
    })

    tabsMarkers.push(tabsMarker)
    this.setData({
      tabsMarkers
    })
    console.log(tabsMarkers)
    if (index === 0) {
      // 设置默认激活的tabs
      this.setData({
        activeMerchantsList: merchants,
        markers: this.data.tabsMarkers[0]
      })
    }
  },

  markerTap(e) {

    let that = this
    let isSpread = this.data.isSpread
    let merchantID = e.markerId
    let activeMerchantsList = this.data.activeMerchantsList

    // marker激活态
    this.updateMarkerColor(merchantID)

    // 从markers中筛选出正在点击的marker
    let activeMerchant = activeMerchantsList.find(item => {
      return merchantID === item.id
    })

    if (isSpread) {
      let activeMerchantsListIndex;
      let scrollLeft;

      activeMerchantsList.forEach((item, index) => {
        if (merchantID == item.id) {
          scrollLeft = index * 140
          this.setData({
            scrollLeft,
            activeMerchantIndex: index
          })
        }
      })

      return
    }

    let api, start, end

    end = this.assembleLocation(1, activeMerchant.response.longitude, activeMerchant.response.latitude)

    activeMerchant.destination = utils.assembleLocation(0, activeMerchant.response.longitude, activeMerchant.response.latitude)

    this.setData({
      activeMerchant
    })

    // 获取用户当前位置，调用腾讯计算位置api获取距离信息
    wx.getLocation({
      type: 'gcj02',
      complete: (res) => {
        if (res.errMsg === 'getLocation:ok') {
          start = utils.assembleLocation(1, res.longitude, res.latitude)
          activeMerchant.origin = utils.assembleLocation(0, res.longitude, res.latitude)
          that.setData({
            activeMerchant,
          })

          api = `${config.API.CALCULATE_DISTANCE}?mode=walking&from=${start}&to=${end}&key=${config.QQ_LBS.WEB_API}`

          wx.request({
            url: api,
            complete: (res) => {
              if (res.statusCode == constant.STATUS_CODE.SUCCESS) {
                activeMerchant.distance = res.data.result.elements[0].distance
                that.setData({
                  activeMerchant,
                })
              }
            }
          })
        }
      }
    })


    this.setData({
      isMerchantInfoShow: true,
      isMapShow: false
    })
  },

  closePopup(e) {
    this.setData({
      isMerchantInfoShow: false,
      isMapShow: true
    })
  },

  hiddenMerchantInfo(e) {
    this.setData({
      isMerchantInfoShow: false,
      isMapShow: true
    })
  },

  // map parts
  getCoreLocation() {

    let that = this

    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        let coreLatitude = res.latitude
        let coreLongitude = res.longitude

        that.setData({
          coreLongitude,
          coreLatitude
        })

      }
    })
  },

  /**
   * @description 根据 type 值组装位置字符串
   * 百度和高德都是经度在前纬度在后，然而腾讯就要反着来
   * @param  {Int} type      0 代表正常顺序, 1 代表反序
   * @param  {Float} longitude  经度
   * @param  {Float} latitude  纬度
   * @return {String}           拼凑好的位置字符串
   */

  assembleLocation(type, longitude, latitude) {
    if (type == 0) return longitude + ',' + latitude
    return latitude + ',' + longitude
  },

  navigateToMerchant(e) {
    let {
      origin,
      destination
    } = this.data.activeMerchant

    this.setData({
      isMerchantInfoShow: false,
      isMapShow: true,
      isSpread: true
    })

    wx.navigateTo({
      url: `../goToMap/goToMap?origin=${origin}&destination=${destination}`
    })

  },
  // markers
  updateMarkerColor(id) {
    let activeMarkerId = id
    let markers = this.data.markers
    let activeTab = this.data.activeTab
    let activeIconPath = `/resources/${activeTab}`

    markers.forEach(item => {
      if (item.id === activeMarkerId) {
        item.iconPath = activeIconPath + 'choosed@3x.png'
      } else if (item.id !== activeMarkerId) {
        item.iconPath = activeIconPath + '@3x.png'
      }
    })
    this.setData({
      markers
    })
  },
  // merchants parts
  switchMerchantsItems(e) {
    this.setData({
      isSpread: !this.data.isSpread
    })
  }
})