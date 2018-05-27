// pages/follow/follow.js.js
var app = getApp()
Page({

  data: {
    user: null,
    userList: null,
    activeTab: 'all',
  },

  onLoad: function (options) {
    // 拉取用户列表数据
    this.init()
  },

  init() {
    let tableID = app.globalData.USER_ID
    let User = new wx.BaaS.TableObject(tableID)
    let UserCreate = User.create()
    let userID = wx.BaaS.storage.get('uid')
    let userInfo = wx.BaaS.storage.get('userinfo')
    let MyUser = new wx.BaaS.User()
    let query = new wx.BaaS.Query()
    query.compare('user_id', '=', userID)

    User.setQuery(query).find()
      .then(res => {
        let data = res.data.objects

        if (!data.length) {
          UserCreate.set({
            user_id: userID,
            user_info: JSON.stringify({
              user_id: userID,
              name: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
            }),
            followers: null,
            followees: null,
          })

          UserCreate.save()
            .then(() => {
              this.getUserList()
            })
        } else {
          this.getUserList()
        }
      })
      .catch(err => {
        console.error(err)
      })
  },

  getUserList() {
    let tableID = app.globalData.USER_ID
    let User = new wx.BaaS.TableObject(tableID)
    let userID = wx.BaaS.storage.get('uid')

    User.find()
    .then(res => {
      let userList = res.data.objects
      // debugger
      userList.forEach(v => {
        v.user_info = JSON.parse(v.user_info)
        v.followers = v.followers ? v.followers.map(v2 => JSON.parse(v2)) : []
        v.followees = v.followees ? v.followees.map(v3 => JSON.parse(v3)) : []
      })

      let user = userList.find(v => v.user_id == 1)
      userList = userList.filter(v => v.user_id != 1)

      this.setData({
        user,
        userList,
      })
    })
    .catch(err => {
      console.log('err', err)
    })
  },

  switchTab(e) {
    let cat = e.currentTarget.dataset.cat
    let user = this.data.user
    let userList = this.data.userList

    if (cat == 'all') {
      this.setData({
        activeTab: cat,
      })
      this.getUserList()
      return
    } else if (cat == 'followers') {
      userList = user[cat]
    } else {
      userList = user[cat]
    }

    this.setData({
      activeTab: cat,
      userList,
    })
  },

  doFollow(e) {
    let {user} = this.data
    let {userList} = this.data
    let {
      follow,
      recordid,
      follower,
    } = e.currentTarget.dataset
    let payload = {
      recordID: recordid,
      follower,
      followee: user,
      follow,
    }
    let activeIdx = e.currentTarget.dataset.index
    debugger 
    wx.BaaS.invokeFunction('followUser', payload)
      .then(res => {
        if (res.code == 0) {

          userList.forEach((v, i) => {
            if (activeIdx == i) {
              userList[i].isFollowed = !userList[i].isFollowed
            }
          })
          this.setData({
            userList,
          })
        }
      })
  }
})

// cloud function
/**
export.main = function(e, cb) {
  let tableID = 1
  let recordID = e.data.recordID
  let follower = e.data.follower // 关注的人
  let followee = e.data.followee // 被关注的人，即用户自己
  let email = followee.email
  let isFollow = e.data.follow
  let User = new wx.BaaS.TableObject()
  let user = User.getWithoutData(recordID)

  // 更新被关注者的数据项
  let query = new wx.BaaS.Query()
  let followerID = JSON.parse(follower).id
  query.compare('user_id', '=', followerID)

  User.setQuery(query)
    .find()
    .then(res => {
      let data = res.data.objects[0]
      let recordID = data.id
      let user = User.getWithoutData(recordID)

      isFollow
      ? user.uAppend('followee', [followee])
      : user.remove('followee', [followee])
    })

  // 更新当前用户数据表的数据
  if (isFollow) {
    user.uAppend('follower', [follower])
  } else {
    user.remove('follower', [follower])
  }

  // 发送邮件，通知用户粉丝增长数量
  let data = {
    recipient: email,
    subject: "用户关注数变更通知",
    body: `<p>
      用户关注数量的变更数为${followee.followers.length - isFollow ? -1 : 1}
    <p>`
  }

  BaaS.sendEmail(data).then(res => {
    // 发送成功
  }, err => {
    // 发送失败
    console.log(err)
  })
}
**/
