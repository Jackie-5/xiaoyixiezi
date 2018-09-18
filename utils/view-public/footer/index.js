Component({
    externalClasses: [],
    data: {
        current: 'homepage'
    },

    options: {
        
    },

    properties: {
        
    },

    methods: {
        handleChange({ detail }) {
            this.setData({
                current: detail.key
            });
        }
    }
});
