import { $wuxGallery } from '../../dist/index'
import fetch from '../../utils/fetch';
import requestConfig from "../../utils/config/request";

const { getInfoList, getAlbumList } = requestConfig.workDetail;

Page({
  data: {
    detailList: [],
    currentPage: 0,
    totalPage: 0,
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  onLoad() {
    this.getImgInfo();
    // fetch(getInfoList, {
    //
    // }).then((data) => {
    //
    // });
    // const { detailList } = this.data;
    // $wuxGallery().show({
    //   current: 0,
    //   duration: 200,
    //   circular: true,
    //   urls: detailList.map((item) => item.imgUrl),
    //   showDelete: false,
    //   indicatorDots: false,
    //   indicatorColor: '#fff',
    //   indicatorActiveColor: '#04BE02',
    //   onTap() {
    //     return false
    //   },
    //   cancel() {
    //     console.log('Close gallery')
    //   },
    //   onChange(e) {
    //     console.log(e)
    //   },
    // })

  },

  getImgInfo() {
    const self = this;
    fetch(getInfoList, {
      currentPage: this.data.currentPage,
    }).then((data) => {

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
          imgUrl: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
          key: 'loading',
        });
      }

      this.setData({
        detailList,
        currentPage: data.data.currentPage - 1,
        totalPage: data.data.totalPage,
      }, function () {
        $wuxGallery().show({
          current: this.data.currentPage,
          duration: 200,
          circular: true,
          urls: this.data.detailList.map((item) => item.imgUrl),
          showDelete: false,
          indicatorDots: false,
          indicatorColor: '#fff',
          indicatorActiveColor: '#04BE02',
          onTap() {
            return false
          },
          cancel() {
            console.log('Close gallery')
          },
          onChange(e) {
            if (self.data.currentPage < self.data.totalPage) {
              self.setData({
                currentPage: self.data.currentPage += 1,
              });
              self.getImgInfo();
            }
          },
        })
      });
    });
  },
})