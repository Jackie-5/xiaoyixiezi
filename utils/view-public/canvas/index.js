const constant = require('../../constant');
const { MARGIN_HEIGHT, MARGIN_WIDTH } = constant;

Component({
  externalClasses: [],
  data: {
    containerBg: 'canvas-container-bg',
    canvasWidth: wx.getSystemInfoSync().windowWidth - MARGIN_WIDTH,
  },

  properties: {
    container: {
      type: String,
      value: 'canvas-container',
    },
    currentHeight: {
      type: String,
      value: `${(wx.getSystemInfoSync().windowHeight - MARGIN_HEIGHT) / 3 * 2}px`,
    },
    penColor: {
      type: String,
      value: '#000',
    },
    penSize: {
      type: Number,
      value: 10
    }
  },
  attached() {
    this.initCanvas();
  },
  methods: {
    changePenColor() {
      this.setData({
        penColor: ''
      })
    },
    initCanvas() {
      const { container, containerBg, canvasWidth } = this.data;
      this.writeCtx = wx.createCanvasContext(container, this);
      this.bgCanvas = wx.createCanvasContext(containerBg, this);
      this.beginWrite = false;
      this.penmanship = [];
      this.fontWidth = canvasWidth;
      this.moveSum = 0;
    },
    canvasStart(e) {
      const x = e.touches[0].x;
      const y = e.touches[0].y;
      this.stroke = {
        newDate: new Date,
        d: [
          {
            x: x,
            y: y,
            t: 0
          }],
        c: this.data.penColor,
        p: this.data.penSize
      };
      this.canvasBeginMove(x, y);
    },
    convasEnd(e) {
      this.penmanship.length ? this.stroke.newDate -= this.penmanshipTime :
        (this.penmanshipTime = this.stroke.newDate,
          this.stroke.newDate = this.stroke.newDate.getTime()),
        this.penmanship.push(e.stroke),
        this._clearQueue = null,
        this.repeatQueue = [],
        this.stroke = null;
      --this.writeCtx.lineWidth;
      for (var b; this.moveQueue.length;) b = this.moveQueue.shift(), this.actionPaint(b, this.fontWidth / 320 * this.penSize / 8);
      this.showToCanvas();
    },

    showToCanvas() {
      this.bgCanvas.clearRect(0, 0, wx.getSystemInfoSync().windowWidth, 402);
      wx.canvasGetImageData({
        canvasId: this.data.container,
        x: 0,
        y: 0,
        width: wx.getSystemInfoSync().windowWidth,
        height: 402,
        success: (b) => {
          // 背景RGBA 色值
          for (var c = 0; c < b.data.length; c += 4) {
            if (0 != b.data[c + 3] && (b.data[c] = 100)) {
              b.data[c + 0] = 18;
              b.data[c + 1] = 65;
              b.data[c + 2] = 111;
              b.data[c + 3] = Math.round(1 * b.data[c + 3])
            }
          }
          wx.canvasPutImageData({
            canvasId: this.data.containerBg,
            x: 0,
            y: 0,
            data: b.data,
            width: wx.getSystemInfoSync().windowWidth,
            height: 402,
            success: () => {
              console.log('put 成功')
            }
          }, this)
        },
        fail: (e) => {
          console.log(e)
        }
      }, this)
    },

    canvasTouchMove(e) {
      const x = e.touches[0].x;
      const y = e.touches[0].y;
      this.stroke.d.push(
        {
          x: x,
          y: y,
          moveDate: new Date - this.stroke.newDate
        });
      this.canvasMoving(x, y);
    },

    canvasBeginMove(x, y) {
      this.beginWrite = true;
      this.writeCtx.save();
      this.writeCtx.moveTo(x, y);
      this.preDot = null;
      this.moveQueue = [];
      this.firstMove = 0;
      this.lineWidth = this.data.penSize / 2 * (this.fontWidth / 320);
      this.canvasMoving(x, y);
    },

    canvasMoving(b, c) {
      var d;
      d = 0;
      if (this.moveQueue.length && (d = this.moveQueue[this.moveQueue.length - 1], d = Math.sqrt((d.x - b) * (d.x - b) + (d.y - c) * (d.y - c)), 0 == d)) return;
      this.moveSum++;
      !this.firstMove && 2 == this.moveQueue.length && 4 * d < this.moveQueue[1].c && (this.moveQueue[0].x -=
        2 / 3 * (this.moveQueue[0].x - this.moveQueue[1].x), this.moveQueue[0].y -= 2 / 3 * (this.moveQueue[0].y - this.moveQueue[1].y), this.moveQueue[1].c /= 2 / 3 * this.moveQueue[1].c);
      d = { x: b, y: c, c: d };
      this.moveQueue.push(d);
      3 <= this.moveQueue.length && (d = this.moveQueue.shift(), this.actionPaint(d));
    },

    actionPaint(b, c) {
      var d = b.x, e = b.y, h = b.c;
      if (!this.preDot || 0 !== h) {
        this.nextDot = this.moveQueue.length ? this.moveQueue[0] : null;
        if (h) {

          this.writeCtx.moveTo(this.preDot.x, this.preDot.y);
          var f = 0;
          !this.firstMove && this.nextDot && h > 3 * this.nextDot.c &&
          (h /= 4, f = 1);
          this.firstMove = 1;
          var bs = this.fontWidth / 320 * this.data.penSize;
          c || (c = h < .003125 * this.fontWidth ? 1.625 * bs : h < .00625 * this.fontWidth ? 1.375 * bs : h < .009375 * this.fontWidth ? 1.25 * bs : h < .015625 * this.fontWidth ? 1.125 * bs : h < .021875 * this.fontWidth ? bs : h < .028125 * this.fontWidth ? .875 * bs : h < .034375 * this.fontWidth ? .75 * bs : h < .046875 * this.fontWidth ? .625 * bs : h < .0625 * this.fontWidth ? .5 * bs : .375 * bs);
          this.toLW = c;
          if (f) for (f = 1; 3 >= f; f++) this.paintDot(d + f / 3 * (this.preDot.x - d), e + f / 3 * (this.preDot.y - e), h)
        }
        this.paintDot(d, e, h);
        this.preDot = b;
      }
    },

    paintDot(b, c, d) {
      var e = this.lineWidth, h = this.data.penColor;
      this.writeCtx.setFillStyle(h);
      this.writeCtx.setStrokeStyle(h);
      if (this.preDot) {
        d = Math.floor(Math.abs(d) / (this.lineWidth / 3));
        if (1 < d) for (var e = this.lineWidth,
                          f = 0; f < d; f++) e -= (e - this.toLW) / (8 < d ? d : 8); else Math.abs(this.lineWidth - this.toLW) > this.fontWidth / 320 * this.penSize * .025 && (e = this.lineWidth - (this.lineWidth - this.toLW) / 8);
        var g = this.lineWidth * Math.sin(Math.atan((c - this.preDot.y) / (b - this.preDot.x))),
          k = this.lineWidth * Math.cos(Math.atan((c - this.preDot.y) / (b - this.preDot.x))),
          l = e * Math.sin(Math.atan((c - this.preDot.y) / (b - this.preDot.x))),
          m = e * Math.cos(Math.atan((c - this.preDot.y) / (b - this.preDot.x)));
        d = this.preDot.x + g;
        var f = this.preDot.y - k, g = this.preDot.x - g, k = this.preDot.y +
          k, n = b + l, p = c - m, l = b - l, m = c + m;
        this.writeCtx.beginPath();
        this.writeCtx.moveTo(d, f);
        this.writeCtx.lineTo(g, k);
        this.writeCtx.lineTo(l, m);
        this.writeCtx.lineTo(n, p);
        this.writeCtx.fill();
        this.writeCtx.closePath();
        this.writeCtx.setFillStyle(h);
        this.writeCtx.setLineWidth(e);
        this.lineWidth = e;
      }
      this.writeCtx.beginPath();
      this.writeCtx.setLineWidth(e);
      this.lineWidth = e;
      this.writeCtx.arc(b, c, this.lineWidth, 0, 2 * Math.PI);
      this.writeCtx.fill();
      this.writeCtx.closePath();
      this.writeCtx.draw(true)
    }
  }
});
