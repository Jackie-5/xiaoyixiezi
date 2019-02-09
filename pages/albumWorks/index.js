import fetch from '../../utils/fetch';
import requestConfig from '../../utils/config/request';
import { $wuxToast } from '../../dist/index'

const { getProduct } = requestConfig.index;

let nowPageIndex = 1;

Page({
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    loading: {
      tip: '数据加载中',
      load: true
    },

    albumList: [],

  },
  onReady() {
    this.pinterest = getCurrentPages()[getCurrentPages().length - 1].selectComponent('#pinterest-container');
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    nowPageIndex = 1;
    this.loadImages(function () {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    });
  },
  onReachBottom: function () {
    if (this.data.loading.load) {
      nowPageIndex += 1;
      this.loadImages();
    }
  },
  onLoad: function () {
    this.loadImages();
  },

  loadImages: function (callback) {

    fetch(getProduct, {

    })
      .then((data) => {
        this.setData({
          loading: {
            load: data.totalPage > nowPageIndex,
          }
        });
        this.pinterest.loadImages(data, data.totalPage <= nowPageIndex);
        callback && callback();
      });
  },
  backClick: () => {
    wx.navigateBack();
  }
});
