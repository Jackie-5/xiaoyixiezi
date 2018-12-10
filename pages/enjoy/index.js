Page({
  data: {
    tabs: ['赏析', '照片', '音频', '视频'],
    character: [
      {
        value: '学长他就像我生命中的灵感，他让我了解爱的积极意义，他就像是让我一直前进的动力， 其实这部在内地12年上映的泰国校园爱情小清新电影，每次想到学生时期的那份纯纯爱恋，总是会把它再刷一遍，遍遍的感触都不同，就像那个她永远在我心裡，但却越来越模糊。 校园+淡淡初恋+死党...'
      }
    ],

    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    ],


    indicatorDots: false,
    autoplay: false,
    duration: 200,
    circular: false
  },
  tabsChange:(e) => {
    console.log(e);
  },
  swiperAnimatEnd: function (e) {
    const { imgUrls } = this.data;
    if (e.detail.current > (this.data.imgUrls.length - 2)) {
      imgUrls.push('http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg');
      this.setData({
        imgUrls
      });
    }
  },
})