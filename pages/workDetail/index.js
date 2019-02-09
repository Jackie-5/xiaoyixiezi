import fetch from '../../utils/fetch';
import requestConfig from "../../utils/config/request";

const { getInfoList } = requestConfig.workDetail;

Page({
  data: {
    detailList: [],
    currentPage: 0,
    pageSize: 10,
    totalPage: 0,
    duration: 200,
    getImageNumber: 6,
    current: 0,
    currentData: {},
    swiperIndex: 0,
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  onLoad() {
    this.getImgInfo();
  },
  onTap(e) {
    const item = e.target.dataset.item;
    wx.previewImage({
      current: item.image,
      urls: [ item.image ],
    });
  },

  animationFinish(e) {
    const current = e.detail.current + 1;
    const { getImageNumber, swiperIndex, totalPage } = this.data;
    if ((current % getImageNumber) === 0 && current > swiperIndex && current < (totalPage / 2)) {
      this.getImgInfo();
      this.setData({
        swiperIndex: current,
      })
    }
    this.setData({
      current: e.detail.current,
      currentData: this.data.detailList[e.detail.current],
    });
  },


  getImgInfo() {
    fetch(getInfoList, {
      currentPage: this.data.currentPage,
      pageSize: this.data.pageSize,
    }).then((data) => {
      const dataObj = {
        detailList: data.data,
        totalPage: data.totalPage,
      };
      if (this.data.detailList && this.data.detailList.length > 0) {
        dataObj.detailList = [...this.data.detailList, ...data.data];
      } else {
        dataObj.currentData = dataObj.detailList[0];
      }
      this.setData(dataObj)
    });
  },

  onPraise() {
    const { currentData } = this.data;
    console.log(currentData);
  },

  onComments() {
    const { currentData } = this.data;
    wx.navigateTo({
      url: '/pages/comments/index?id=xxx'
    })
  },
  backClick() {
    wx.navigateBack()
  },

});
