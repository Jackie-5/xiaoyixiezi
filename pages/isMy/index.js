

Page({
  data: {
    infoTag: [
      {
        name: '关注',
        key: 'focus',
        number: '0',
      },
      {
        name: '粉丝',
        key: 'focus',
        number: '10',
      },
      {
        name: '获赞',
        key: 'zan',
        number: '100',
      },
    ],
    infoList: [
      {
        name: '我的作品',
        icon: 'icon-zuopin1',
        key: 'product',
      },
      {
        name: '我的专辑',
        icon: 'icon-zhuanjishenhe',
        key: 'album',
      },
      {
        name: '我的收藏',
        icon: 'icon-shoucangxing2',
        key: 'collect',
      },
      {
        name: '我的关注',
        icon: 'icon-chakantieziguanzhu',
        key: 'focus',
      },
      {
        name: '我的字库',
        icon: 'icon-kucunguanli',
        key: 'warehouse',
      },
      {
        name: '我的图章',
        icon: 'icon-fl-zhang',
        key: 'stamp',
      },
      {
        name: '已度商城',
        icon: 'icon-shangcheng',
        key: 'store',
      },
      {
        name: '我的订单',
        icon: 'icon-tianchongxing-',
        key: 'indent',
      },
    ],
    lvNumber: 10,
    desc: '留下一句话留下一句话留下一句话留下一句话留下一句话留下一句话',
    photo: 'http://demo.sc.chinaz.com//Files/DownLoad/webjs1/201503/jiaoben3190/images/rustic-landscape.jpg'
  },
  onShow() {
    wx.showTabBar({
      animation: true,
    });
  },
  cardClick(e) {
    const item = e.currentTarget.dataset.item;

    if (item.key === 'product') {
      wx.navigateTo({
        url: '/pages/otherWorks/index',
      })
    } else if (item.key === 'album') {
      wx.navigateTo({
        url: '/pages/albumWorks/index',
      })
    }
  }
});
