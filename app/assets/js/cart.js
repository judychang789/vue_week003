import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
//const { createApp } = Vue;
createApp({
  data() {
    return {
      apiUrlink: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'apijy_vue',
      products: [],
      //tempProduct: {},
      temp: {},
    }
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrlink}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.res.data.message)
          window.location = 'login.html';
        })
    },
    getData() {
      const url = `${this.apiUrlink}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.res.data.message);
        })
    },
    openProduct(item) {
      //this.tempProduct = item;
      this.temp = item;
    }
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)judyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin()
  }
}).mount('#cart');