import xhr from './xhr/'
import { rootPath, rootPathCore, rootPathBj } from './xhr/config';
import util from 'LIBS/util';
/**
 * 资源分配相关请求api
 */
class assignService {
    /*
      根据条件分页获取资源列表
    */
    getAssignListData(id,page,pageSize, showInvite){
      var defaultParam = {
        resourceId:id,
        resourceType:3,
        page:page,
        pageSize: pageSize || 20
      }
      if (showInvite != undefined) {
        defaultParam = Object.assign(defaultParam, {
          showInviteVendor : showInvite,
        })
      }
      return xhr({
          method: 'post',
          url: rootPathBj + '/resource/list',
          //localUrl: '/data/assignListData.json',
          mockUrl: '/mc/resource/list',
          body: defaultParam
      })
    }

    /*
      根据批次id异步获取资源数
    */
    getAssignNumData(id,type){
      var defaultParam = {
        resourceId:id,
        resourceType:type
      }
      return xhr({
          method: 'post',
          url: rootPathBj + '/resource/erpown/count',
          //localUrl: '/data/assignNum.json',
          body: defaultParam
      })
    }

    //获取区块备注 （资源分配页面）
    getBlockRemarkData(batchIds){
      var defaultParam = {
        batchIds:batchIds
      }
      return xhr({
          method: 'post',
          url: rootPathBj + '/resource/queryAreaBatchDesc',
          //localUrl: '/data/assignNum.json',
          body: defaultParam
      })
    }
    // 创建更新区块备注
    updateBlockRemarkData(obj){
      return xhr({
          method: 'post',
          url: rootPathBj + '/resource/updateNodeResourceNote',
          //localUrl: '/data/assignNum.json',
          body: obj
      })
    }
    /*
      查询区块备注 - 活动报名用
      @method:     post
      functinID:   mac.jd.com/resource/queryApplyAreaBatchDesc
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=81344968
    */
    getApplyBatchDesc(paramObj, errFun) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/resource/queryApplyAreaBatchDesc',
        // localUrl: '/data/resourceData/queryApplyAreaBatchDesc.json',
        body: paramObj
      })
    }
    /*
      根据部门ID获取部门详情
    */
    getDepListData(id) {
        return xhr({
            method: 'get',
            url: rootPathBj + '/common/deptinfo/'+id,
            //localUrl: '/data/depList.json',
            //body: id
        })
    }

    /*
      根据资源分配节点获取资源详情
    */
    getAssignDetailsData(id) {
      return xhr({
          method: 'get',
          url: rootPathBj + '/resource/detail/'+id,
          //localUrl: '/data/assignDetails.json',
          //body: defaultParam
      })
    }

    /*
      根据资源分配节点删除资源
    */
    deleteAssignData(id) {
      return xhr({
          method: 'post',
          url: rootPathBj + '/resource/delete/'+id,
          //localUrl: '/data/depList.json',
          //body: defaultParam
      })
    }

    /*
      创建分配资源
    */
    createAssignListData(data) {
      var defaultParam = {
        resourceData:data
      }
      return xhr({
          method: 'post',
          url: rootPathBj + '/resource/bulk/create',
          //localUrl: '/data/depList.json',
          body: defaultParam
      })
    }

    /*
      更新分配资源
    */
    updateAssignData(data) {
      var defaultParam = {
        resourceData:data
      }
      return xhr({
          method: 'post',
          url: rootPathBj + '/resource/update',
          //localUrl: '/data/depList.json',
          body: defaultParam
      })
    }

     /*
      多批次批量验证分配信息
    */
    checkAssignListData(data) {
      var defaultParam = {
          resourceData:data
      }
      return xhr({
          method: 'post',
          url: rootPathBj + '/resource/bulk/validate',
          //localUrl: '/data/depList.json',
          body: defaultParam
      })
    }
}


// 实例化后导出，全局单例
export default new assignService()
