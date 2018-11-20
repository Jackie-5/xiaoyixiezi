Component({
  externalClasses: [],
  data: {
    current: '0'
  },

  options: {},

  properties: {},

  methods: {
    handleChange({ detail }) {
      this.setData({
        current: detail.key
      });
    }
  }
});
