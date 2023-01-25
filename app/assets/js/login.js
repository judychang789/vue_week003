
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data(){
    return{
      user:{
        username: "",
        password: "",
      }
    }
  },
  methods:{
    // login() {
    //   alert(`你所輸入的帳號是: ${this.username} \n而你所輸入的密碼是${this.password}`);
    // },
    login(){
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(api, this.user).then((res)=>{
        const { token , expired } = res.data;
        document.cookie = `judyToken=${token};expires=${new Date(expired)}; path=/`;
        //window.location = 'cart.html';
        window.location = 'products.html';
      })
      .catch((err)=>{
        alert(err.response.data.message);
      })
    }
  }
}).mount("#app");




// createApp({
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

