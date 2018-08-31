import xhr from './xhr/'
import { rootPath, rootPathCore,rootPathBj } from './xhr/config';
import util from 'LIBS/util';

/**
 *  活动管理数据列表请求t
 */
class ActiveListService {
  /*
    列表详情页 复制活动
    @method：post
    @function:mac.jd.com/activity/copy
  */
  copyActivity(paramObj){
    var defaultParam = {}
  	defaultParam = util.concatObject(defaultParam,paramObj);
    return xhr({
      method:'post',
      url: rootPathBj+'/activity/copy',
      body: paramObj
    })
  }
  /*
    列表详情页 报名
    @method：post
    @function:mac.jd.com/activity/page
  */
  getListData (paramObj) {
  	var defaultParam = {}
  	defaultParam = util.concatObject(defaultParam,paramObj);
    return xhr({
      method:'post',
      url: rootPathBj+'/activity/page',
      // localUrl: '/data/activeManageData/activeList.json',
      body: paramObj
    })
  }
  /*
    列表详情页 活动管理
    @method：post
    @function:mac.jd.com/activity/manage/page
  */
  getActiveListData (paramObj) {
    var defaultParam = {}
    defaultParam = util.concatObject(defaultParam,paramObj);
    return xhr({
      method:'post',
      url: rootPathBj+'/activity/manage/page',
      // localUrl: '/data/activeManageData/activeList.json',
      // mockUrl: rootPathBj+'/mc/activity/manage/page',
      body: paramObj
    })
  }
  /*
      desc:请求活动详情
      @method: get
      @function: mac.jd.com/activity/detail/{id}
  */
  getActiveInfo(paramObj){
      return xhr({
        method:'get',
        url:rootPathBj+'/activity/detail/'+paramObj,
        // localUrl:'/data/actMsg.json'
        // mockUrl:'mc/activity/detail/'+paramObj
      })
  }
  /*
      desc:请求活动详情
      @method: get
      @function: mac.jd.com/activity/detail/{id}
  */
  getActiveValid(paramObj){
      return xhr({
        method:'get',
        url:rootPathBj+'/activity/valid/'+paramObj,
        // localUrl:'/data/actMsg.json'
      })
  }
  /*
    活动创建
    @method：post
    @function: mac.jd.com/activity/create
  */
  getCreateData(paramObj){
    return xhr({
      method:'post',
      url: rootPathBj +'/activity/create',
      // localUrl: '/data/activeManageData/createData.json',
      body: paramObj
    })
  }
   /*
    活动设置
    @method：post
    @function: mac.jd.com/activity/update
  */
  getUpdateData(paramObj){
    return xhr({
      method:'post',
      url: rootPathBj+'/activity/update/',
      // localUrl: '/data/activeManageData/createData.json',
      body: paramObj
    })
  }
  /*
    已报名管理列表页
    @method：post
    @function: mac.jd.com/apply/page
  */
  getEnrolledList(paramObj,errFun){
    var defaultParam = {}
    defaultParam = util.concatObject(defaultParam,paramObj);
    return xhr({
      method:'post',
      url: rootPathBj+'/apply/page',
      localUrl: '/data/enrollData/enrollList.json',
       body: defaultParam
    })
  }
  /*
    退出活动报名
    @method：post
    @function: mac.jd.com/apply/quit/
  */
  getQuitActive(param){
    return xhr({
        method:'post',
        url:rootPathBj+'/apply/quit/',
        // localUrl:'/data/enrollData/quit.json',
        body:{
          applyId:param
        }
      })
  }


  /*
    查询当前用户是否在某个活动管理组中
    @method: post
    @function: mac.jd.com/activity/ismanager
    @arguments {id: *} 后台获取当前登录用户pin账号
    @return data {ismanager: } 0|1
  */
  checkCurUserAuthority(paramObj){ 
      return xhr({
        method:'post',
        // url:rootPathBj+'/activity/isManager/'+paramObj,
        url:rootPathBj+'/activity/isManager/',
        // localUrl:'/data/activeManageData/checkStatus.json',
        body:paramObj
      })
  }
  /*
  * 是否是活动管理组组长
  * @method:     post
  * functinID:   mac.jd.com/activity/isHeadman
  * wiki:        http://cf.jd.com/pages/viewpage.action?pageId=81139371
  */ 
  checkIsHeadman(paramObj){
    return xhr({
      method:'post',
      url:rootPathBj +'/activity/isheadman',
      // localUrl:'/data/activeManageData/checkIsHeadman.json',
      body:paramObj
    })
  }
  /*
  * 修改活动管理组组长及成员
  * @method:     post
  * functinID:   mac.jd.com/activity/update/manager
  * wiki:        http://cf.jd.com/pages/viewpage.action?pageId=81139409
  */ 
  updateManager(paramObj){
    return xhr({
      method:'post',
      url:rootPathBj +'/activity/update/manager',
      // localUrl:'/data/activeManageData/checkIsHeadman.json',
      body:paramObj
    })
  }
  /*
  * 修改活动管理组组长及成员
  * @method:     post
  * functinID:   mac.jd.com/viewCheck/activity/page 

  * wiki:        http://cf.jd.com/pages/viewpage.action?pageId=81139409 

  */ 
  viewCheckPage(paramObj){
    return xhr({
      method:'post',
      url:rootPathBj +'/viewCheck/activity/page',
      // localUrl:'/data/activeManageData/checkIsHeadman.json',
      body:paramObj
    })
  }
  /*
    上海侧接口：
    获取提报活动创建环境选择接口
    @functionId:
    @method: get
  */
  checkCreateActivityEnv(errFun){
    return xhr({
      method: 'get',
      url: rootPath + '/activity',
      // localUrl: '/data/activityMenu.json',
      errFun: errFun
    })
  }
  /*
    新增对活动的关注接口
    @functionId: mac.jd.com/activity/watch/create
    @method: post
    wiki: http://cf.jd.com/pages/viewpage.action?pageId=105285884
  */
  activityWatchCreate(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/activity/watch/create',
      body: paramObj
    });
  }
  /*
    取消对活动的关注接口
    @functionId: mac.jd.com/activity/watch/cancel
    @method: post
    wiki: http://cf.jd.com/pages/viewpage.action?pageId=105286057
  */
  activityWatchCancel(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/activity/watch/cancel',
      body: paramObj
    });
  }
}

// 实例化后导出，全局单例
export default new ActiveListService()
