import xhr from './xhr/'
import { rootPath, rootPathCore, rootPathBj, rootNode } from './xhr/config';
import util from 'LIBS/util';
/**
 * 活动报名相关请求api
 */
class enrollService {
    /*
      创建报名信息
      @method:    POST
      functionID：mac.jd.com/apply/create
      wiki:       http://cf.jd.com/pages/viewpage.action?pageId=80246664
    */
    create(paramObj) {
        return xhr({
            method: 'post',
            url: rootPathBj + '/apply/create',
            // localUrl: '/data/auditData/pass.json',
            body: paramObj
        })
    }

    /*
      已报名管理列表页
      @method：post
      @function: mac.jd.com/apply/page
    */
    getEnrolledList(paramObj,errFun){
      return xhr({
        method:'post',
        url: rootPathBj+'/apply/page',
        localUrl: '/data/enrollData/enrollListNew.json',
        // mockUrl:rootPathBj+'/mc/apply/page/duanlinlinzhuangyong',
        body: paramObj
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
          url:rootPathBj+'/apply/quit',
          // localUrl:'/data/enrollData/quit.json',
          body:{
            applyId:param
          }
        })
    }
    /*
      活动报名- 获得区域信息
      @method：post
      @function: mac.jd.com/apply/region/info

    */
    getRegionInfo(param){
      return xhr({
          method:'get',
          url:rootPathBj+'/apply/region/info',
          // localUrl: '/data/commonData/regionInfo.json'
          mockUrl: '/mc/apply/region/info'
        })
    }
    /*
      查询商家邀请列表
      @method：post
      @function: mac.jd.com/apply/invite/list
    */
    getBusinessList(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/apply/invite/list',
          body:paramObj
        })
      }
    /*
      更新报名信息
      @method:     post
      functinID:   mac.jd.com/apply/change
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=81351429
    */
    update(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/apply/change',
          // localUrl: '/data/commonData/regionInfo.json',
          body: paramObj
        })
    }
    /*
      创建商家邀请信息
      @method：post
      @function: mac.jd.com/apply/invite/create
    */
    createBusiness(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/apply/invite/create',
          // localUrl: '/data/commonData/regionInfo.json'
          body: paramObj
        })
    }
    
    /**
     * 批量创建商家邀请信息
     * @param {object} paramObj
     * wiki: http://cf.jd.com/pages/viewpage.action?pageId=100697802
     */
    createMultBusiness(paramObj) {
      return xhr({
        method: 'post',
        url: `${rootPathBj}/apply/invite/multiCreate`,
        body: paramObj,
      });
    }

    /*
      删除商家邀请信息
      @method：post
      @function: mac.jd.com/apply/invite/delete
    */
    delBusiness(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/apply/invite/delete',
          // localUrl: '/data/commonData/regionInfo.json',
          body:paramObj
        })
    }

    /*根据id查询报名详情
      @method:     get
      functinID:   mac.jd.com/apply/detail/{id}
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=80246662
    */
    detail(id){
      let url = rootNode+'/apply/detail/'+id
      return xhr({
          method:'get',
          url: url,
          localUrl: '/data/enrollData/detail-pd-new.json',
          // mockUrl:  '/mc/nodeApi/apply/detail/'+id
          // mockUrl: '/na/apply/detail/'+id+'/jiangli'
        })
    }
    /*
      批量报名
      @method:     post
      functinID:   mac.jd.com/apply/batch/create
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=81526796
    */
    multiCreate(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/apply/batch/create',
          // localUrl: '/data/enrollData/bulkCreate1.json',
          body: paramObj
        })
    }
    /*
      批量报名——SKU信息校验
      @method:     post
      functinID:   mac.jd.com/apply/sku/check
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=87240518
    */
    skuCheck(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/apply/sku/check',
          // localUrl: '/data/enrollData/skuCheck.json',
          body: paramObj
        })
    }
    /*
      批量报名——促销编码信息校验
      @method:     post
      functinID:   mac.jd.com/apply/promo/check
      wiki:        http://cf.jd.com/pages/viewpage.action?pageId=87240518
    */
    promoCheck(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/apply/promo/check',
          // localUrl: '/data/enrollData/promoCheck.json',
          body: paramObj
        })
    }
    /*
      批量报名——拼购id校验
      @method:     post
      functinID:   mac.jd.com/apply/xx/check
      wiki:        
    */
    pinGoCheck(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/apply/pinGo/check',
          // localUrl: '/data/enrollData/pingoCheck.json',
          body: paramObj
        })
    }
    /*
      批量报名——优惠券id校验
      @method:     post
      functinID:   mac.jd.com/apply/coupon/check
      wiki:      http://cf.jd.com/pages/viewpage.action?pageId=93066590  
    */
    couponCheck(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/apply/coupon/check',
          body: paramObj
        })
    }
    /*
      批量报名——金融券子活动id
      @method:     post
      functinID:   mac.jd.com/common/financeCoupon/info
      wiki:      http://cf.jd.com/pages/viewpage.action?pageId=106863389
    */
    financeCouponCheck(paramObj){
      return xhr({
        method:'post',
        url:rootPathBj+'/apply/jrcoupon/check',
        // mockUrl: '/mc/common/financeCoupon/info',
        body: paramObj
      })
    }
    downLoadModule(paramObj){
      return xhr({
          method:'post',
          url:rootPathBj+'/apply/templet/download',
          // localUrl: '/data/enrollData/promoCheck.json',
          body: paramObj
        })
    }
    /*
      根据条件分页获取促销编码详情
      @method:            post
      functionID:         mac.jd.com/apply/detailedInformation/{id}
      param:              1. id    报名ID
                          2. page  页码
                          3. pageSize  每页内容  
    */
    getPromInfo(paramObj) {
      return xhr({
        method: 'post',
        url: rootPathBj+'/apply/detailedInformation',
        localUrl: '/data/promList.json',
        body: paramObj
      })
    }
    /*
      根据资讯id查询相应的资讯信息是否有效
      @method:            post
      functionID:         mac.jd.com/apply/article/check
      param:              1. id    咨询id
                       
    */
    articleCheck(paramObj) {
      return xhr({
        method: 'post',
        url: `${rootPathBj}/apply/article/check`,
        //localUrl: '/data/promList.json',
        body: paramObj
      })
    }
    /*
      根据视频id查询相应的视频信息是否有效
      @method:            post
      functionID:         http://cf.jd.com/pages/viewpage.action?pageId=98902340
      param:              1. videoId    视频id
                       
    */
    videoCheck(paramObj) {
      return xhr({
        method: 'post',
        url: `${rootPathBj}/apply/video/check`,
        //localUrl: '/data/promList.json',
        body: paramObj
      })
    }
    /**
     * 批量开放报名
     * @param {object} paramObj 
     * wiki: http://cf.jd.com/pages/viewpage.action?pageId=100697842
     */
    multiOpen(paramObj) {
      return xhr({
        method: 'post',
        url: `${rootPathBj}/apply/multiOpen`,
        //localUrl: '/data/promList.json',
        body: paramObj
      });
    }

    /**
    * 商品报名Excel模板下载
    * @param {object} paramObj 
    * wiki: http://cf.jd.com/pages/viewpage.action?pageId=101942409
    */
    excelTableDownload(paramObj) {
      return xhr({
        method: 'post',
        url: `${rootPathBj}/apply/ware/templet/download`,
        body: paramObj
      });
    }

     /**
     * 获取试用id详情
     * @param {object} paramObj 
     * wiki: http://cf.jd.com/pages/viewpage.action?pageId=100697842
     */
    tryCheck(paramObj) {
      return xhr({
        method:'post',
        url:rootPathBj+'/apply/try/check',
        // localUrl: '/data/enrollData/pingoCheck.json',
        body: paramObj
      })
    }
    /*
      @wiki: http://cf.jd.com/pages/viewpage.action?pageId=100270579
      @param: applyId
      @method: post
    */
    getPromoDetail(paramObj) {
      return xhr({
        method: 'post',
        url: `${rootPathBj}/apply/promo/detail`,
        mockUrl: '/mc/apply/promo/detail',
        body: paramObj
      })
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
    校验商家基础资质线
    @method:            post
    functionID:         http://cf.jd.com/pages/viewpage.action?pageId=108792789
    param:              shopId
    */
    getShopBaseline(paramObj) {
      return xhr({
        method: 'post',
        url: `${rootPathBj}/apply/shop/baseline`,
        body: paramObj
      });
    }

    /*
    根据店铺id获取店铺名称
    @method:            post
    functionID:         http://cf.jd.com/pages/viewpage.action?pageId=107075069
    param:              shopId
    */
    getShopName(paramObj) {
      return xhr({
        method: 'post',
        url: `${rootPathBj}/apply/beanPlan/shop`,
        body: paramObj, 
      });
    }
    /*
    验证京豆计划Id有效性，并返回京豆计划信息
    @method:            post
    functionID:         http://cf.jd.com/pages/viewpage.action?pageId=107075736
    param:              1、venderPin; 2、beanPlanId; 3、shopId
    */
    getBeanPlanDetail(paramObj) {
      return xhr({
        method: 'post',
        url: `${rootPathBj}/apply/beanPlan/beanPlanId`,
        body: paramObj, 
      })
    }
    /*
    店铺组前置教研
    @method:            post
    functionID:         http://cf.jd.com/pages/viewpage.action?pageId=108060970
    param:              shopIdGroup
    */
    getShopIdGroupDetail(paramObj) {
      return xhr({
        method: 'post',
        url: `${rootPathBj}/apply/shopList/check`,
        body: paramObj,
      })
    }
}

// 实例化后导出，全局单例
export default new enrollService()
