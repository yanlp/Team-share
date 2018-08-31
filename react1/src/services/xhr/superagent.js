import request from 'superagent'
import { rootPath, errHandler, env } from './config'


const xhr = ({ url, localUrl, mockUrl,  body = null, method = 'get' , errFun}) => {
  //环境切换
  if(env == 'local' && localUrl){//本地数据
    url = localUrl;
    method = 'get';
  } else if(env == 'mock' && mockUrl) { // mock 数据
    url = mockUrl;
  }
  
  // P.S: 此处引入了 ES6 的 Promise 实现
  return new Promise((resolve, reject) => {
    request[method.toLowerCase()](url)
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      // 跨域允许带上 cookie（http://visionmedia.github.io/superagent/#cors）
      .withCredentials()
      .send(body)
      .end((err, re) => {
        if (err)
          return errFun ? errFun(err) : errHandler(err)
          // return errHandler(err)

        if (!re.body)
          return resolve(null)

        if (re.body._code)
          return errFun ? errFun(err) : errHandler(re.body._msg)
          // return errHandler(re.body._msg)

        resolve(re.body)
      })
  })
}

export default xhr
