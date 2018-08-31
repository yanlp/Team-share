import Vue from 'vue';
import iView from 'iview';
import App from './index/index.vue'

Vue.use(iView);

new Vue({
  el: 'app',
  render: h => h(App)
})

// // 还需要在主要的js文件里写入下面这段代码
// if (module.hot) {
//   // 实现热更新
//   module.hot.accept('./index/index.vue', function(){
//     const newApp = require('./index/index');
//     new Vue({
//       el: 'app',
//       render: h=> h(newApp)
//     })
//   });
// } 