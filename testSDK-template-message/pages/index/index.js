//index.js
//获取应用实例
let app = getApp()
let BaaS = wx.BaaS
let productTableID = 1278
let Product = new BaaS.TableObject(productTableID)

let richTextID = 1509676331991794
let richTextObjects = { richTextID }

let contentGroupID = 1509676288970454
let contentGroupIDObjects = { contentGroupID }

let categoryID = 1509676296338959
let categoryIDObjects = { categoryID }

Page({
  data: {
    recordID: '59a50a96c4a9ca4c27587603',
    colName: 'book',
    colPrice: 31,
    colDesc: ['E'],
    colAmount: 1,

    content: ''
  },

  onLoad: function () {
  },

  addProduct: function (e) {
    // let randomProduct = {
    //   id: 'apple',
      //name: 1,
      //string: ['good'],
      //arrays: 0

    // }
    // let product = Product.create()
    // product.set(randomProduct).save().then((res) => {
    //   console.log('res', res)
    // })
    let colName = this.data.colName
    let colPrice = this.data.colPrice
    let colDesc = this.data.colDesc
    let colAmount = this.data.colAmount

    let product = Product.create()
    product.set('name', colName)
    product.set('price', colPrice)
    product.set('desc', colDesc)
    product.set('amount', colAmount)
    product.save().then((res) => {
      console.log(e.detail.formId)
      BaaS.wxReportTicket(e.detail.formId)
      console.log(res.statusCode)
      console.log('statusCode', res.statusCode)
      if (res.statusCode === 201) {
        console.log('success')
      } else {
        console.log('fail')
      }
      
    })
  },

  getProduct: function() {
    let recordID = this.data.recordID
    Product.get(recordID).then((res) => {
      console.log(res)
    })
  },

  deleteProduct: function() {
    let recordID = this.data.recordID
    Product.delete(recordID).then((res) => {
      console.log(res)
    })
  },

  updateProduct: function() {
    let recordID = this.data.recordID
    let product = Product.getWithoutData(recordID)
    product.set('amount', 1)
    product.update().then((res) => {
      console.log(res)
    })
  },

  queryCompare: function() {
    let query = new BaaS.Query()
    query.compare('price', '>', 50)
    // return book1 book5
    Product.setQuery(query).find().then((res) => {
      if(res.statusCode === 200) {
        console.log(res.data)
      }
    })
  },

  queryString: function() {
    let query = new BaaS.Query()
    query.contains('desc', 'D')
    // return book2 book3
    Product.setQuery(query).find().then((res) => {
      if(res.statusCode === 200) {
        console.log(res.data)
      }
    })
  },

  queryArray: function() {
    // return book2 book3
    let query1 = new BaaS.Query()
    query1.in('desc', ['D'])
    Product.setQuery(query1).find()

    // return book4 book6
    let query2 = new BaaS.Query()
    query2.notIn('desc', ['A', 'B', 'C', 'D', 'E', 'F', 'G'])
    Product.setQuery(query2).find()
  },

  queryisNull: function() {
    // return book3 book6
    let query1 = new BaaS.Query()
    let query2 = new BaaS.Query()
    // book3 book6
    query1.isNull('price')
    // Product.setQuery(query1).find()

    // return book1 book2，有问题 book4 的 desc 为空也返回了
    query2.isNotNull(['desc'])
    Product.setQuery(query2).find()
  },

  queryOr: function() {
    let query1 = new BaaS.Query()
    let query2 = new BaaS.Query()
   // return book6
    query1.isNull(['amount', 'price'])
    // return book1
    query2.compare('price', '>', 80)
    let orQuery = BaaS.Query.or(query1, query2)

    // Product.setQuery(orQuery).find().then((res) => {
    //   if(res.stautsCode === 200) {
    //     console.log(res.data)
    //   }
    // })
    
    // return book1 book6
    Product.setQuery(orQuery).find()
  },

  queryAnd: function() {
    let query1 = new BaaS.Query()
    let query2 = new BaaS.Query()
    // book3
    query1.isNull('price')
    // book3
    query2.compare('amount', '>', 30)
    // book3
    let andQuery = BaaS.Query.and(query1, query2)
    Product.setQuery(andQuery).find()
   
    // Product.setQuery(andQuery).find().then((res) => {
    //   if(res.stautsCode === 200) {
    //     console.log(res.data)
    //   }
    // })
  },

  queryOrWithAnd: function() {
    let query1 = new BaaS.Query()
    let query2 = new BaaS.Query()
    let query3 = new BaaS.Query()
    query1.isNull('price')
    query2.compare('amount', '>', 30)
    query3.in('desc', ['A', 'B'])
    // book3
    var andQuery = BaaS.Query.and(query1, query2)
    // should return book1, book3
    var orQuery = new BaaS.Query.or(andQuery, query3)
    Product.setQuery(orQuery).find()
  },

  numberAtom: function() {
    let recordID = this.data.recordID
    Product.getWithoutData(recordID).incrementBy('amount', 4).update()
  },

  arrayAtom: function() {
    let recordID = this.data.recordID
    // remove item
    // Product.getWithoutData(recordID).remove('desc', ['F']).update()
    // append item
    Product.getWithoutData(recordID).append('desc', ['G','H']).update()
    // append item not exist in array
    // Product.getWithoutData(recordID).uAppend('desc', ['E','F','G','H']).update()
  },

  limitOffSet: function() {
    let query = new BaaS.Query()
    query.compare('amount', '>', 0)

    // 排序
    // Product.orderBy('-createAt')

    Product.setQuery(query).limit(10).offset(0).find()
    // Product.setQuery(query).limit(2).offset(0).find()
    // Product.setQuery(query).limit(10).offset(0).find()
  },

  // get content detail
  getContentDetail() {
    wx.BaaS.getContent(richTextObjects)
  },

  // get content list
  getContentList() {
    wx.BaaS.getContentList(contentGroupIDObjects)
  },

  // get content group detail, return category list
  getContentGroupDetail() {
    wx.BaaS.getContentGroup(contentGroupIDObjects)
  },

  // get content group list
  getContentGroupList() {
    wx.BaaS.getContentGroupList()
  },

  // get category detail
  getContentCategoryDetail() {
    wx.BaaS.getContentCategory(categoryIDObjects)
  },
  
})