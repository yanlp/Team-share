/*
	资质相关接口调用
*/
import xhr from './xhr/'
import { rootPath, rootPathCore ,rootPathBj} from './xhr/config';


/**
 * 资质所用到的 API
 */
class CredentialsService {

  /*
      保存资质设置信息
      @method:     POST
      functionID： mac.jd.com/qualification/create
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=87950256
    */
  createCredentData(paramObj) {
    var defaultParam = {
      qualificationData:paramObj
    }
    return xhr({
      method:'post',
      url: rootPathBj+'/qualification/create',
      // localUrl: '/data/credentData.json',
      // mockUrl: '/mc/qualification/create',
      body: defaultParam
    })
  }

   /*
      通过区块id获取资质设置信息
      @method:     POST
      functionID： mac.jd.com/qualification/detail
      wiki:       http://cf.jd.com/pages/viewpage.action?pageId=87950276
    */
  getCredentData(id) {
    var defaultParam = {
      areaId:id
    }
    return xhr({
      method:'post',
      url: rootPathBj+'/qualification/detail',
      // localUrl: '/data/credentData.json',
      localUrl:'/data/blockCredentials/detail.json',
      mockUrl: '/mc/qualification/detail',
      body: defaultParam
    })
  }
  /*
		商品白名单分页获取商品白名单列表
		functionId:mac.jd.com/whitelist/product/page
		cf Address:http://cf.jd.com/pages/editpage.action?pageId=87955955 
	*/
	getWhiteListPage(param){
		return xhr({	
			method:"post",
			url:rootPathBj +'/whitelist/product/page',
			// localUrl:"/data/blockCredentials/white/page.json",
			body:param
		})
	}
	/*
		创建白名单
		functionId:mac.jd.com/whitelist/product/create
		cf Address:http://cf.jd.com/pages/editpage.action?pageId=87955959
	*/
	createWhiteList(param){
		return xhr({
			method:"post",
			url:rootPathBj+'/whitelist/product/create',
			// localUrl:"/data/blockCredentials/white/create.json",
			body:param
		})
	}
	/*
		删除白名单（单）
		functionId:mac.jd.com/whitelist/product/single/delete
		cf Address:http://cf.jd.com/pages/editpage.action?pageId=87955963
	*/
	deleteSingleWhiteList(param){
		return xhr({
			method:'post',
			url:rootPathBj+'/whitelist/product/single/delete',
			// localUrl:"/data/blockCredentials/white/delete.json",
			body:param
		})
	}
  /*
    删除白名单（批量）
    functionId:mac.jd.com/whitelist/product/delete
    cf Address:http://cf.jd.com/pages/editpage.action?pageId=87955963
  */
  deleteWhiteList(param){
    return xhr({
      method:'post',
      url:rootPathBj+'/whitelist/product/delete',
      // localUrl:"/data/blockCredentials/white/delete.json",
      body:param
    })
  }
  
   /*
      创建空白资质项设置信息
      @method:     POST
      functionID： mac.jd.com/qualification/speccategory/create
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=87950261
    */
  createBlankCredentData(paramObj) {
    return xhr({
      method:'post',
      url: rootPathBj+'/qualification/speccategory/create',
      // localUrl: '/data/tdCredentData.json',
      body: paramObj
    })
  }

  /*
      删除空白资质项的相关设置
      @method:     POST
      functionID： mac.jd.com/qualification/blank/delete
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=87950265
    */
  delCredentData(paramObj) {
    return xhr({
      method:'post',
      url: rootPathBj+'/qualification/blank/delete',
      body: paramObj
    })
  }

  /*
      获取商品类目树
      @method:     get
      functionID： mac.jd.com/common/skutree/{cid}
      wiki:       http://cf.jd.com/pages/viewpage.action?pageId=87955764
    */
  getPdTreeData(id) {
    return xhr({
      method:'get',
      url: rootPathBj+'/common/skutree/'+id
    })
  }

  /**
   * @description 根据促销令牌ID查询令牌信息
   * @param {Object} param
   * @method POST
   * @wiki http://cf.jd.com/pages/viewpage.action?pageId=102824689
   */
  getPromoTokenInfo(paramObj) {
    console.log(rootPathBj);
    return xhr({
      method: 'post',
      url: `${rootPathBj}/common/promoToken/info`,
      // url: 'http://192.168.108.227:7001/mock/59c3723651c38d5f10dd724a/mc/common/promoToken/info',
      body: paramObj,
    })
  }

  /**
   * @description 获取可复用资质模板列表
   * @param {Object} param
   * @method POST
   * @wiki 'http://cf.jd.com/pages/viewpage.action?pageId=104128645'
   */
  getReuseCredentList(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj +'/qualificationTemplateUserRelation/page',
      body: paramObj,
    })
  }

  /**
   * @description 复用资质模板
   * @param {Object} param
   * @method POST
   * @wiki 'http://cf.jd.com/pages/viewpage.action?pageId=104125473'
   */
  setReuseCredent(id) {
    return xhr({
      method: 'get',
      url: rootPathBj + '/qualificationTemplateUserRelation/'+id,
    })
  }

  /**
   * @description 从资质设置页保存为资质模板
   * @param {Object} param
   * @method POST
   * @wiki 
   */
  saveReuseCredent(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/qualificationTemplateUserRelation/saveAs',
      body: paramObj,
    })
  }
}

// 实例化后导出，全局单例
export default new CredentialsService()
