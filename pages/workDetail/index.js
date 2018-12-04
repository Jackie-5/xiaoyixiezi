import { $wuxGallery } from '../../dist/index'

Page({
  data: {
    urls: [
      'https://unsplash.it/200/200',
      'https://unsplash.it/300/300',
      'https://unsplash.it/400/400',
      'https://unsplash.it/600/600',
      'https://unsplash.it/800/800',
      'https://unsplash.it/900/900',
      'https://unsplash.it/1000/1000',
      'https://unsplash.it/1200/1200',
    ],
  },
  onLoad() {
    const { urls } = this.data
    $wuxGallery().show({
      current: 0,
      duration: 200,
      circular: true,
      urls: urls.map((n) => ({ image: n, remark: 'asfasdfa' })),
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