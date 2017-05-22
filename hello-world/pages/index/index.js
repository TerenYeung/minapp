//index.js
//获取应用实例

import mock from '../../mock/mock'
// import uuid from '../../node_modules/uuid/index'

var app = getApp()

Page({
  data: {
    profile: null,
    title: 'Hello World',
    tableID: 56, // 测试之用
    originBookList: mock.bookList.objects,
    bookList: mock.bookList.objects,
    timeout: 1,
    inputBook: '',
    inputEditBook: '',
    isEditing: false,
  },

  onLoad(options) {


    let that = this

    this.setData({
      profile: app.getUserInfo()
    })

    // this.fetchBookList()

  },

  // 获取bookList数据
  fetchBookList() {

    let that = this

    // ? tableID从哪里来
    let tableID = this.data.tableID

    let objects = {
      tableID
    }

    wx.BaaS.getRecordList(objects).then((res) => {
      that.setData({
        originBookList: res.objects // bookList array, mock data in mock/mock.js
      })

      // 对bookList数据做预处理
      let bookList = this.data.originBookList.slice(0)

      bookList.forEach(elem => {
        elem.response.isEditing = false
      })

      this.setData({
        bookList,
      })

    }, (err) => {
      console.dir(err)
    });
  },

  inputBook(e) {
    let that = this
    this.throttle(function() {
      let value = e.detail.value

      that.setData({
        inputBook: value
      })
    }, this)

  },

  createBook(e) {

    let tableID = this.data.tableID
    let inputBook = this.data.inputBook

    let data = {
      bookName: inputBook,
    }

    let objects = {
      tableID,
      data
    }

    // 创建一个数据项
    wx.BaaS.createRecord(objects).then((res) => {
      that.fetchBookList()
    }, (err) => {
      console.log(err)
    })

  },

  editBook(e) {
    let that = this
    let activeIndex = e.currentTarget.dataset.index


    let bookList = this.data.bookList

    bookList.forEach((elem, idx) => {
      if (activeIndex == idx) {
        bookList[idx].response.isEditing = !bookList[idx].response.isEditing
      }
    })

    that.setData({
      bookList
    })
  },

  inputEditBook(e) {
    let that = this
    let tableID = this.data.tableID
    let recordID = e.target.dataset.bookId;


    this.throttle(function() {
      let data = {
        bookName: e.detail.value
      }
      let objects = {
        tableID,
        recordID,
        data
      }

      wx.BaaS.updateRecord(objects).then((res) => {
        that.fetchBookList()
      }, (err) => {
        // err
      })

    }, this)
  },

  deleteBook(e) {

    let that = this

    let tableID = this.data.tableID
    let recordID = e.target.dataset.bookId;

    // 删除 tableID 为 123 的数据表中 recordID的数据项

    let objects = {
      tableID,
      recordID
    };

    console.log(objects)

    wx.BaaS.deleteRecord(objects).then((res) => {
      that.fetchBookList()
    }, (err) => {
      console.dir(err)
    });
  },

  throttle(method, context) {
    clearTimeout(this.data.timeout)
    this.setData({
      timeout: setTimeout(function() {
        method.call(context)
      }, 300)
    })
  }

})