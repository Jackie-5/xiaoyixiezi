//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'homepage',
    tagLeft: [
      {
        name: '作品',
        key: '',
        active: true,
      },
      {
        name: '专辑',
        key: '',
        active: false,
      }
    ],
    tagRight: [
      {
        name: '热门',
        key: '',
        active: true,
      },
      {
        name: '关注',
        key: '',
        active: false,
      }
    ]
  },
  handleChange ({ detail }) {
    this.setData({
        current: detail.key
    });
}
})
