/** 判断当前用户是否已经登录 如果登录并返回用户信息*/
function isLogin() {
  try {
    var value = wx.getStorageSync('user_info')
    if (value) {
      // Do something with return value
      return value;
    } else {
      return false
    }
  } catch (e) {
    // Do something when catch error
    console.log(e)
    return false;
  }
}

/** 移除当前用户信息 */
function removeCurrentUser() {
  try {
    wx.removeStorageSync('user_info')
  } catch (e) {
    // Do something when catch error
    console.log(e)
  }
}

/** 存储用户信息 */
function setUserInfo(userInfo) {
  try {
    wx.setStorageSync('user_info', userInfo)
  } catch (e) {
    console.log(e)
  }
}

module.exports.isLogin = isLogin
module.exports.removeCurrentUser = removeCurrentUser
module.exports.setUserInfo = setUserInfo