/*  
    Date: 2017-11-09
    Resource github: https://github.com/alsotang/node-lessons/tree/master/lesson0
    author: yanliping
    nvm install path: curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.2/install.sh | bash
*/

/* start  express 的应用*/


let a = require('./a.js');
console.log(a);
// a.on('ready', ()=>{
// 	console.log('gjkl');
// })

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 500)


// Promise.resolve(1)
//   .then((res) => {
//     console.log(res)
//     return 2
//   })
//   .catch((err) => {
//     return 3
//   })
//   .then((res) => {
//     console.log(res)
//     return 4
//   })
//   .then((res) => {
//   	console.log(res)
//   })


Promise.resolve()
.then(() => {
  // return Promise.reject(new Error('error!!!'));
  throw Error('error!!!!');
})
.then((res) => {
  console.log('then: ', res)
})
.catch((err) => {
  console.log('catch: ', err)
})