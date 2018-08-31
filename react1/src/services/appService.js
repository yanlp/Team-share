import xhr from './xhr/'
import { rootPath, rootPathCore, rootPathBj } from './xhr/config';
import util from 'LIBS/util';

/**
 * app首页-相关请求api
 */
class appService {
	/*
	  模糊查询品牌名称ID
      @method:     get
      functinID:   mac.jd.com/app/index/search/brand
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=81786644
    */
    searchBrand(name){
      return xhr({
          method:'get',
          url:rootPathBj+'/app/index/search/brand?name='+name
          // localUrl: '/data/appData/brand.json'
        })
    }
    /*
	  获取所有品类
      @method:     get
      functinID:   mac.jd.com/app/index/cat/infos
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=81786644
    */
    getAllCates(){
      return xhr({
          method:'get',
          url:rootPathBj+'/app/index/cat/infos'
          // localUrl: '/data/appData/cates.json'
        })
    }
}

// 实例化后导出，全局单例
export default new appService()