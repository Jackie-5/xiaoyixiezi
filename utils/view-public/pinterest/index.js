
let col1H = 0;
let col2H = 0;

Component({
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images:[],
    col1: [],
    col2: [],
    loading: {
      tip: '数据加载中',
      load: true
    },
    nowPageIndex: 1,
  },
  properties: {

  },
  attached() {
    try {
      const systemInfo = wx.getSystemInfoSync();
      const ww = systemInfo.windowWidth;
      const wh = systemInfo.windowHeight;
      const imgWidth = ww * 0.48;
      this.setData({
        scrollH: wh,
        imgWidth: imgWidth
      });
    } catch (e) {
    }
  },
  methods: {
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

    loadImages: function (newVal, isEnd) {
      const { col1, col2 } = this.data;
      const images = [...this.data.images, ...newVal.data];

      let baseId = `img-${+new Date()}`;

      for (let i = 0; i < images.length; i++) {
        images[i].id = baseId + "-" + i;
      }

      this.setData({
        loadingCount: images.length,
        images,
        col1,
        col2,
        loading: {
          tip: '数据加载中',
          load: true
        }
      });

      if (isEnd) {
        this.setData({
          loading: {
            tip: '已经到最底部啦',
            load: false
          }
        });
      }
    },
  },

});
