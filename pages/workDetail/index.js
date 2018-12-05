import { $wuxGallery } from '../../dist/index'

Page({
  data: {
    urls: [
      'http://demo.sc.chinaz.com//Files/DownLoad/webjs1/201503/jiaoben3190/images/rustic-landscape.jpg',
      'http://demo.sc.chinaz.com//Files/DownLoad/webjs1/201503/jiaoben3190/images/rustic-landscape.jpg',
      'https://unsplash.it/400/400',
      'https://unsplash.it/600/600',
      'https://unsplash.it/800/800',
      'https://unsplash.it/900/900',
      'https://unsplash.it/1000/1000',
      'https://unsplash.it/1200/1200',
    ],
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },
  onLoad() {

    const { urls } = this.data
    $wuxGallery().show({
      current: 0,
      duration: 200,
      circular: true,
      urls: urls,
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
        console.log(e)
      },
    })

  },
})