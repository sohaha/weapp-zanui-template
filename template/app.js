//app.js
const extra = require("./utils/extra")

App({
  onLaunch() {
    // 展示本地存储能力
    let logs = wx.getStorageSync("logs") || []
    logs.unshift(Date.now())
    wx.setStorageSync("logs", logs)
    this.getUserInfo()
  },
  globalData: {
    userInfo: null,
    runInit: extra.runInit(),
    loginState: false
  },
  // 获取用户信息
  getUserInfo(must = 0, cb = () => {}) {
    if (this.globalData.userInfo) {
      this.globalData.runInit(cb, this.globalData.userInfo)
    } else {
      if (!this.globalData.loginState) {
        console.log("开始授权")
        this.globalData.loginState = true
        extra
          .login(false, must, "为了能更好的使用该小程序，请先授权")
          .then(res => {
            this.globalData.loginState = false
            this.globalData.userInfo = res.userInfo
            this.globalData.runInit(cb, true)
            //可以发送 res.code 到后台换取 openId, sessionKey, unionId
          })
          .catch(err => {
            this.globalData.loginState = false
            console.warn(err)
            this.globalData.runInit(cb, true)
          })
      } else {
        console.log("等待授权")
        this.globalData.runInit(cb, this.globalData.userInfo)
      }
    }
  }
})
