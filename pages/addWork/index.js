Page({
  data: {
    otherInfoList: [
      {
        label: '上传照片',
        key: 'updateImg',
        icon: 'icon-xiangji',
      },
      {
        label: '说一句话',
        key: 'voice',
        icon: 'icon-Voice',
      },
      {
        label: '写一段字',
        key: 'font',
        icon: 'icon-wenzi',
      },
      {
        label: '视频上传',
        key: 'uploadVideo',
        icon: 'icon-shipin',
      },
    ],
  },
  onShow() {
    wx.hideTabBar({
      animation: true,
    });
  },
  backHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  nextStep() {
    wx.navigateTo({
      url: '/pages/write/index',
    })
  }
});
