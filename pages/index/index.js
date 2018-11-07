let col1H = 0;
let col2H = 0;
let nowPageIndex = 1;
const fetch = require('../../utils/fetch');
Page({
  data: {
    tagLeft: [
      {
        name: '作品',
        checked: true,
        color: 'red',
        icon: 'icon-zuopin',
        key: '123'
      },
      {
        name: '专辑',
        checked: false,
        color: 'default',
        icon: 'icon-zhuanji',
        key: '321'
      }
    ],
    tagRight: [
      {
        name: '热门',
        checked: true,
        color: 'red',
        icon: 'icon-remen',
        key: '567'
      },
      {
        name: '关注',
        checked: false,
        color: 'default',
        icon: 'icon-xin',
        key: '765'
      }
    ],
    topBarNum: false,

    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    loading: {
      tip: '数据加载中',
      load: true
    }
  },
  onPullDownRefresh: function () {
    nowPageIndex = 1;
    wx.showNavigationBarLoading();
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

    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        this.loadImages();
      }
    })
  },
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    let data = {
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
    let tagLeft = '';
    let tagRight = '';

    this.data.tagLeft.forEach((item) => {
      if (item.checked) {
        tagLeft = item.key
      }
    });

    this.data.tagRight.forEach((item) => {
      if (item.checked) {
        tagRight = item.key
      }
    });

    fetch('/indexHome')
        .then((data)=> {
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

  tabSwitch: function (e) {
    const it = e.currentTarget.dataset.it;
    const tagList = this.data[e.currentTarget.dataset.param];

    tagList.forEach((item) => {
      item.checked = it.key === item.key;
    });


    this.setData({
      [e.currentTarget.dataset.param]: tagList,
    }, function () {
      nowPageIndex = 1;
      this.loadImages();
    });
  },
  onPageScroll: function (e) {
    this.setData({
      topBarNum: e.scrollTop
    })
  },
  gotoPage: function (e) {
    console.log(e.currentTarget.dataset.item)
    // wx.navigateTo({
    //   url: ''
    // })
  }
});
