import xhr from './xhr/'
import { rootPath, rootPathCore ,rootPathBj} from './xhr/config';


/**
 * 区块所用到的 API
 */
class BlockService {
  

  /**
   *获取活动管理组管理员
   * 
   */
  getActivityManager(activityId){
    return xhr({
      method:'get',
      url: rootPathBj+'/activity/managerinfo/'+activityId,
      // mockUrl: rootPathBj+'/activity/managerinfo/'+activityId
      
    })
  }
  /**
   * 判断是不是区块管理员
   */
  checkUserIsAreaManger(id) {
    var defaultParam = {
      activityId:id
    }
    return xhr({
      method:'post',
      url: rootPathBj+'/area/ismanager',
      //localUrl: '/data/actMsg.json',
      body: defaultParam
    })
  }
  /**
   * 判断用户是不是活动管理组组员
   * 
   */
   checkUserIsManger(id) {
    var defaultParam = {
      activityId:id
    }
    return xhr({
      method:'post',
      url: rootPathBj+'/activity/ismanager',
      //localUrl: '/data/actMsg.json',
      body: defaultParam
    })
  }
   /**
   * 判断用户是不是活动管理组组长
   * 
   */
  checkUserIsHeadman (id) {
    var defaultParam = {
      activityId:id
    }
    return xhr({
      method:'post',
      url: rootPathBj+'/activity/isheadman',
      //localUrl: '/data/actMsg.json',
      body: defaultParam
    })
  }

  /**
   * 判断用户是不是商家运营
   * 
   */
  checkUserIsBus () {
    return xhr({
      method:'get',
      url: rootPathBj+'/activity/isvender',
      //localUrl: '/data/actMsg.json',
      //body: defaultParam
    })
  }

  /**
   * 根据ERP判断用户角色
   * @wiki:http://cf.jd.com/pages/viewpage.action?pageId=89600707
   * 
   */
   checkUserIsMinSale(){
    return xhr({
      method: 'get',
      url: rootPathBj + '/activity/userrole',
      localUrl: '/data/activeEnrollBlock/userrole.json',
    })
   }

	/**
   * 获取具体活动信息
   * 
   */
  getActiveData (id) {
    return xhr({
      method:'get',
      url: rootPathBj+'/activity/detail/'+id,
    })
  }

/**
   * 获取具体区块信息
   * 
   */
  getBlockData (activityId,areaId) {
    return xhr({
      method:'get',
      url: rootPathBj+'/area/detail/'+activityId+'/'+areaId,
      // localUrl: '/data/activeBlock.json',
     // body: defaultParam
    })
  }


  /**
   * 获取区块列表数据
   * @params:
   * onlineFlag 上下线状态
   * gatherType 收品模板(0-默认,1-商品,2-广告,3-促销)
   * putmark  BI标志
   * resourceAssignType 资源下发方式(1-分配报名,2-开放报名)
   * erpCheckNum  待审核管理审核数
   * operateCheckNum  待商家运营审核数
   * isShopApply 是否允许商家报名
   * isVcApply  是否允许供应商报名
   * isErpApply 是否允许erp报名(0-开放报名,1-分配报名)
   * areaOfActPO 所属活动信息(数组)
   */
  getManageBlockListData(obj) {
    return xhr({
      method:'post',
      url: rootPathBj+'/area/manage/page',
      //localUrl: '/data/activeBlockList.json',
      // mockUrl: '/mc/area/manage/page',
      body: obj
    })
  }

  /**
   * 获取活动管理组下视觉审核下区块列表数据
   * 
   */
  getViewBlockListData(obj) {
    return xhr({
      method:'post',
      url: rootPathBj+'/viewCheck/area/page',
      //localUrl: '/data/activeBlockList.json',
      // mockUrl:rootPathBj+'/mc/viewCheck/area/page',
      body: obj
    })
  }
  
  /**
   * 获取区块列表数据
   * 
   */
  getBlockListData(obj) {
    return xhr({
      method:'post',
      url: rootPathBj+'/area/page',
      //localUrl: '/data/activeBlockList.json',
      body: obj
    })
  }

  /**
   * 获取区块模板数据和对应表单模板数据
   * 
   */
  getBlockTemplateListData () {
    return xhr({
      method:'post',
      url: rootPathBj+'/formset/template/list',
      localUrl: '/data/blockTemplateList.json',
     // body: defaultParam
    })
  }

  /**
   * 根据模板id获取动态表单数据
   *
   */
  getDynamicFormData(id,styleId) {
    return xhr({
      method:'get',
      url: rootPathBj+'/formset/template/detail/'+id+'?styleId='+styleId,
      // localUrl: '/data/dynamicFormList.json',
      // mockUrl: '/mc/formset/template/detail/'+id+'?styleId='+styleId,
      //body: defaultParam
    })
  }
  /**
   * 根据区块id获取动态表单数据
   * 或查询区块的报名表单项（活动报名用）
   *
   * @method:     post
   * functinID:   mac.jd.com/formitem/area/detail
   * wiki:        http://cf.jd.com/pages/viewpage.action?pageId=80246658
   */
  updateDynamicFormData(id,optType) {
    var defaultParam = {
      areaId:id,
      optType:optType  //1.区块设置 2.活动报名
    }
    return xhr({
      method:'post',
      url: rootPathBj+'/formset/area/detail',
      // localUrl: '/data/dynamicFormList.json',
      // mockUrl: '/mc/formset/area/detail',
      body: defaultParam
    })
  }

  /**
   * 获取通天塔广告数据
   * 
   */
  getBabelPromoData() {
    return xhr({
      method:'get',
      url: rootPathBj+'/common/style/info',
      //localUrl: '/data/babelList.json',
      //body: defaultParam
    })
  }
  /**
   * 获取通天塔广告数据
   * 
   */
  getPromoData(type) {
    var defaultParam = {
      styleType:type
    };
    return xhr({
      method:'post',
      url: rootPathBj+'/common/style/info',
      //localUrl: '/data/babelList.json',
      // mockUrl: '/mc/common/style/info',
      body: defaultParam
    })
  }
  /**
   * 创建区块
   * 
   */
  createBlock(data){
    var defaultParam = {
      areaData:data
    }
    return xhr({
      method:'post',
      url: rootPathBj+'/area/create',
      // localUrl: '/data/babelList.json',
      body: defaultParam
    })
  }

  /**
   * 更新区块
   * 
   */
  updateBlock(data){
    var defaultParam = {
      areaData:data
    }
    return xhr({
      method:'post',
      url: rootPathBj+'/area/update',
      // localUrl: '/data/babelList.json',
      body: defaultParam
    })
  }
  /*
    区块删除
  */
  deleteBlock(acId,areaId){
    return xhr({
      method:'post',
      url: rootPathBj+`/area/${acId}/${areaId}/delete`,
      // localUrl: '/data/babelList.json',
      // body: defaultParam
    })
  }
  /*
   * 区块赋值
   * @param1: acId 活动id
   * @param2: areaId 区块id
  */ 
  copyBlock(acId, areaId, paramObj) {
    return xhr({
      method:'post',
      url: rootPathBj+`/area/${acId}/${areaId}/copy`,
      body: paramObj
    })
  }
  /*
   * 根据模板类型以及当前登录人：查询相应的模板列表清单
   * @param: source 模板类型   1、系统公用模板  2、系统定制模板
  */
  getBlockTemplateSourceListData(source) {
    return xhr({
      method: 'get',
      url: rootPathBj+`/formset/templatesource/list?source=`+ source,
      // localUrl: '/data/blockTemplateList.json'
    })
  }
  /*
   * 根据模板id查询用户报名范围
   * @param: formTemplatedId 模板id
  */
  getApplyUserRange(id) {
    return xhr({
      method: 'get',
      url: rootPathBj+`/area/queryApplyUserRange.do?formTemplateId=`+id ,
      // mockUrl:'mc/area/queryApplyUserRange.do?formTemplateId='+id
    })
  }
   /*
   * 批量获取区块的资源比率信息
   * @param: areaIds :区块id之间逗号隔开
             activityId:活动id
   * @method:     post
   * functinID:   mac.jd.com/area/batquery/resource/ratio
   * wiki:        http://cf.jd.com/pages/viewpage.action?pageId=96692503
  */
  getBlockNumListData(param) {
    return xhr({
      method:'post',
      url: rootPathBj+'/area/batquery/resource/ratio',
      body: param
    })
  }
  /*
   * 根据样式id获取自定义商品组表单
   * @param: id - 样式id
   * functionID: mac.jd.com/formset/area/style/checkAndGetForm
   * wiki: http://cf.jd.com/pages/viewpage.action?pageId=99509786
  */
  getCommodityGroupForm(param) {
    return xhr({
      method: 'post',
      url: rootPathBj + `/formset/area/style/checkAndGetForm`,
      body: param
    })
  }
  /*
   * 修改区块序号
   * functionID: mac.jd.com/area/updateSeq
   * wiki: http://cf.jd.com/pages/viewpage.action?pageId=99895999
  */
  updateBlockSeq(param) {
    return xhr({
      method: 'post',
      url: rootPathBj + `/area/updateSeq`,
      localUrl: '/data/activeManageBlock/updateSeq.json',
      body: param
    })
  }
  /*  
  区块查询接口
  */
  blockQuery(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/area/export/page',
      mockUrl: '/mc/area/export/page',
      body: paramObj
    });
  }
  /*  
  总价促销实时校验接口
  */
  getTotalPromoCheck(obj) {
    return xhr({
      method:'post',
      url: rootPathBj + '/common/promo/totalprice',
      //localUrl: '/data/activeBlockList.json',
      // mockUrl: '/mc/common/promo/totalprice',
      body: obj
    })
  }

  /*外部系统引导*/
  /*
      功能： 填充创建区块信息：根据素材组id查询素材相关信息，并补充提报侧区块新建的信息
      @method: post
      @functionID: http://cf.jd.com/pages/viewpage.action?pageId=104129052
  */
  queryOutSystemAreaInfo(params){
    return xhr({
      method: 'post',
      url: `${rootPathBj}/area/queryOutSystemAreaInfo`,
      localUrl: '/data/activeManageBlock/blockData.json',
      body: params
    })
  }
  /*
      功能： 查询“去收品链接”：根据素材组id查询活动id和区块id
      @method: post
      @functionID: http://mac.jd.com/area/queryOutSystemInfo
  */
  queryOutSystemInfo(params){
    return xhr({
      method: 'post',
      url: `${rootPathBj}/area/queryOutSystemInfo`,
      body: params
    })
  }

}

// 实例化后导出，全局单例
export default new BlockService()