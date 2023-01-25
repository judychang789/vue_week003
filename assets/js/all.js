"use strict";

console.log('Hello!');
$(document).ready(function () {
  console.log('HesSchool Hello!');
});
"use strict";

var _vueEsmBrowser = require("https://unpkg.com/vue@3/dist/vue.esm-browser.js");

//const { createApp } = Vue;
(0, _vueEsmBrowser.createApp)({
  data: function data() {
    return {
      apiUrlink: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'apijy_vue',
      products: [],
      //tempProduct: {},
      temp: {}
    };
  },
  methods: {
    checkAdmin: function checkAdmin() {
      var _this = this;

      var url = "".concat(this.apiUrlink, "/api/user/check");
      axios.post(url).then(function () {
        _this.getData();
      })["catch"](function (err) {
        alert(err.res.data.message);
        window.location = 'login.html';
      });
    },
    getData: function getData() {
      var _this2 = this;

      var url = "".concat(this.apiUrlink, "/api/").concat(this.apiPath, "/admin/products");
      axios.get(url).then(function (res) {
        _this2.products = res.data.products;
      })["catch"](function (err) {
        alert(err.res.data.message);
      });
    },
    openProduct: function openProduct(item) {
      //this.tempProduct = item;
      this.temp = item;
    }
  },
  mounted: function mounted() {
    // 取出 Token
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)judyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  }
}).mount('#cart');
"use strict";

var _vueEsmBrowser = require("https://unpkg.com/vue@3/dist/vue.esm-browser.js");

(0, _vueEsmBrowser.createApp)({
  data: function data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // login() {
    //   alert(`你所輸入的帳號是: ${this.username} \n而你所輸入的密碼是${this.password}`);
    // },
    login: function login() {
      var api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(api, this.user).then(function (res) {
        var _res$data = res.data,
            token = _res$data.token,
            expired = _res$data.expired;
        document.cookie = "judyToken=".concat(token, ";expires=").concat(new Date(expired), "; path=/"); //window.location = 'cart.html';

        window.location = 'products.html';
      })["catch"](function (err) {
        alert(err.response.data.message);
      });
    }
  }
}).mount("#app"); // createApp({
//   data() {
//     return {
//       user: {
//         username: '',
//         password: '',
//       },
//     }
//   },
//   methods: {
//     // login() {
//     //   alert(`你所輸入的帳號是: ${this.username} \n而你所輸入的密碼是${this.password}`);
//     // },
//     login() {
//       const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
//       axios.post(api, this.user).then((response) => {
//         const { token, expired } = response.data;
//         // 寫入 cookie token
//         // expires 設置有效時間
//         document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
//         window.location = 'cart.html';
//       }).catch((err) => {
//         alert(err.response.data.message);
//       });
//     },
//   },
// }).mount('#app');
"use strict";

var _vueEsmBrowser = require("https://unpkg.com/vue@3/dist/vue.esm-browser.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const site = 'https://vue3-course-api.hexschool.io/v2/';
// const apiPath  = 'apijy_vue';
var productModal = {};
var delete_product = {};
var app = (0, _vueEsmBrowser.createApp)({
  data: function data() {
    return {
      apiUrlink: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'apijy_vue',
      products: [],
      tempProducts: {
        imagesUrl: []
      },
      isNew: false //確認是編輯或新增

    };
  },
  methods: {
    checkAdmin: function checkAdmin() {
      var _this = this;

      var url = "".concat(this.apiUrlink, "/api/user/check");
      axios.post(url).then(function (response) {
        _this.getProductsData(); //this.getData()

      })["catch"](function (err) {
        alert(err.response.data.message);
        window.location = 'login.html';
      });
    },
    getProductsData: function getProductsData() {
      var _this2 = this;

      //getData()
      var url = "".concat(this.apiUrlink, "/api/").concat(this.apiPath, "/admin/products/all");
      axios.get(url).then(function (response) {
        _this2.products = response.data.products; //console.log(response);
        //console.log(this.products);
      })["catch"](function (err) {
        alert(err.response.data.message);
      });
    },
    openModal: function openModal(status, item) {
      //status是可自訂的
      //productModal.show();  //會打開
      console.log(status); //按新增跑出create  按編輯跑出edit 

      if (status === "create") {
        productModal.show();
        this.isNew = true; //帶入初始化資料

        this.tempProducts = {
          imagesUrl: []
        };
      } else if (status === "edit") {
        productModal.show();
        this.isNew = false; //會帶入當前要編輯的資料

        this.tempProducts = _objectSpread({}, item);
      } else if (status === "delete") {
        delete_product.show();
        this.tempProducts = _objectSpread({}, item); //待會取id使用
      }
    },
    updateProduct: function updateProduct() {
      var _this3 = this;

      //更新產品
      //console.log("updateProduct");
      //console.log(`${this.apiUrlink}/api/${this.apiPath}/admin/product`);
      var url = "".concat(this.apiUrlink, "/api/").concat(this.apiPath, "/admin/product");
      var method = "post"; //用this.isNew判斷api怎麼運行

      if (!this.isNew) {
        url = "".concat(this.apiUrlink, "/api/").concat(this.apiPath, "/admin/product/").concat(this.tempProducts.id);
        method = "put";
      } // axios.post(url , { data: this.tempProducts })


      axios[method](url, {
        data: this.tempProducts
      }) //用method這個變數帶
      .then(function (response) {
        console.log(response);
        productModal.hide(); //會關閉

        _this3.getProductsData(); //更新完產品需重新取得

      }); // .catch((err)=>{
      //     console.log(err);
      // })
    },
    deleteProduct: function deleteProduct() {
      var _this4 = this;

      var url = "".concat(this.apiUrlink, "/api/").concat(this.apiPath, "/admin/product/").concat(this.tempProducts.id);
      axios["delete"](url) //用method這個變數帶
      .then(function (response) {
        // console.log(response);
        _this4.getProductsData(); //更新完產品需重新取得


        delete_product.hide(); //會關閉
      });
    }
  },
  mounted: function mounted() {
    //console.log(`${sitelink}api/${apiPath}/admin/products`)
    // const cookieValue = document.cookie
    // .split('; ')
    // .find((row) => row.startsWith("judyToken="))
    // ?.split('=')[1];
    // 取出 Token
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)judyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token; // this.checkAdmin()     

    this.getProductsData(); //bootstrap
    //console.log(bootstrap);

    productModal = new bootstrap.Modal("#productModal"); //新增/編輯的視窗

    delete_product = new bootstrap.Modal("#delProductModal"); //刪除的視窗
    //productModal.show();  //會打開
  }
}).mount('#products');
//# sourceMappingURL=all.js.map
