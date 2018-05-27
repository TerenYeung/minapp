
let getProducts = (opts) => {
  let {tableID, orderBy} = opts
  let query = new wx.BaaS.Query()
  let order = orderBy ? orderBy : ['-click_volume']

  let Products = new wx.BaaS.TableObject(tableID)


  return Products.setQuery(query).orderBy(order).find()
}

module.exports = {
  getProducts,
}