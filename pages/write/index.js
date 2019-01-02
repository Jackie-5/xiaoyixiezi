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
        color: '#999',
      },
      {
        name: '颜色',
        key: 'color',
        icon: 'icon-color-plate-fill',
        color: '#999',
      },
      {
        name: '粗细',
        key: 'bold',
        icon: 'icon-huabidaxiao',
        color: '#999',
      },
      {
        name: '边框',
        key: 'border',
        icon: 'icon-kexuanzuobiankuang',
        color: '#999',
      },
      {
        name: '临摹',
        key: 'imitation',
        icon: 'icon-combinedshapecopy2',
        color: '#999',
      },
    ],
    colorPopShow: false,
    writeColor: ['#666666', '#999999', '#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
    canvasPenColor: '#666666',
  },
  onReady() {
    this.canvas = getCurrentPages()[getCurrentPages().length - 1].selectComponent('#canvas-container');
  },
  onMyEvent: function(e){
    console.log(e.detail);
    e.detail // 自定义组件触发事件时提供的detail对象
  },
  handleChange: function(e){

  },

  barBindTab: function (e) {
    const item = e.currentTarget.dataset.item;
    if (item.key === 'reload') {
      this.canvas.clearCanvas();
    } else if (item.key === 'color') {
      this.setData({
        colorPopShow: true,
      })
    }
  },
  popupClose: function (e) {
    console.log(e);
    const key = e.target.dataset.closekey;
    this.setData({
      [key]: false,
    })
  }

});