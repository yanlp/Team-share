import xhr from './xhr/'
import { rootPath, rootPathCore, rootPathBj } from './xhr/config';
import util from 'LIBS/util';
/**
 * 批次相关请求api
 */
class BatchService{
  /*
    根据条件分页获取批次信息(活动报名)
    @method:     post
    functinID:   mac.jd.com/batch/page
  */
  getBatchPageInfo(paramObj,errFun){
      return xhr({
        method:'post',
        url: rootPathBj+'/batch/page',
        // localUrl: '/data/batchTestData/batchPageList.json',
        body: paramObj
      })
  }
  /*
    根据条件分页获取 未加载出来的 批次的 待审核数量(活动报名)
    @method:     post
    functinID:   mac.jd.com/check/waitingCount
    cfurl: https://cf.jd.com/pages/viewpage.action?pageId=110608348
  */
  getCheckWaitingCount(paramObj,errFun){
      return xhr({
        method:'post',
        url: rootPathBj+'/check/waitingCount',
        body: paramObj
      })
  }
  /**
   * 【商家邀请】批次列表分页查询
   * @param {object} paramObj
   * wiki: http://cf.jd.com/pages/viewpage.action?pageId=81357699
   */
  getBatchInvitePageInfo(paramObj) {
    return xhr({
      method:'post',
      url: rootPathBj+'/batch/invite/page',
      // localUrl: '/data/batchTestData/batchPageList.json',
      body: paramObj
    }) 
  }
  /*
    根据条件分页获取批次信息(活动管理)
    @method:     post
    functinID:   mac.jd.com/batch/manage/page
  */
  getManageBatchPageInfo(paramObj,errFun){
      return xhr({
        method:'post',
        url: rootPathBj+'/batch/manage/page',
        // localUrl: '/data/batchTestData/batchPageList.json',
        // mockUrl:rootPathBj+'/mc/batch/manage/page',
        body: paramObj
      })
  }
  /*
    根据id查询批次详情
    @method: GET
    functionID:mac.jd.com/batch/detail/{areaId}/{batchId}
  */
  getBatchDetailInfo(paramObj){
    return xhr({
        method:'get',
        url: rootPathBj + '/batch/detail/'+ paramObj,
        // localUrl:'/data/batchTestData/batchDetailInfo.json'
    })
  }
  /*
    创建批次信息
    @method:post
    function: mac.jd.com/batch/create
  */
  createBatchInfo(paramObj){
    return xhr({
        method:'post',
        url:rootPathBj+ '/batch/create',
        // localUrl:'/data/batchTestData/batchCreate.json',
        body:paramObj
    })
  }
  /*
    更新批次信息
    @method:post
    function: mac.jd.com/batch/update
  */
  updateBatchInfo(paramObj){
    return xhr({
        method:'post',
        url:rootPathBj + '/batch/update',
        // localUrl:'/data/actMsg.json',
        body:paramObj
    })
  }
  /*
    删除批次信息
    @method: Get
    functionID： mac.jd.com/batch/delete/{id}
    return {}
  */
  deleteBatchInfo(paramObj){
    return xhr({
        method:'get',
        url:rootPathBj+`/batch/delete/${paramObj}`,
        // localUrl:'/data/batchTestData/delete.json'
        // body:paramObj
    })
  }
  /*
    批量创建批次预览
    @method：post
    functionID :mac.jd.com/batch/multi/preview
    return BatchReq
  */
  previewNewBatchList(paramObj){
    return xhr({
        method:'post',
        url:rootPathBj+'/batch/multi/preview',
        // localUrl:"",
        body:paramObj
    })
  }

  /*
    批量新建批次
    @method：post
    functionID：mac.jd.com/batch/multi/create
    reutrn：{}
  */ 
  creatBatchMultiInfo(paramObj){
    return xhr({
        method:'post',
        url:rootPathBj+'/batch/multi/create',
        // localUrl:"",
        body:paramObj
    })
  }
  /* 
    报名进度，批次列表分页查询
    @method：post
    functionId:mac.jd.com/batch/applyprogress/page
    return :Object
    wiki: http://cf.jd.com/pages/viewpage.action?pageId=81528244
  */
  checkBatchApplyProgressPage(paramObj){
    return xhr({
      method:"post",
      url:rootPathBj + '/batch/applyprogress/page',
      body:paramObj
    })
  }
  /*
      批次+资源列表分页查询 - 批量报名使用
      @method:     post
      functinID:   mac.jd.com/batch/bulkapply/page
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=81527843
    */
    batchResourceList(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/batch/bulkapply/page',
          // localUrl: '/data/batchTestData/batchResourceList.json',
          body: paramObj
        })
    }
    /*
      商家邀请批次列表分页查询 - 商家审核使用
      @method:     post
      functinID:   mac.jd.com/batch/invite/page
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=81357699
    */
    batchBusinessList(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/batch/invite/page',
          // localUrl: '/data/batchTestData/batchResourceList.json',
          body: paramObj
        })
    }
    /*
      供应商邀请批次列表分页查询 -
      @method:     post
      functinID:   mac.jd.com/batch/vendor/invite/page
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=88939079
    */
    batchVenderList(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/batch/vendor/invite/page',
          // localUrl: '/data/batchTestData/batchResourceList.json',
          body: paramObj
        })
    }

    /**
     * @function batchResourcePath 获取【活动下资源位节点分配路径】
     * @param {object} paramObj
     * @description http://cf.jd.com/pages/viewpage.action?pageId=101575025
     */
    batchResourcePath(paramObj) {
      return xhr({
        method:'post',
        url: `${rootPathBj}/resource/path`,
        // url: 'http://192.168.108.227:7001/mock/59c3723651c38d5f10dd724a/mc/resource/path', // mock
        body: paramObj,
      });
    }
    /* 
      根据条件返回批次不同纬度的统计数字
      @function getBatchExtInfo
      @param {object}
      @wiki: http://cf.jd.com/pages/viewpage.action?pageId=102816168
    */
    getBatchExtInfo(paramObj){
      return xhr({
        method: 'post',
        url: `${rootPathBj}/batch/extInfo`,
        mockUrl: 'http://192.168.108.227:7001/mock/59c3723651c38d5f10dd724a/mc/batch/extInfo',
        body: paramObj
      })
    }
    /*
      跨区块批量创建批次
      @1 批次设置应用于其他区块”按钮点击后，出现弹框区块列表接口
      @function: batchMultiplexPage
      @param {object}
      @wiki: http://cf.jd.com/pages/viewpage.action?pageId=105146969
      @method: post
    */
    getBatchMultiplexPage(param) {
      return xhr({
          method: 'post',
          url: `${rootPathBj}/area/manage/batchMultiplexPage`,
          mockUrl: 'http://192.168.108.227:7001/mock/59c3723651c38d5f10dd724a/mc/area/manage/batchMultiplexPage',
          body: param
      })
    }
    /*
      跨区块批量创建批次
      @2 “批次设置应用于其他区块” 按钮是否置灰接口
      @function getBatchShowStatus
      @param {object}
      @wiki http://cf.jd.com/pages/viewpage.action?pageId=105146948
      @method: post
    */
    getBatchShowStatus(param) {
      return xhr({
        method: 'post',
        url:`${rootPathBj}/batch/manage/batchMultiplexButtonIsGrey`,
        // mockUrl: 'http://192.168.108.227:7001/mock/59c3723651c38d5f10dd724a/mc/batch/manage/batchMultiplexButtonIsGrey',
        body: param
      })
    }
    /*
      跨区块批量创建批次
      @3 勾选区块完点击“应用” 按钮提交接口
      @function getBatchShowStatus
      @param {object}
      @wiki http://cf.jd.com/pages/viewpage.action?pageId=105146983
      @method: post
    */
    applyBatchToOtherArea(param) {
      return xhr({
        method: 'post',
        url:`${rootPathBj}/area/manage/batchMultiplexApplication`,
        mockUrl: 'http://192.168.108.227:7001/mock/59c3723651c38d5f10dd724a/mc/batch/manage/batchMultiplexApplication',
        body: param
      })
    }
}

// 实例化后导出，全局单例
export default new BatchService()
