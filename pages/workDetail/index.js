import { $wuxGallery } from '../../dist/index'
import fetch from '../../utils/fetch';
import requestConfig from "../../utils/config/request";

const { getInfoList, getAlbumList } = requestConfig.workDetail;

Page({
  data: {
    detailList: [
      {
        image: 'http://demo.sc.chinaz.com//Files/DownLoad/webjs1/201503/jiaoben3190/images/rustic-landscape.jpg',
        key: 'loading'
      }
    ],
    currentPage: 0,
    totalPage: 0,
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  onLoad() {
    this.getImgInfo();

    this.$wuxGallery = $wuxGallery();
    this.$wuxGallery.show();
  },

  getImgInfo() {
    const self = this;
    fetch(getInfoList, {
      currentPage: this.data.currentPage,
    }).then((data) => {
      console.log('12313');
      let detailList = [];
      this.data.detailList.forEach((item) => {
        if (item.key !== 'loading') {
          detailList.push(item);
        }
      });

      detailList = [
        ...detailList,
        ...data.data.data,
      ];


      if (data.data.currentPage < data.data.totalPage) {
        detailList.push({
          image: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
          key: 'loading',
        });
      }

      this.setData({
        detailList,
        currentPage: data.data.currentPage - 1,
        totalPage: data.data.totalPage,
      }, function () {
        this.$wuxGallery.setImage({
          urls: detailList,
          current: this.data.currentPage
        })
      });
    });
  },
})