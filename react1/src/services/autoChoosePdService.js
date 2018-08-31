import xhr from './xhr/'
import { rootPath, rootPathCore, rootPathBj } from './xhr/config';
import util from 'LIBS/util';

/**
 * 自动选品-相关请求api
 */
class autoChoosePdService {
	/*
		查询商品接口
		@method: 	POST
		functinID: 	mac.jd.com/autochooseProduct/page
		wiki: 		http://cf.jd.com/pages/viewpage.action?pageId=90620272
	 */
	getPageData(paramObj){
		return xhr({
			method: 'post',
			url: rootPathBj + '/autochooseProduct/page',
			localUrl: '/data/autoChooseData/page.json',
			body: paramObj
		})
	}
	/*
		获取店铺ID和店铺名称
		@method: 	POST
		functinID: 	mac.jd.com/autochooseProduct/page
		wiki: 		http://cf.jd.com/pages/viewpage.action?pageId=90620272
	 */
	getShopInfo(paramObj){
		return xhr({
			method: 'post',
			url: rootPathBj + '/autochooseProduct/queryShopNameAndId',
			localUrl: '/data/autoChooseData/shop.json',
			body: paramObj
		})
	}
}
// 实例化后导出，全局单例
export default new autoChoosePdService()