import fetch from '../../utils/fetch';
import requestConfig from '../../utils/config/request';
import { $wuxToast } from '../../dist/index'

const { getProduct, getAlbumList } = requestConfig.index;

let col1H = 0;
let col2H = 0;
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
  onReady() {

  },

  onLoad() {
    try {
      const systemInfo = wx.getSystemInfoSync();
      const ww = systemInfo.windowWidth;
      const wh = systemInfo.windowHeight;
      const imgWidth = ww * 0.48;
      nowPageIndex = 1;
      this.setData({
        nowTagLeft: this.data.tagLeft[0],
      }, () => {
        this.setData({
          scrollH: wh,
          imgWidth: imgWidth
        });
        this.loadImages();
      });
    } catch (e) {
      $wuxToast().show({
        type: 'cancel',
        duration: 1500,
        color: '#fff',
        text: '获取系统信息失败',
      });
    }
  },
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    const oImgW = e.detail.width;         //图片原始宽度
    const oImgH = e.detail.height;        //图片原始高度
    const imgWidth = this.data.imgWidth;  //图片设置的宽度
    const scale = imgWidth / oImgW;        //比例计算
    const imgHeight = oImgH * scale;      //自适应高度

    const images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    const loadingCount = this.data.loadingCount - 1;
    const col1 = this.data.col1;
    const col2 = this.data.col2;

    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    const data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
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
        let images = [];
        let col1 = [];
        let col2 = [];
        if (nowPageIndex === 1) {
          images = data.data;
        } else {
          images = [..._this.data.images, ...data.data];
          col1 = _this.data.col1;
          col2 = _this.data.col2;
        }

        let baseId = `img-${+new Date()}`;

        for (let i = 0; i < images.length; i++) {
          images[i].id = baseId + "-" + i;
        }

        _this.setData({
          loadingCount: images.length,
          images,
          col1,
          col2,
          loading: {
            tip: '数据加载中',
            load: true
          }
        });

        if (data.totalPage <= nowPageIndex) {
          _this.setData({
            loading: {
              tip: '已经到最底部啦',
              load: false
            }
          });
        }
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
  }
});
