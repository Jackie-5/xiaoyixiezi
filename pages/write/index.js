Page({
  data : {
    btnCurrentHeight: wx.getSystemInfoSync().windowHeight / 3 / 2
  },
  onReady() {

  },
  onMyEvent: function(e){
    console.log(e.detail);
    e.detail // 自定义组件触发事件时提供的detail对象
  }
  
});