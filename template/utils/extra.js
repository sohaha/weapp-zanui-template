/*!
 * weapp-extra v2.0.5 (https://www.npmjs.com/package/weapp-extra)
 * Copyright 2018 seekwe@gmail.com, Inc.
 * Licensed under the Apache-2.0 license
 */
"use strict"
var _extends =
    Object.assign ||
    function(n) {
      for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t]
        for (var e in i)
          Object.prototype.hasOwnProperty.call(i, e) && (n[e] = i[e])
      }
      return n
    },
  requestLimit = void 0,
  config = { processes: 10 }
Promise.prototype.finally = function(n) {
  function t() {
    setTimeout(n)
  }
  return this.then(t, t), this
}
var api = function(n, t) {
    for (
      var i = arguments.length, e = Array(i > 2 ? i - 2 : 0), o = 2;
      o < i;
      o++
    )
      e[o - 2] = arguments[o]
    var c = "function" == typeof wx[n]
    return new Promise(function(i, o) {
      var r = { success: i, fail: o }
      if (c)
        if (customize[n])
          customize[n].apply(customize, [_extends({}, t, r)].concat(e))
        else {
          var u
          ;(u = wx)[n].apply(u, [_extends({}, t, r)].concat(e))
        }
      else o({ errMsg: "API:" + n + "不存在，请尝试升级微信", type: "version" })
    })
  },
  openSetting = function(n) {
    return new Promise(function(t, i) {
      api("openSetting")
        .then(function(e) {
          getSetting(n, e)
            .then(function(n) {
              n ? t(n) : i(n)
            })
            .catch(function(n) {
              i(n)
            })
        })
        .catch(function(n) {
          i(n)
        })
    })
  },
  getSetting = function(n, t) {
    var i = function(t) {
      return t && (!0 === n || t.authSetting[n])
    }
    return new Promise(function(n, e) {
      t
        ? n(i(t))
        : api("getSetting")
            .then(function(t) {
              n(i(t))
            })
            .catch(function(t) {
              n(t)
            })
    })
  },
  login = function() {
    var n = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
      t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
      i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      e = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null
    return new Promise(function(o, c) {
      var r = function() {
        wx.login({
          success: function(n) {
            var r = n.code
            authApi("getUserInfo", "scope.userInfo", t, i, e)
              .then(function(n) {
                ;(n.code = r), o(n)
              })
              .catch(function(n) {
                ;(n.code = r), c(n)
              })
          },
          fail: function(n) {
            c(n)
          }
        })
      }
      n
        ? wx.checkSession({
            success: function(n) {
              o(!0)
            },
            fail: function() {
              r()
            }
          })
        : r()
    })
  },
  authApi = function(n) {
    for (
      var t = arguments.length, i = Array(t > 6 ? t - 6 : 0), e = 6;
      e < t;
      e++
    )
      i[e - 6] = arguments[e]
    var o =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
      c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
      r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
      u = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
      f = arguments[5]
    o || (o = !0)
    var s = void 0,
      a = void 0
    return new Promise(function(t, e) {
      ;(a = function() {
        openSetting(o)
          .then(function(n) {
            l()
          })
          .catch(function(n) {
            "version" === n.type
              ? e(n)
              : -1 === c
                ? g(s)
                : u
                  ? wx.showModal(
                      Object.assign(
                        {
                          title: "提示",
                          confirmText: "确定",
                          content: "对应权限没有开启,部分功能受限",
                          showCancel: !1,
                          complete: function() {
                            e(s)
                          }
                        },
                        "string" == typeof u
                          ? { content: u }
                          : !0 === u ? {} : u
                      )
                    )
                  : e(s)
          })
      }),
        (r =
          !!r &&
          Object.assign(
            {
              title: "提示",
              confirmText: "确定",
              content: "请先开启对应权限",
              showCancel: !1
            },
            "string" == typeof r ? { content: r } : !0 === r ? {} : r,
            {
              success: function(n) {
                !0 !== n.cancel && a()
              },
              fail: function(n) {}
            }
          ))
      var l = function() {
          api
            .apply(void 0, [n, f].concat(i))
            .then(function(n) {
              t(n)
            })
            .catch(function(n) {
              e(n)
            })
        },
        g = function(n) {
          s || (s = n)
          n.type
          r ? wx.showModal(r) : a()
        }
      api
        .apply(void 0, [n, f].concat(i))
        .then(function(n) {
          t(n)
        })
        .catch(function(n) {
          var t = n.type || "warn"
          ;(n = _extends({ type: t }, n)),
            "version" !== t && 0 !== c ? g(n) : e(n)
        })
    })
  },
  runCount = function(n, t) {
    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
    return function() {
      n--, (i ? 0 === n : n <= 0) && t()
    }
  },
  runInit = function() {
    var n = []
    return function(t, i) {
      if ((n.push(t), i))
        for (var e = 0, o = n.length; e < o; e++) {
          var c = n.shift()
          c && c(i)
        }
    }
  },
  runLimit = function(n) {
    var t = [],
      i = 0,
      e = function() {
        i--, o()
      },
      o = function() {
        if (t.length > 0) {
          t.shift()(e)
        }
      }
    return function(e) {
      i++, t.push(e), i <= n && o()
    }
  },
  customize = {
    downloadFile: function(n) {
      for (
        var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), e = 1;
        e < t;
        e++
      )
        i[e - 1] = arguments[e]
      this.processes.apply(this, ["downloadFile", n].concat(i))
    },
    request: function(n) {
      for (
        var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), e = 1;
        e < t;
        e++
      )
        i[e - 1] = arguments[e]
      this.processes.apply(this, ["request", n].concat(i))
    },
    processes: function(n, t) {
      for (
        var i = arguments.length, e = Array(i > 2 ? i - 2 : 0), o = 2;
        o < i;
        o++
      )
        e[o - 2] = arguments[o]
      requestLimit || (requestLimit = runLimit(config.processes)),
        requestLimit(function(i) {
          var o
          ;(t.complete = i), (o = wx)[n].apply(o, [t].concat(e))
        })
    }
  },
  setConfig = function(n) {
    config = Object.assign(config, n)
  },
  getConfig = function(n) {
    return config
  }
module.exports = {
  api: api,
  authApi: authApi,
  login: login,
  getSetting: getSetting,
  runCount: runCount,
  runInit: runInit,
  runLimit: runLimit,
  setConfig: setConfig,
  getConfig: getConfig
}
