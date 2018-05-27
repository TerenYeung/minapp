
let getBanners = (opts) => {
  let {tableID} = opts
  let query = new wx.BaaS.Query()
  let Banner = new wx.BaaS.TableObject(tableID)
  
  return Banner.setQuery(query).find()
}

module.exports = {
  getBanners,
}