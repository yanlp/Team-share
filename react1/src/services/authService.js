import xhr from './xhr/'
import { rootPath, rootPathCore } from './xhr/config'

/**
 * 用户认证所用到的 API
 */
class AuthService {

  /**
   * 检测当前用户是否已经登录
   * @resolve {Object} userData / null
   */
  checkLogin (errFun) {
    return xhr({
      url: rootPath + '/mgets?skuIds=J_954086&type=1',
      // url: '/auth/checkLogin',
      localUrl: '/data/a.json',
      errFun: errFun
    })
  }

  /**
   * 登录
   * @param  {String} userData.username
   * @return {Object} userData
   */
  login (userData) {
    return xhr({
      // method: 'post',
      url: rootPathCore + '/4/version/android/2.3.0',
      // body: userData
    })
  }

  /**
   * 注销登录
   * @return {Promise}
   */
  logout () {
    return xhr({
      url: rootPath + '/logout',
      localUrl: '/data/index.json'
    })
  }

}

// 实例化后导出，全局单例
export default new AuthService()
