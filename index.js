var language = ['icof/zh.json', 'icof/en.json', 'icof/ko.json'];
var first_language=navigator.language;
var len = language.length;
var doc = document;

for (var i=0; i<len; i++) {
  if (first_language.indexOf(language[i].slice(5,7)) !== -1 ) {
    var url = language[i];
  }
}

function getEleForInter() {
  var e = doc.all;
  var len = e.length;
  var arr = [];

  for (var i=0; i<len; i++) {
    if(e[i].getAttribute('t-data') !== null && e[i].getAttribute('t-data').indexOf('key') !== -1) {
      arr.push(e[i]);
    }
  }

  return arr;
}

var success = function(data) {
  var docObj = JSON.parse(data);
  var transArr = getEleForInter();
  var len = transArr.length;

  for (var i=0; i<len; i++) {
    var key = transArr[i].getAttribute('t-data').slice(4);
    transArr[i].innerText = docObj[key];
  }
}

ajax({
  url: url,
  method: 'get',
  async: true,
  success: success
});

var btn = doc.getElementsByTagName('button');

for (var j=0; j<btn.length; j++) {
  (function(n){
    btn[n].onclick = function() {
       url = language[n];
       ajax({
        url: url,
        method: 'get',
        async: true,
        success: success
      });
    }
  })(j)
}


