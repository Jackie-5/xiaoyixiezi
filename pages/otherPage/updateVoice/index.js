import { $wuxToast } from '../../../dist/index';
import { requestAnimationFrame } from '../../../utils/util'

Page({
  data: {
    canvasWidth: wx.getSystemInfoSync().windowWidth,
    canvasHeight: 50,
    beginVoice: false,
  },
  onLoad() {
    this.initCanvas();
  },
  onReady() {

    // wx.getSetting({
    //   success: (res) => {
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success: () => {
    //
    //           // wx.getRecorderManager();
    //         },
    //         fail: () => {
    //           $wuxToast().show({
    //             type: 'cancel',
    //             duration: 1500,
    //             color: '#fff',
    //             text: '您禁止了授权，无法录音',
    //             success: () => console.log('您禁止了授权，无法录音')
    //           })
    //         }
    //       });
    //     }
    //   },
    //   fail: () => {
    //
    //   },
    // })
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.start();
  },
  backClick() {
    wx.navigateBack();
  },

  _globalAttenuationFn: function(x){
    return Math.pow(this.K*4/(this.K*4+Math.pow(x,4)),this.K*2);
  },

  _drawLine: function(attenuation, color, width){
    this.ctx.moveTo(0,0);
    this.ctx.beginPath();
    this.ctx.setStrokeStyle(color);
    this.ctx.setLineWidth(width || 1);
    var x, y;
    for (var i=-this.K; i<=this.K; i+=0.01) {
      x = this.data.canvasWidth*((i+this.K)/(this.K*2));
      y = this.data.canvasHeight/2 + this.noise * this._globalAttenuationFn(i) * (1/attenuation) * Math.sin(this.F*i-this.phase);
      this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
    this.ctx.draw();
  },
  _draw: function(){
    if (!this.run) return;
    this.phase = (this.phase+this.speed)%(Math.PI*64);
    this._clear();
    this._drawLine(-2, 'rgba(214,154,82,1)');
    // this._drawLine(-8, 'rgba(214,154,82,0.2)');
    // this._drawLine(4, 'rgba(214,154,82,0.5)');
    // this._drawLine(2, 'rgba(214,154,82,0.6)');
    // this._drawLine(1, 'rgba(214,154,82,1)', 1.5);

    requestAnimationFrame(this._draw.bind(this), 2000);
  },
  _clear: function(){
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
    this.ctx.globalCompositeOperation = 'source-over';
  },

  start: function(){
    this.phase = 0;
    this.run = true;
    this.set(0.3, 0.2);
    this._draw();
  },
  stop: function(){
    this.set(0, 0);
    this._draw();
    this._clear();
    this.run = false;
  },
  setNoise: function(v){
    this.noise = Math.min(v, 1)*this.MAX;
  },

  setSpeed: function(v){
    this.speed = v;
  },

  set: function(noise, speed) {
    this.setNoise(noise);
    this.setSpeed(speed);
  },

  initCanvas() {
    this.ctx = wx.createCanvasContext('canvas-container', this);
    this.K = 2;
    this.F = 6;
    this.speed = 0.1;
    this.noise = 0;
    this.phase = 0;
    this.MAX = (this.data.canvasHeight/2)-4;
    this.run = true;
    this.stop();
  },

  voiceDone() {
    this.stop();
    this.setData({
      beginVoice: false,
    });
  },
  voiceRestart() {
    this.stop();
    this.setData({
      beginVoice: false,
    });
  },
  voiceBegin() {
    const { beginVoice } = this.data;
    if (!beginVoice) {
      this.start();
      this.recorderManager.pause();
    } else {
      this.stop();
      this.recorderManager.pause()
    }
    this.setData({
      beginVoice: !beginVoice,
    });
  },



});
