import xhr from './xhr/';
import { rootPath, rootPathCore, rootPathBj } from './xhr/config';
import util from 'LIBS/util';

class aptitudeSettingService {
    /*
        资质模板列表查询接口
        @method: post
        @function: mac.jd.com/activity/page
        wiki: http://cf.jd.com/pages/viewpage.action?pageId=104128645
    */
    getListData(paramObj) {
        return xhr({
            method: 'post',
            url: rootPathBj + '/qualificationTemplateUserRelation/page',
            body: paramObj
        })
    }

    /*
        资质模板复制功能
        @method: post
        @function: mac.jd.com/qualificationTemplateUserRelation/{templateId}/copy
        wiki: http://cf.jd.com/pages/viewpage.action?pageId=104133583
    */
    copyTemplate(templateId) {
        let paramObj = {
            id: templateId
        }
        return xhr({
            method: 'post',
            url: rootPathBj + '/qualificationTemplateUserRelation/' + templateId + '/copy',
            mockUrl: '/mc/qualificationTemplateUserRelation/' + templateId + '/copy',
            body: paramObj
        })
    }

    /*
        点击弹框内"复用"按钮
        @method: post
        @function: mac.jd.com/qualificationTemplateUserRelation/multiplex
        wiki: http://cf.jd.com/pages/viewpage.action?pageId=104110652
    */
    dialogMultiplexButton(paramObj) {
        return xhr({
            method: 'post',
            url: rootPathBj + '/qualificationTemplateUserRelation/multiplex',
            body: paramObj
        })
    }

    /*
        用户设置列表模板编辑
        @method: get
        @param: id   模板id 
        @function: mac.jd.com/qualificationTemplateUserRelation/{id}
        wiki: http://cf.jd.com/pages/viewpage.action?pageId=104125473
    */
    editTemplate(id) {
        return xhr({
            method: 'get',
            url: rootPathBj + '/qualificationTemplateUserRelation/' + id,
            mockUrl: '/mc/qualificationTemplateUserRelation/' + id,
        })
    }

    /*
        用户设置列表模板删除
        @method: post
        @param: id       模板id 
        @function: mac.jd.com/qualificationTemplateUserRelation/{id}
        wiki: http://cf.jd.com/pages/viewpage.action?pageId=104131144
    */
    deleteTemplate(id) {
        let paramObj = {
            id: id
        }
        return xhr({
            method: 'post',
            url: rootPathBj + '/qualificationTemplateUserRelation/' + JSON.stringify(id),
            mockUrl: '/mc/qualificationTemplateUserRelation/' + JSON.stringify(id),
            body: paramObj
        })
    }

    /*
        通过区块id获取资质设置信息
        @method:    POST
        functionID: mac.jd.com/qualification/baseinfo
        wiki:       http://cf.jd.com/pages/viewpage.action?pageId=104122408
    */
    getCredentData() {
        let defaultParam = {
            source: 2
        }
        return xhr({
            method: 'post',
            url: rootPathBj + '/qualification/baseinfo',
            mockUrl: '/mc/qualification/baseinfo',
            body: defaultParam
        })
    }

    /*
        保存资质设置信息
        @method:     POST
        functionID： mac.jd.com/qualificationTemplateUserRelation/update
        wiki:        http://cf.jd.com/pages/viewpage.action?pageId=104125279
    */
    updateCredentData(paramObj) {
        var defaultParam = {
            qualificationTemplateReq: paramObj
        }
        return xhr({
            method: 'post',
            url: rootPathBj + '/qualificationTemplateUserRelation/update',
            // mockUrl: '/mc/qualificationTemplateUserRelation/update',
            body: defaultParam
        })
    }

    /*
        根据条件分页获取活动信息
        @method: post
        @function: mac.jd.com/activity/manage/page
    */
    getActiveListData(paramObj) {
        return xhr({
            method: 'post',
            url: rootPathBj + '/activity/manage/page',
            body: paramObj
        })
    }

    /*
        根据条件分页获取区块信息
        @method：post
        @function: mac.jd.com/area/manage/page
    */
    getBlockListData(paramObj) {
        return xhr({
            method: 'post',
            url: rootPathBj + '/area/manage/page',
            body: paramObj
        })
    }

    /*
        批量获取区块的资源比率信息和资质复用出查询区块列表信息
        @method：post
        @function: mac.jd.com/area/batquery/resource/ratio
        @wiki: http://cf.jd.com/pages/viewpage.action?pageId=96692503
    */
    getResourceRatio(paramObj) {
        return xhr({
            method: 'post',
            url: rootPathBj + '/area/batquery/resource/ratio',
            mockUrl: '/mc/area/batquery/resource/ratio',
            body: paramObj
        })
    }
}

export default new aptitudeSettingService();