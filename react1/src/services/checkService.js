import xhr from './xhr/'
import {
  rootPath,
  rootPathCore,
  rootPathBj
} from './xhr/config';
import util from 'LIBS/util';
import base from 'LIBS/base';
/**
 * 资源审核相关请求api
 */
class checkService {
  /*
    根据条件分页获取审核列表
    @method:     post
    functinID:   mac.jd.com/check/page
    wiki:        http://cf.jd.com/pages/viewpage.action?pageId=80246554
  */
  getPageInfo(paramObj, errFun) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/page',
        // localUrl: '/data/auditData/checkData.json',
        // mockUrl: '/mc/check/page/duanlinlinzhuanyong',
        body: paramObj
      })
    }

  /*
    获取单个批次的各种信息（数量信息）
    @method:     post
    functinID:   mac.jd.com/batch/page
    wiki:        http://cf.jd.com/pages/viewpage.action?pageId=80246642
  */
  getBatchData(paramObj){
    return xhr({
      method: 'post',
      url: rootPathBj + '/batch/page',
      body: paramObj
    })
  }
    /*
      查询不同资源维度下，所有审核状态相关数量
      @method:      POST
      functionID:   mac.jd.com/check/all/count
      wiki:         http://cf.jd.com/pages/viewpage.action?pageId=80224745
    */
  getAllCount(paramObj) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/all/count',
        // localUrl: '/data/auditData/count.json',
        body: paramObj
      })
    }
    /*
      查询对应资源下当前人待审数量
      @method:    POST
      functinID:  mac.jd.com/check/wait/count
      wiki:       http://cf.jd.com/pages/viewpage.action?pageId=80224497
    */
  getWaitCount(paramObj) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/wait/count',
        // localUrl: '/data/auditData/count.json',
        body: paramObj
      })
    }
    /*
      批量审核——通过
      @method:    POST
      functinID:  mac.jd.com/check/pass
      wiki:       http://cf.jd.com/pages/viewpage.action?pageId=80246564
    */
  pass(paramObj) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/pass',
        // localUrl: '/data/auditData/pass.json',
        body: paramObj
      })
    }
    /*
      批量审核——驳回
      @method:    POST
      functionID：mac.jd.com/check/reject
      wiki:       http://cf.jd.com/pages/viewpage.action?pageId=80246566
    */
  reject(paramObj) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/reject',
        // localUrl: '/data/auditData/pass.json',
        body: paramObj
      })
    }
    /*
      单个审核——驳回
      @method:    POST
      functionID：mac.jd.com/check/single/reject
      wiki:       http://cf.jd.com/pages/viewpage.action?pageId=80393362
    */
  rejectSingle(paramObj) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/single/reject',
        // localUrl: '/data/auditData/pass.json',
        body: paramObj
      })
    }
    /*
      批量审核——驳回
      @method:    POST
      functionID：mac.jd.com/check/reject
    */
  rejectMulti(paramObj) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/reject',
        // localUrl: '/data/auditData/pass.json',
        body: paramObj
      })
    }
    /*
      资源审核/活动报名页面 - 点击某个批次时异步获取个人资源数与拥有资源的部门
      @method:     post
      functinID:   mac.jd.com/resource/deptown/count
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=80400561
    */
  getDeptInfo(paramObj, errFun) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/resource/deptown/count',
        // localUrl: '/data/auditData/dept.json',
        body: paramObj
      })
    }
    /*
        查询报名记录审核流水
        @method:     post
        functinID:   mac.jd.com/check/flow
        wiki:        http://cf.jd.com/pages/viewpage.action?pageId=80400944
      */
  getFlowInfo(paramObj, errFun) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/flow',
        // localUrl: '/data/auditData/flow.json',
        body: paramObj
      })
    }
    /*报名进度 审核页面报名进度按钮展示
      @method: mac.jd.com/check/progress/flag
      wiki:http://cf.jd.com/pages/viewpage.action?pageId=81528254
    */
  checkProgressShowStatus(paramObj) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/progress/flag',
        body: paramObj
      })
    }
    /*
      视觉审核
      @method: mac.jd.com/check/viewCheck 

      wiki: http://cf.jd.com/pages/viewpage.action?pageId=81552945 

    */
  checkViewStatus(paramObj) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/viewCheck',
        body: paramObj
      })
    }
    /*
      【活动报名】根据条件分页获取待我审核区块列表信息
      @method:     post
      functinID:   mac.jd.com/check/area/page
      wiki:        
    */
  checkAreaPage(paramObj) {
      return xhr({
        method: 'post',
        url: rootPathBj + '/check/area/page',
        // localUrl: '/data/auditData/enrollAudit.json',
        // mockUrl:rootPathBj+'/mc/check/area/page',
        body: paramObj
      })
    }
  /*
    【活动报名】根据条件分页获取待他人审核区块列表信息
    @method:     post
    functinID:   mac.jd.com/check/pass/page
    wiki:        
  */
  checkPassPage(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/check/pass/page',
      body: paramObj
    })
  }
    /*
    获取待审核数据
    活动列表
    @method: post
    @function:mac.jd.com/check/count
    @wiki:http://cf.jd.com/pages/viewpage.action?pageId=90634793
  */
  getAuditCheckCount() {
    return xhr({
      method: 'post',
      url: rootPathBj + '/check/count',
      // localUrl:'/data/auditData/checkNum.json'
    })
  }
  /*    导出图书返利涵数据
    @method: mac.jd.com/check/filepacket/export
    wiki:http://cf.jd.com/pages/viewpage.action?pageId=89595045
  */
  exportRebateInfo(paramObj){
    return xhr({
      method:'post',
      url:rootPathBj + '/check/filepacket/export',
      body:paramObj
    })
  }
   /*    导出图书审核页商品集并文件数据
    @method: mac.jd.com/check/fileskuset/export
    wiki:http://cf.jd.com/pages/viewpage.action?pageId=89597448
  */
  exportFileSkusInfo(paramObj){
    return xhr({
      method:'post',
      url:rootPathBj + '/check/fileskuset/export',
      body:paramObj
    })
  }
  /*  根据 批次ID 获取审核完成进度 
    @method:mac.jd.com/check/progress
    wiki:http://cf.jd.com/pages/viewpage.action?pageId=93093140
  */
  checkBatchProgressStatus(param){
    return xhr({
      method:'post',
      url:rootPathBj+'/check/progress',
      body:param
    })
  }
  /*  
  信息导出接口 走邮件下载
  */
  exportMessage(paramObj){
    return xhr({
      method:'post',
      url:rootPathBj+'/check/export',
      body:paramObj
    })
  }
  /*  
  活动维度信息导出接口 走邮件下载
  */
  excelExportSendMail(paramObj){
    return xhr({
      method:'post',
      url:rootPathBj+'/resource/areaExcelExportSendMail',
      body:paramObj
    })
  }
  /*  
  区块列表审核进度导出 走邮件
  */
  blockListExport(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/check/progress/export',
      mockUrl: '/mc/check/progress/export',
      body: paramObj
    });
  }
  /*
    催审请求接口
    */
  remindCheck(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/check/press',
      body: paramObj,
    })
  }
  /*
    催报 接口
    */
  remindEnroll(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/apply/press',
      body: paramObj,
    })
  }
  /*
    调整至其他批次
    */
  changeBatch(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/check/crossBatchAdjust',
      mockUrl: '/mc/check/crossBatchAdjust',
      body: paramObj,
    })
  }
  saveChangeBatch(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/check/crossBatchAdjustSave',
      mockUrl: '/mc/check/crossBatchAdjustSave',
      body: paramObj,
    })
  }

  /*
      查询不同资源维度下，所有商家报名相关数量
      @method:      POST
      functionID:   mac.jd.com/openApply/count 
      wiki:         http://cf.jd.com/pages/viewpage.action?pageId=80224745
    */
   getOpenApplyCount(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/check/openApply/count',
      // localUrl: '/data/auditData/count.json',
      mockUrl: '/mc/openApply/count',
      body: paramObj
    })
  }
}
// 实例化后导出，全局单例
export default new checkService()