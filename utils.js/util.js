const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function json2Form(json) {

  var str = [];

  for (var p in json) {

    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));

  }

  return str.join("&");

}

//时间戳转换时间  
function toDate(number) {
  var n = number * 1000;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
}



function configHousePicUrl(urlString) {
  var url = '';
  var that = this;
  var array = [];
  if (this.isNotBlank(urlString)) {
    array = urlString.split('|')
    if (array.length > 0) {
      if (array[0].indexOf("http") != -1) {
        url = array[0];
      } else {
        url = getApp().globalData.httpPicBase + array[0];
      }
    }
  }
  if (url.indexOf("biwbp") != -1) {
    url = url.replace("biwbp", "xl")
  }
  return url;
}


function isNotBlank(string) {
  if (string == null) {
    return false;
  } else if (string == undefined) {
    return false;
  } else if (string == "undefined") {
    return false;
  } else if (string.length == 0) {
    return false;
  } else {
    return true;
  }
}

function isEmpty(string) {
  if (string == null) {
    return true;
  } else if (string == undefined) {
    return true;
  } else if (string == "undefined") {
    return true;
  } else if (string.length == 0) {
    return true;
  } else {
    return false;
  }
}

function isNotUndefined(value) {
  if (value === undefined) {
    return false
  } else if (value == undefined) {
    return false
  } else if (typeof(value) == "undefined") {
    return false
  } else if (string == "undefined") {
    return false;
  } else {
    return true
  }
}



function configTimeInterval(second, timeStamp) {
  if (second < 0) {
    second = 1;
  }
  var prettyDate = '';
  if (second < 60 * 60 * 24 * 30) {
    if (second < 60) {
      prettyDate = second + '秒前';
    } else if (second < 60 * 60) {
      prettyDate = (second / 60).toFixed(0) + '分钟前'
    } else if (second < 60 * 60 * 24) {
      prettyDate = (second / 60 / 60).toFixed(0) + '小时前'
    } else {
      prettyDate = (second / 60 / 60 / 24).toFixed(0) + '天前'
    }
  } else {
    var newDate = new Date();
    newDate.setTime(timeStamp);
    prettyDate = newDate.format('YYYY-MM-dd')
  }
  return prettyDate;
}

//时间戳转时间字符串
function configReleaseTime(timeStamp) {
  var newDate = new Date();
  newDate.setTime(timeStamp);
  var prettyDate = newDate.format('YYYY.MM.dd hh:mm')
  return prettyDate;
}

module.exports.configReleaseTime = configReleaseTime


Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
        date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

module.exports.configTimeInterval = configTimeInterval


/** 判断对象是否为空 */
function judgeObj(obj) {
  if (JSON.stringify(obj) == "{}" || obj == null) return true;
  else return false;
}

/** 判断数组是否为空 */
function judgeArray(arr) {
  if (arr == null || arr == undefined) {
    return true
  } else {
    if (arr.length == 0) {
      return true
    } else {
      return false
    }
  }
}

/** string == null return -- */
function formatEmptyHouseAttribute(obj) {
  var string = '';
  if (this.isString(obj)) {
    string = obj;
  } else if (obj == null) {
    return '--'
  } else {
    string = obj.toString()
  }
  if (this.isNotBlank(string)) {
    return string;
  } else {
    string = '--'
    return string;
  }
}

//配置图片
function formatHouseListPic(obj) {
  var picUrl = ""
  var list = [];
  if (this.isNotBlank(obj)) {
    if (obj.indexOf(",") != -1) {
      list = obj.split(",")
      picUrl = getApp().globalData.httpPicBase + list[0]
    } else {
      picUrl = getApp().globalData.httpPicBase + obj;
    }
    return picUrl;
  } else {
    return '/assets/house_no_pic.png'
  }
}

//将用逗号分隔的字符串转化为数组
function formatStringToList(string) {
  var list = [];
  if (this.isNotBlank(string)) {
    console.log(string)
    if (string.indexOf(',') != -1) {
      string.split(',').forEach(function(item) {
        list.push(getApp().globalData.httpPicBase + item)
      })
    } else {
      list.push(getApp().globalData.httpPicBase + string)
    }
     return list

  } else {
    return null
  }
}


//判断是否是字符串
function isString(str) {
  if (Object.prototype.toString.call(str) === "[object String]") {
    return true;
  } else {
    return false;
  }
}

/**验证身份证号 */
function verifyIDCard(id) {
  // 1 "验证通过!", 0 //校验不通过
  var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
  //号码规则校验
  if (!format.test(id)) {
    return {
      'status': 0,
      'msg': '身份证号码不合规'
    };
  }
  //区位码校验
  //出生年月日校验   前正则限制起始年份为1900;
  var year = id.substr(6, 4), //身份证年
    month = id.substr(10, 2), //身份证月
    date = id.substr(12, 2), //身份证日
    time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
    now_time = Date.parse(new Date()), //当前时间戳
    dates = (new Date(year, month, 0)).getDate(); //身份证当月天数
  if (time > now_time || date > dates) {
    return {
      'status': 0,
      'msg': '出生日期不合规'
    }
  }
  //校验码判断
  var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
  var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); //校验码对照表
  var id_array = id.split("");
  var sum = 0;
  for (var k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k]);
  }
  if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
    return {
      'status': 0,
      'msg': '身份证校验码不合规'
    }
  }
  return {
    'status': 1,
    'msg': '校验通过'
  }
}

/**三十二位随机数 */
function randomWord() {

  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var nums = "";

  for (var i = 0; i < 32; i++) {

    var id = parseInt(Math.random() * 61);

    nums += chars[id];

  }

  return nums;

}


/**验证手机号 */
function vaildPhone(tel) {
  var myreg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
  if (!this.isNotBlank(tel)) {
    return false;
  } else if (!myreg.test(tel)) {
    return false;
  } else {
    return true;
  }
}

/**验证邮件*/
function vaildEmail(email) {
  var emailReg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
  if (!this.isNotBlank(email)) {
    return false;
  } else if (!emailReg.test(email)) {
    return false;
  } else {
    return true;
  }
}


// 6-16位数字加字母组合密码
function checkPwd(pwd) {
  var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  var re = new RegExp(reg)
  if (re.test(pwd)) {
    return true;
  } else {
    return false;
  }
}


//获取当前的url
function getCurrentPageUrl() {
  var pages = getCurrentPages() //获取加载的页面 
  var currentPage = pages[pages.length - 1] //获取当前页面的对象 
  var url = currentPage.route //当前页面url 
  return url
}


/** 判断当前输入的是否为整数 */
function isNumber(val) {
  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}

//正则验证，只能为数字面积小数点后不能大于两位数字
function isNumberAndfix2(value) {
  var data;
  if (/^(\d?)+(\.\d{0,2})?$/.test(value)) { //正则验证，只能为数字面积小数点后不能大于两位数字
    data = value;
  } else {
    data = "";
  }
  return data
}

//只能为数字和字母
function isNumberOrChar(value) {
  var data;
  if (/^[0-9a-zA-Z]*$/g.test(value)) { //正则验证，只能为数字面积小数点后不能大于两位数字
    data = value;
  } else {
    data = "";
  }
  return data
}

//正数（包括小数)
function isPositiveNumber(value) {
  var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
  return reg.test(value)
}

//是否含有中文（也包含日文和韩文）
function isChineseChar(str) {
  var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  return reg.test(str);
}

function showLoading(mask) {
  wx.showLoading({
    title: '加载中...',
    mask: mask
  })
}

//找不到房源信息的提示
function showMoadl(msg) {
  wx.showModal({
    title: '温馨提示',
    content: msg,
    showCancel: false,
    confirmText: '知道了',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  json2Form: json2Form,
  toDate: toDate,
  isNotBlank: isNotBlank,
  isEmpty: isEmpty,
  isNotUndefined: isNotUndefined,
  judgeObj: judgeObj,
  judgeArray: judgeArray,
  isString: isString,
  vaildPhone: vaildPhone,
  vaildEmail: vaildEmail,
  checkPwd: checkPwd,
  verifyIDCard: verifyIDCard,
  getCurrentPageUrl: getCurrentPageUrl,
  isNumber: isNumber,
  isChineseChar: isChineseChar,
  formatEmptyHouseAttribute: formatEmptyHouseAttribute,
  formatHouseListPic: formatHouseListPic,
  configTimeInterval: configTimeInterval,
  showLoading: showLoading,
  showMoadl: showMoadl,
  isNumberAndfix2: isNumberAndfix2,
  configHousePicUrl: configHousePicUrl,
  formatStringToList: formatStringToList,
  isNumberOrChar: isNumberOrChar,
  isPositiveNumber: isPositiveNumber
}