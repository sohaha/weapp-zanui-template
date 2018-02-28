//logs.js
const util = require('../../utils/util.js')
const mixins = require("../../utils/mixins.js")

Page(Object.assign({}, mixins, {
  shareData: {
    title: "Log页"
  },
  data: {
    logs: []
  },
  onLoad() {
    console.log("当前页面URL:", this.getCurrentPageUrl())
    console.log("当前页面URL(不包含参数):", this.getCurrentPageUrl(false))
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
}))
