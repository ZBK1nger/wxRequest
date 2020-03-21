const util = require('../utils/util.js')
const user = require('../utils/user.js')
class Http {
  constructor() {
    this.API_ROOT = 'xxxxxxx'
  }
  /**
   * 发起get请求
   * @param url 请求路径 必填
   * @param data 请求参数 get请求的参数会自动拼到地址后面
   * @param headers 请求头 选填
   * @returns {Promise}
   */
  get(url, data, headers) {
    return this.request('GET', this.API_ROOT + url, data, headers)
  }

  /**
   * 发起post请求
   * @param url 请求路径 必填
   * @param data 请求参数
   * @param headers 请求头 选填
   * @returns {Promise}
   */
  post(url, data, headers) {
    return this.request('POST', this.API_ROOT + url, data, headers)
  }

  /**
   * Http请求
   */
  request(method, url, data, header) {
    header = this._configHeader(header)
    return new Promise((resolve, reject) => {
      const response = {};
      wx.request({
        url,
        method,
        data,
        header,
        success: (res) => response.success = res.data,
        fail: (error) => response.fail = error,
        complete() {
          if (response.success) {
            resolve(response.success)
          } else {
            wx.hideLoading()
            reject(response.fail)
          }
        },
      });
    });
  }

  /**
   * 配置请求头
   */
  _configHeader(header) {
    if (!util.isNotBlank(header)) {
      header = {
        'content-type': 'application/json'
      }
    }
    if (user.isLogin()) {
      header["X-Access-Token"] = user.isLogin().token ? user.isLogin().token : ""
    }
    return header
  }
}

export default Http
