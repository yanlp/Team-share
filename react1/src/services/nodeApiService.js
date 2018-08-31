import xhr from './xhr/'
import { rootPath, rootPathBj, rootNode, env} from './xhr/config';



class nodeApiService {
	/*
	 * 接口域名配置
	 */
	getRootPath(ishttps){
		// let localPath = ishttps ? 'http://workflow.m.jd.local':'http://beta-workflow.m.jd.com';
		let localPath = '//platgw-beta.jd.com/workflow';
		if(env == 'prod'){//生产环境
			return {
				rootPath: 'http://workflow.m.jd.local',
				rootPathBj : 'http://mac.jd.local'
			}
		}else{
			return {//预发环境
				rootPath: localPath,
				rootPathBj : 'http://mac.jd.com'
			}
		}
	}
	/*
	 * 接口合并
	 */
	comboRequest(paramObj){
		return xhr({
            method: 'post',
            url: rootNode + '/comboRequest',
            body: paramObj
        })
	}
	/*
	 * 数据统计
	 */
	nodeWatcher(paramObj){
		let rootNodeWatcher = rootNode.replace('/nodeApi', '');
		return xhr({
            method: 'post',
            url: rootNodeWatcher + '/nodeWatcher/receiveMsg',
            body: paramObj
        })
	}
	// 活动报名-区块列表 node接口整合
	nodeBlockNodeApi(paramObj){
		return xhr({
            method: 'post',
            url: rootNode + '/area/batquery/resource/ratio',
			body: paramObj,
			// mockUrl: '/na/area/batquery/resource/ratio'
        })
	}

	// 活动报名-数据详情接口 node接口整合
	nodeApplyDetail() {
		return xhr({
				method: 'get',
				url: rootNode + '/nodeApi/apply/detail/',
		});
	}
}

// 实例化后导出，全局单例
export default new nodeApiService()