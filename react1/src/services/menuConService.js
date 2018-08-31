import xhr from './xhr/'
import { rootPath, rootPathCore } from './xhr/config'

/**
 * 菜单内容请求API
 */
class MenuConService {
  /*
  * 
  * @resolve {Object} userData / null
  */
  loadMenuConData (functionId,param,errFun) {
    var p = param? param :"";
    return xhr({
      url: rootPath + '/'+functionId+p,
      // localUrl: '/data/subMenuList.json',
      errFun: errFun
    })
  }
  /**
   * 获取页头数据
   * @resolve {Object} / null
   */
  getHeaderBarData (errFun) {
    return xhr({
      // method: 'post',
      // localUrl: '/data/menu.json',
      url: rootPath + '/menu',
      errFun: errFun
    })
  }
  /*
  * 
  * @获取帮助中心左侧菜单栏数据
    http://cf.jd.com/pages/viewpage.action?pageId=91298815
  */
  getHelpMenuData (functionId,errFun) {
    return xhr({
      url: rootPath + '/'+functionId,
      // localUrl: '/data/subMenuList.json',
      errFun: errFun
    })
  }

}

// 实例化后导出，全局单例
export default new MenuConService()
