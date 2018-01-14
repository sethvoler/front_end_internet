/* 封装 ajax 函数
 * @param {string}opt.type http 连接的方式，包括 GET 和 POST 两种
 * @param {string}opt.url 发送请求的 url
 * @param {boolean}opt.async 是否为异步请求，true 为异步，false 为同步
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax 发送并接受成功调用的回调函数
 */

 function ajax(opt) {
  opt = opt || {};
  opt.method = opt.method.toUpperCase() || 'POST';
  opt.url = opt.url || '';
  opt.aysnc = opt.async || true;
  opt.data = opt.data || null;
  opt.success = opt.success || function () {};

  var xmlHttp = null;

  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }

  var params = [];

  for (var key in opt.data) {
    params.push(key + '=' + opt.data[key]);
  }

  var postData = params.join('&');

  if (opt.method === 'POST') {
    xmlHttp.open(opt.method, opt.url, opt.async);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    xmlHttp.send(postData);
  } else if (opt.method === 'GET') {
    xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
    xmlHttp.send(null);
  } else {
    return;
  }

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      opt.success(xmlHttp.responseText);
    } else {
      //console.log('wrong');
    }
  };
 }