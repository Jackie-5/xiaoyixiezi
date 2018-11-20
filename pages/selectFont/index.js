Page({
  data: {
    value1: '1',
    value2: '1',
    value3: '1',
    value4: '1',
  },
  onChange(field, e) {
    this.setData({
      [field]: e.detail.value
    })

    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})