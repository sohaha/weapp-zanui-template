module.exports = {
  onShareAppMessage() {
    return Object.assign({
      path: "/" + this.getCurrentPageUrl(),
    }, this.shareData || {})
  },
  getCurrentPageUrl(getArgs = true) {
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let url = currentPage.route
    let options = currentPage.options
    if (getArgs) {
      let urlWithArgs = url + "?"
      for (var key in options) {
        var value = options[key]
        urlWithArgs += key + "=" + value + "&"
      }
      url = urlWithArgs.substring(0, urlWithArgs.length - 1)
    }
    return url
  }
}
