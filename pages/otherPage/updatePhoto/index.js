Page({
  data: {
    fileList: [
      {
        uid: 0,
        status: 'uploading',
        url: 'https://wux.cdn.cloverstd.com/qrcode.jpg',
      }
    ],
  },
  backClick() {
    wx.navigateBack();
  },
  onSuccess(e) {
    console.log('onSuccess', e)
  },
  onFail(e) {
    console.log('onFail', e)
  },
  onComplete(e) {
    console.log('onComplete', e)
  },
  onProgress(e) {
    console.log('onProgress', e)
    this.setData({
      progress: e.detail.file.progress,
    })
  },
  onPreview(e) {
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onRemove(e) {
    this.setData({
      fileList: [],
    });
  },
});
