import fetch from '../../utils/fetch';
import requestConfig from '../../utils/config/request';
import { $wuxToast } from '../../dist/index'

const { getProduct, getAlbumList } = requestConfig.index;

let nowPageIndex = 1;

Page({
  data: {
    tagLeft: [
      {
        name: '作品',
        checked: true,
        color: 'red',
        key: 'opus'
      },
      {
        name: '专辑',
        checked: false,
        color: 'default',
        key: 'album'
      }
    ],
    nowTagLeft: {},
    tagRight: [
      {
        name: '热门',
        checked: true,
        color: 'red',
        key: '567'
      },
      {
        name: '关注',
        checked: false,
        color: 'default',
        key: '765'
      },
      {
        name: '附近',
        checked: false,
        color: 'default',
        key: 'nearby'
      }
    ],

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
    const { nowTagLeft } = this.data;
    nowPageIndex = 1;
    wx.showNavigationBarLoading();
    if (nowTagLeft.key === 'opus') {
      this.loadImages(function () {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
      });
    } else {
      this.getAlbumList(function () {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
      });
    }
  },
  onReachBottom: function () {
    const { nowTagLeft } = this.data;
    nowPageIndex += 1;
    if (nowTagLeft.key === 'opus') {
      if (this.data.loading.load) {
        this.loadImages();
      }
    } else {
      if (this.data.loading.load) {
        this.getAlbumList();
      }
    }
  },

  onShow() {
    wx.showTabBar({
      animation: true,
    });
  },

  onLoad() {
    this.setData({
      nowTagLeft: this.data.tagLeft[0],
    }, function () {
      this.loadImages();
    });

  },

  loadImages: function (callback) {
    const _this = this;
    // 处理参数
    let tagRight = '';
    this.data.tagRight.forEach((item) => {
      if (item.checked) {
        tagRight = item.key
      }
    });

    fetch(getProduct, {

    })
      .then((data) => {
        this.setData({
          loading: {
            load: data.totalPage > nowPageIndex,
          }
        });
        this.pinterest.loadImages(data, data.totalPage <= nowPageIndex);
        callback && callback()
      });
  },

  leftTabSwitch: function (e) {
    const it = e.currentTarget.dataset.it;
    const { tagLeft, tagRight } = this.data;
    tagLeft.forEach((item) => {
      item.checked = it.key === item.key;
    });

    tagRight.forEach((item, i) => {
      item.checked = i === 0;
    });

    this.setData({
      nowTagLeft: it,
      tagLeft,
      tagRight,
    }, () => {
      this.restartLoad();
    });
  },
  rightTabSwitch: function (e) {
    const it = e.currentTarget.dataset.it;
    const { tagRight } = this.data;
    tagRight.forEach((item) => {
      item.checked = it.key === item.key;
    });
    this.setData({
      tagRight,
    }, () => {
      this.restartLoad();
    });
  },

  restartLoad:function (){
    const { nowTagLeft } = this.data;
    nowPageIndex = 1;
    if (nowTagLeft.key === 'opus') {
      this.loadImages();
    } else {
      this.getAlbumList();
    }
  },

  // onPageScroll: function (e) {
  //   this.setData({
  //     topBarNum: e.scrollTop
  //   })
  // },
  gotoPage: function (e) {
    // console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: `/pages/workDetail/index?nextItem=${e.currentTarget.dataset.item}`,
    })
  },

  getAlbumList: function (callback) {
    fetch(getAlbumList, {})
      .then((data) => {
        const { albumList } = this.data;
        let loading = {
          tip: '数据加载中',
          load: true
        };

        if (data.totalPage <= nowPageIndex) {
          loading = {
            tip: '已经到最底部啦',
            load: false
          };
        }

        this.setData({
          albumList:nowPageIndex === 1 ? data.data : albumList.concat(data.data),
          loading,
        });

        callback && callback();

      });
  },
  onClick: (e) => {
    console.log('12321');
  }
});
