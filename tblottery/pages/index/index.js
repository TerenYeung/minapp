//index.js
//获取应用实例
const app = getApp()
import BannerIO from '../../io/BannerIO'
import ProductIO from '../../io/ProductIO'
import constants from '../../config/constants'

Page({

  data: {
    // banner
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,

    bannerList: [],
    productList: [],
  },

  onLoad() {

    this.getBanners()
    this.getProducts()
  },

  getBanners() {
    BannerIO.getBanners({
      tableID: app.globalData.TABLE_ID.BANNER,
    })
      .then(res => {
        console.log('banners', res)
        this.setData({
          bannerList: res.data.objects
        })
      })
      .catch(err => {})
  },

  bannerTap(e) {
    console.log('bannerTap', e)
    let url = e.currentTarget.dataset.link
    // wx.navigateTo 无法跳至 tabBar以及 link 必须为绝对路径
    wx.navigateTo({url,})
  },

  getProducts() {
    ProductIO.getProducts({
      tableID: app.globalData.TABLE_ID.PRODUCTS,
      orderBy: ['-click_volume']
    })
    .then(res => {
      console.log('products', res)
      this.setData({
        productList: res.data.objects,
      })
    })
    .catch(err => {})
  },

  getProduct(id) {
    ProductIO.getProducts({
      tableID: app.globalData.TABLE_ID.PRODUCTS,
      reacordID: id,
    })
    .then(res => {

    })
    .catch(err => {

    })
  },

  onProductTap(e) {
    let id = e.currentTarget.dataset.productid
    let url = `${constants.PATHS.PRODUCT}?id=${id}`
    wx.navigateTo({url})
  }
})
