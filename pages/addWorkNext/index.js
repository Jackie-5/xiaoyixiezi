

Page({
  data: {
    otherInfoList: [

    ],
  },
  nextClick: () => {
    wx.navigateTo({
      url: '/pages/write/index?redirect=/pages/index/index'
    });
  },
  backClick: () => {
    wx.navigateBack()
  }
});
