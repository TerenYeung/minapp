//index.js
//获取应用实例

var app = getApp()

Page({
  data: {
    profile: null,
    title: 'Hello World',
    tableID: 56, // 从后台schema的table中获取
    bookList: null,
    timeout: 1,
    createBookValue: '',
    inputBook: '',
    editBookName: '',
    inputEditBook: '',
  },

  onLoad(options) {

    let that = this

    this.setData({
      profile: app.getUserInfo()
    })

    this.fetchBookList()

  },

  // 获取bookList数据
  fetchBookList() {

    let that = this

    let tableID = this.data.tableID

    let objects = {
      tableID
    }

    wx.BaaS.getRecordList(objects).then((res) => {
      that.setData({
        bookList: res.data.objects // bookList array, mock data in mock/mock.js
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

    let that = this
    let tableID = this.data.tableID
    let inputBook = this.data.inputBook

    let data = {
      bookName: inputBook,
      isEditing: false
    }

    let objects = {
      tableID,
      data
    }

    // 创建一个数据项
    wx.BaaS.createRecord(objects).then((res) => {
      that.setData({
        createBookValue: '',
      })
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

  getEditBookName(e) {
    let that = this
    this.throttle(function() {
      let value = e.detail.value

      that.setData({
        editBookName: value
      })

    }, this)
  },

  saveBook(e) {
    let that = this
    let tableID = this.data.tableID
    let recordID = e.target.dataset.bookId;
    let editBookName = this.data.editBookName

    this.throttle(function() {
      let data = {
        bookName: editBookName,
        isEditing: false
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

    // 删除 tableID 为 56 的数据表中 recordID的数据项

    let objects = {
      tableID,
      recordID
    };

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