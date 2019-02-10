Page({
  data: {
    otherInfoList: [
      {
        label: '上传照片',
        key: 'updateImg',
        icon: 'icon-xiangji',
        link: '/pages/otherPage/updatePhoto/index',
      },
      {
        label: '说一句话',
        key: 'voice',
        icon: 'icon-Voice',
        link: '/pages/otherPage/updatePhoto/index',
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
  backClick() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  nextStep() {
    wx.navigateTo({
      url: '/pages/addWorkNext/index',
    });
  },
  otherClick(e) {
    const { item } = e.currentTarget.dataset;
    wx.navigateTo({
      url: item.link,
    });
  },
});
