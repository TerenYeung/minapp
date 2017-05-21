// 记录当前位置
export const CUR_POSITION = 'CUR_POSITION'

export function saveItem(key, value) {
  return new Promise((resolve, reject) => {
    try {
      wx.setStorageSync(key, value)
      resolve(value)
    } catch (e) {
      reject()
    }

  })
}

export function getItem(key) {
  return new Promise((resolve, reject) => {
    try {
      var value = wx.getStorageSync('key')
      if (value) {
        resolve(value)
      }
    } catch (e) {
      reject()
    }
  })
}
