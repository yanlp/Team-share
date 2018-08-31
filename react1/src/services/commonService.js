import xhr from './xhr/'
import { rootPath, rootPathCore, rootPathBj, rootNode } from './xhr/config'
import util from 'LIBS/util'

/**
 * 公共用的 API
 */
class commonService {

    /**
     * erp信息
     */
    getErpInfo(paramObj, errFun) {
        // console.log('erpStr', erpStr)
        return xhr({
            method: 'post',
            url: rootPathBj + '/common/erp/info',
            // localUrl: '/data/erpData.json',
            errFun: errFun,
            body: paramObj
        })
    }
    /*
     check erp是否能添加
    */
    checkErpCanAdd(paramObj){
      return xhr({
            method: 'post',
            url: rootPathBj + '/common/erp/group',
            // localUrl: '/data/erpData.json',
            body: paramObj
        })
    }
     /**
     *
     *仅用于获取uploadURl ,包括文件和图片上传
     */
    getUploadUrl(functionId) {
        return  rootPathBj + functionId;
    }

    /*
        sku编号批量查询商品详情
        @method:     post
        functinID:   mac.jd.com/common/sku/info
        wiki:        http://cf.jd.com/pages/viewpage.action?pageId=80394939
      */
    getSkuInfo(paramObj, errFun) {
        return xhr({
            method: 'post',
            url: rootPathBj + '/common/sku/info',
            // localUrl: '/data/common/skuInfo.json',
            body: paramObj
        })
    }
    /*
        促销编号批量查询促销商品详情
        @method:     post
        functinID:   mac.jd.com/common/promo/info
        wiki:        http://cf.jd.com/pages/viewpage.action?pageId=80401004
      */
    getPromoInfo(paramObj, errFun) {
        return xhr({
            method: 'post',
            url: rootPathBj + '/common/promo/info',
            // localUrl: '/data/commonData/skuInfo.json',
            body: paramObj
        })
    }
    /*
      拼购Id批量获取商品详情
    */
    getPinGoInfo(paramObj){
      return xhr({
          method:'post',
          url: rootPathBj +'/common/active/info',
          // localUrl:'/data/commonData/pinGoInfo.json',
          body:paramObj
      })
    }
    /*
      优惠券Id批量获取优惠券详情
       @method:     post
        functinID:   mac.jd.com/common/promo/info
        wiki:        http://cf.jd.com/pages/viewpage.action?pageId=80401004
    */
    getCouponInfo(paramObj){
      return xhr({
          method:'post',
          url: rootPathBj +'/common/coupon/info',
          body:paramObj
      })
    }
    /**
   * 获取文件下载路径
   *
   */
  getFileUrlData(key,fileName){
    var defaultParam = {
      key:key,
      filename:fileName
    }
    var url =rootPathBj+'/common/doc/download';
    var form =  document.createElement("form"); //定义一个form表单
    //var iframe = document.createElement("iframe");//定义一个iframe
    //iframe.setAttribute("id","yjy");
    //iframe.style.display="none";
    form.method='post';
    form.action= url;
   // form.target="yjy";
    for (var i in defaultParam) {
        var input = document.createElement('input');
        input.type='hidden';
        input.name=i;
        input.value=defaultParam[i];
        form.appendChild(input); //将查询参数控件提交到表单上
    }
    document.body.appendChild(form); //将iframe表单放置在web中
    //iframe.appendChild(form);
    form.submit();
    // var oFrm = iframe[0];
    // console.log(oFrm);
    // oFrm.onload = oFrm.onreadystatechange = function() {
    //     console.log("wancheng");
    //    if (this.readyState && this.readyState != 'complete') return;
    //    else {
    //        onComplete();
    //    }
    // }
  }

  /*
      获取商品集文件和返利涵下载地址
      @method:     post
      functinID:   mac.jd.com/common/upload
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=89591084
    */
  getSkusFileUploadUrl(functionId) {
      return  rootPathBj + functionId;
  }

  /**
  * 获取供应商邀请列表
  * method POST
  * wiki: http://cf.jd.com/pages/viewpage.action?pageId=88939033
  */
  getInviteList(paramObj, errFun) {
    return xhr({
      method: 'post',
      url: `${rootPathBj}/apply/vendor/invite/list`,
      body: paramObj
    });
  }

  /**
  * 创建供应商邀请
  * method POST
  * wiki: http://cf.jd.com/pages/viewpage.action?pageId=88939037
  */
  createInvite(paramObj) {
    return xhr({
      method: 'post',
      url: `${rootPathBj}/apply/vendor/invite/create`,
      body: paramObj,
    });
  }

  /**
   * 批量创建供应商信息
   * @param {object} paramObj 
   * wiki: http://cf.jd.com/pages/viewpage.action?pageId=100891603
   */
  createMulitiInvite(paramObj) {
    return xhr({
      method: 'post',
      url: `${rootPathBj}/apply/vendor/invite/mulitiBatchCreate`,
      body: paramObj,
    });
  }

  /**
  * 删除供应商邀请
  * method POST
  * wiki: http://cf.jd.com/pages/viewpage.action?pageId=88939040
  */
  deleteInvite(paramObj) {
    return xhr({
      method: 'post',
      url: `${rootPathBj}/apply/vendor/invite/delete`,
      body: paramObj,
    });
  }
  /**
  * 判断当前登录用户角色
  * method GET
  * wiki: http://cf.jd.com/pages/viewpage.action?pageId=89600707
  */
  getUserRole() {
    return xhr({
      method: 'post',
      url: rootPathBj+'/activity/userrole'
      //body: paramObj,
    });
  }
  /**
   * 判断用户是不是活动管理组组员
   * 
   */
  checkUserIsManger (id) {
    var defaultParam = {
      activityId:id
    }
    return xhr({
      method: 'post',
      url: rootPathBj+'/activity/ismanager',
      //localUrl: '/data/actMsg.json',
      body: defaultParam
    })
  }

  /**
  * 获取供应商邀请列表
  * method POST
  * wiki: http://cf.jd.com/pages/viewpage.action?pageId=88939033
  */
  getInviteList(paramObj, errFun) {
    return xhr({
      method: 'post',
      url: `${rootPathBj}/apply/vendor/invite/list`,
      body: paramObj
    });
  }

  /**
  * 创建供应商邀请
  * method POST
  * wiki: http://cf.jd.com/pages/viewpage.action?pageId=88939037
  */
  createInvite(paramObj) {
    return xhr({
      method: 'post',
      url: `${rootPathBj}/apply/vendor/invite/create`,
      body: paramObj,
    });
  }

  /**
  * 删除供应商邀请
  * method POST
  * wiki: http://cf.jd.com/pages/viewpage.action?pageId=88939040
  */
  deleteInvite(paramObj) {
    return xhr({
      method: 'post',
      url: `${rootPathBj}/apply/vendor/invite/delete`,
      body: paramObj,
    });
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
  * 判断当前登录用户角色
  * method GET
  * wiki: http://cf.jd.com/pages/viewpage.action?pageId=89600707
  */
  getUserRole() {
    return xhr({
      method: 'post',
      url: rootPathBj+'/activity/userrole',
      localUrl: '/data/commonData/userrole.json',
      //body: paramObj,
    });
  }

  /*
      获取资源分配上传地址
      @method:     post
      functinID:   mac.jd.com/resource/import
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=89591084
    */
  getAssignFileUploadUrl(functionId) {
      return  rootPathBj + functionId;
  }
  /*
    获取资讯详情
    @method: post
    @functionID: mac.jd.com/apply/article/check
    wiki: http://cf.jd.com/pages/viewpage.action?pageId=98899829
  */
  getArticleInfo(articleIds) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/apply/article/check',
      // localUrl: 
      body: articleIds,
    });
  }
  /*
    获取视频详情
    @method: post
    @functionID: http://mac.jd.com/apply/video/check
    wiki: http://cf.jd.com/pages/viewpage.action?pageId=98902340
  */
  getVideoInfo(videoIds) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/apply/video/check',
      // localUrl: 
      body: videoIds,
    });
  }
   /*
    一键开放商家或者供应商
    @method: post
    @functionID: http://mac.jd.com/apply/open
    wiki: http://cf.jd.com/pages/viewpage.action?pageId=98924531
  */
  openVenderHandle(obj) {
    const paramObj = {
      applyOpenData:JSON.stringify(obj)
    }
    return xhr({
      method: 'post',
      url: rootPathBj + '/apply/open',
      // localUrl: 
      body: paramObj,
    });
  }
  /*
    根据sku编号批量查询统计sku
    @method:            post
    functionID:         http://cf.jd.com/pages/viewpage.action?pageId=100863052
    param:              skuIds
  */
  getBroSkuIds(paramObj) {
    return xhr({
      method: 'post',
      url: `${rootPathBj}/common/sku/bro`,
      body: paramObj,
    });
  }

  /*
    excel表格报名导入校验
    @method:     post
    functinID:   mac.jd.com/apply/excel/upload
    wiki:        http://cf.jd.com/pages/viewpage.action?pageId=101942537
  */
  getExcelFileUploadUrl(functionId) {
    return  rootPathBj + functionId;
  }

  /*
    从远程服务器上获取图片信息
    @method:     post
    functinID:   http://{host}/nodeApi/getRemoteImageInfo
    wiki:        http://cf.jd.com/pages/viewpage.action?pageId=101944719
  */
  getRemoteImageInfo(paramObj) {
    let url = rootNode + '/getRemoteImageInfo';
    return xhr({
      method: 'post',
      url: url,
      body: paramObj
    })
  }

  /**
   * @description 查询单个区块审核数据
   * @method get
   * @param {Number} activityId 区块id
   * @wiki http://cf.jd.com/pages/viewpage.action?pageId=104127884
   */
  getAreaSingleQuery(activityId) {
    const url = `${rootPathBj}/area/singleQuery/checkNum?id=${activityId}`;
    // const url = `http://192.168.108.227:7001/mock/59c3723651c38d5f10dd724a/mc/area/singleQuery/checkNum?id=${activityId}`;
    return xhr({
      method: 'get',
      url,
    });
  }

  /**
   * @description 查询供应商账号根据供应商编码或供应商账号
   * @method post
   * @param {Number} providerCode 供应商简码或供应商账号
   * @wiki http://cf.jd.com/pages/viewpage.action?pageId=105521030
   */
  getVCListByCode(paramObj) {
    return xhr({
      method: 'post',
      url: rootPathBj + '/resource/querySupplierLoginNames ',
      body: paramObj
    })
  }
}

// 实例化后导出，全局单例
export default new commonService()
