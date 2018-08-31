import xhr from './xhr/'
import { rootPath, rootPathCore, rootPathBj } from './xhr/config'
import util from 'LIBS/util'
//ajax
import request from 'superagent'

/**
 * 首页所用到的 API
 */
class IndexService {

  /**
   * 获取首页数据
   * @resolve {Object} / null
   */
  getIndexData (errFun) {
    return xhr({
      url: rootPath + '/workflowHome',
      // localUrl: '/data/index.json',
      errFun: errFun
    })
  }
}

// 实例化后导出，全局单例
export default new IndexService()