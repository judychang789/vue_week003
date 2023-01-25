import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// const site = 'https://vue3-course-api.hexschool.io/v2/';
// const apiPath  = 'apijy_vue';


let productModal = {};
let delete_product = {};



const app = createApp({
    data(){
        return{
            apiUrlink: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'apijy_vue',
            products:[] ,
            tempProducts:{
                imagesUrl:[] ,
            },
            isNew:false,  //確認是編輯或新增
        }
    },
     methods: {
        checkAdmin() {
            const url = `${this.apiUrlink}/api/user/check`;
            axios.post(url)
              .then((response) => {
                this.getProductsData();  //this.getData()
              })
              .catch((err) => {
                alert(err.response.data.message)
                window.location = 'login.html';
              })
        },
        getProductsData() {  //getData()
            const url = `${this.apiUrlink}/api/${this.apiPath}/admin/products/all`;
            axios.get(url).then((response) => {
              this.products = response.data.products;
              //console.log(response);
              //console.log(this.products);
            }).catch((err) => {
              alert(err.response.data.message);
            })
        },
        openModal(status ,item){  //status是可自訂的
            //productModal.show();  //會打開
            console.log(status);  //按新增跑出create  按編輯跑出edit 
            if(status === "create"){
                productModal.show();
                this.isNew = true;
                //帶入初始化資料
                this.tempProducts={
                    imagesUrl:[] ,
                };
            }else if(status === "edit"){
                productModal.show();
                this.isNew = false;
                //會帶入當前要編輯的資料
                this.tempProducts={...item};
            }else if(status === "delete"){
                delete_product.show();
                this.tempProducts={...item};  //待會取id使用
            }
        },       
        updateProduct() {  //更新產品
            //console.log("updateProduct");
            //console.log(`${this.apiUrlink}/api/${this.apiPath}/admin/product`);
            let url = `${this.apiUrlink}/api/${this.apiPath}/admin/product`;
            let method = "post"

            //用this.isNew判斷api怎麼運行
            if(!this.isNew){
                url = `${this.apiUrlink}/api/${this.apiPath}/admin/product/${this.tempProducts.id}`;
                method = "put"
            }

            // axios.post(url , { data: this.tempProducts })
            axios[method](url , { data: this.tempProducts })  //用method這個變數帶
            .then(response=>{
                console.log(response);
                productModal.hide();  //會關閉
                this.getProductsData();  //更新完產品需重新取得
            })
            // .catch((err)=>{
            //     console.log(err);
            // })
        },
        deleteProduct() {
            const url = `${this.apiUrlink}/api/${this.apiPath}/admin/product/${this.tempProducts.id}`;
            axios.delete(url)  //用method這個變數帶
            .then(response=>{
                // console.log(response);
                this.getProductsData();  //更新完產品需重新取得
                delete_product.hide();  //會關閉
            })
        }
    }, 
    mounted() {
        //console.log(`${sitelink}api/${apiPath}/admin/products`)

        // const cookieValue = document.cookie
        // .split('; ')
        // .find((row) => row.startsWith("judyToken="))
        // ?.split('=')[1];

        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)judyToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

       // this.checkAdmin()     
       this.getProductsData();

        //bootstrap
        //console.log(bootstrap);
        productModal = new bootstrap.Modal("#productModal");       //新增/編輯的視窗
        delete_product = new bootstrap.Modal("#delProductModal");   //刪除的視窗
        //productModal.show();  //會打開
    }
}).mount('#products');