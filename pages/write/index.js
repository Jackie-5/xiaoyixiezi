const constant = require('../../utils/constant');
const { MARGIN_HEIGHT, MARGIN_WIDTH } = constant;


Page({
  data : {
    writeWidth: wx.getSystemInfoSync().windowWidth - MARGIN_WIDTH,
    writeMarginLeft: MARGIN_WIDTH / 2,
    boxHeight: wx.getSystemInfoSync().windowHeight - MARGIN_HEIGHT,
    btnCurrentHeight: (wx.getSystemInfoSync().windowHeight - MARGIN_HEIGHT) / 3 / 2,
    current: ''
  },
  onReady() {

  },
  onMyEvent: function(e){
    console.log(e.detail);
    e.detail // 自定义组件触发事件时提供的detail对象
  },
  handleChange: function(e){

  },
});