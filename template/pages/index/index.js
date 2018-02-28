//index.js
//获取应用实例
const app = getApp()
const mixins = require("../../utils/mixins.js")
const { NoticeBar, extend } = require('../../utils/zanui/index.js')

Page(Object.assign({}, NoticeBar,mixins, {
  shareData: {
    title: "首页"
  },
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    movable: {
      text: '这是一个小程序的示例 ^_^ , 引入了一些第三方库（utils目录） , 实际使用中请自行增删 , 谢谢 !'
    }
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs?name=log"
    })
  },
  onShow(){
    this.initZanNoticeBarScroll('movable')
  },
  onLoad() {
    console.log("当前页面URL:", this.getCurrentPageUrl())
    app.getUserInfo(0, () => {
      console.log("onLoad授权结果:", app.globalData.userInfo)

      if (app.globalData.userInfo) {
        this.setUserInfo()
      }
    })
  },
  setUserInfo() {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  },
  //点击按钮授权
  getUserInfo() {
    app.getUserInfo(1, () => {
      console.log("点击按钮授权结果:", app.globalData.userInfo)

      if (app.globalData.userInfo) {
        this.setUserInfo()
      }
    })
  }
}))
