import { $wuxToast } from '../dist/index'
const mockUrl = 'https://www.easy-mock.com/mock/5be25a98c937d969819aa14a';

const fetch = (url, params = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: mockUrl + url,
      method: 'get',
      data: params,
      ...options,
      success: function(res) {
        resolve(res.data)
      },
      fail: function () {
        $wuxToast().show({
          type: 'cancel',
          duration: 1500,
          color: '#fff',
          text: '接口请求失败',
        });
        reject({})
      }
    });
  })
};

module.exports = fetch;