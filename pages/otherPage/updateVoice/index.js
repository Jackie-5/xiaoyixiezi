import { $wuxToast } from '../../../dist/index';

Page({
  data: {

  },
  onReady() {

    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success: () => {

              // wx.getRecorderManager();
            },
            fail: () => {
              $wuxToast().show({
                type: 'cancel',
                duration: 1500,
                color: '#fff',
                text: '您禁止了授权，无法录音',
                success: () => console.log('您禁止了授权，无法录音')
              })
            }
          });
        }
      },
      fail: () => {

      },
    })
  },
  backClick() {
    wx.navigateBack();
  },

});
