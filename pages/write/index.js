const constant = require('../../utils/constant');
const { MARGIN_HEIGHT, MARGIN_WIDTH } = constant;


Page({
  data : {
    writeWidth: wx.getSystemInfoSync().windowWidth - MARGIN_WIDTH,
    writeMarginLeft: MARGIN_WIDTH / 2,
    boxHeight: wx.getSystemInfoSync().windowHeight - MARGIN_HEIGHT,
    btnCurrentHeight: (wx.getSystemInfoSync().windowHeight - MARGIN_HEIGHT) / 3 / 2,
    current: '',
    functionData: [
      {
        name: '重写',
        key: 'reload',
        icon: 'icon-zhongxinshenqing',
        color: '#000',
      },
      {
        name: '颜色',
        key: 'color',
        icon: 'icon-color-plate-fill',
        color: '#000',
      },
      {
        name: '粗细',
        key: 'bold',
        icon: 'icon-huabidaxiao',
        color: '#000',
      },
      {
        name: '边框',
        key: 'border',
        icon: 'icon-kexuanzuobiankuang',
        color: '#000',
      },
      {
        name: '临摹',
        key: 'imitation',
        icon: 'icon-combinedshapecopy2',
        color: '#000',
      },
    ],
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