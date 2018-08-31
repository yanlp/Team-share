import xhr from './xhr/';
import { rootPath, rootPathCore, rootPathBj } from './xhr/config';
import util from 'LIBS/util';
/*
 *活动卡片相关请求api
*/
class ActiveCardService {
	/*
	提报秒杀 京东秒杀
	@method: get
	@functionID: mc.jd.com/activeEnroll/secondkill | mc.jd.com/activeManage/secondkill
	*/
	getSeckillListData(paramObj) {
		return xhr({
			method: 'get',
			url: rootPath + '/seckill?body=' + JSON.stringify(paramObj),
			localUrl: '/data/secondkill.json'
		});
	}

	/*
	活动报名-频道管理、活动管理-频道管理
	@method: get
	@functionID: mc.jd.com/activeEnroll/channelenroll | mc.jd.com/activeManage/channelmanage
	*/
	getRecommendActivityList() {
		return xhr({
			method: 'get',
			url: rootPath + '/recommendActivity',
			localUrl: '/data/recommendActivity.json'
		});
	}

	getAuthorityList() {
		return xhr({
			method: 'get',
			url: rootPathBj + '/cmscard/seckill/entrurl'
		});
	}
	/*
	活动报名-京东秒杀频道报名
	@method: get
	@functionID: hd.jd.com/json/channelItemList/isOperatorErpLogin.action
	*/
	checkIsOperatorErpLogin() {
		return xhr({
			method: 'get',
			url: rootPathCore + '/json/channelItemList/isOperatorErpLogin.action'
		});
	}
}

export default new ActiveCardService();