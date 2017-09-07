import Vue from 'vue';
import App from './index.vue';

let newApp = new Vue({
  el: 'app',
  render:(h)=>h(App)
})
// console.log(App.beforeMount(),"jfdk")
