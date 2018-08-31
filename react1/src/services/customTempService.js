import xhr from './xhr/';
import { rootPath, rootPathCore, rootPathBj } from './xhr/config';
import util from 'LIBS/util';

/**
 * 自定义模板接口
*/

class CustomTempService {
	/*
		模板或字段类型查询接口
		@method: post 
		@function: mac.jd.com/formset/queryFormsetType
	*/
	queryFormsetType(param) {
		return xhr({
			method: 'post',
			url: rootPathBj+'/formset/queryFormsetType',
			body: {
				type:param
			}
		})
	}

	/*
		查询自定义模板列表
		@method: post 
		@function: mac.jd.com/formset/template/toSave
	*/
	queryCustomTemplate() {
		return xhr({
			method: 'post',
			url: rootPathBj + '/formset/cumstomtemplate/queryCustomTemplate'
		})
	}

	/*
		根据id查询模板详情
		@method: post
		@param: id       模板id 
		@function: mac.jd.com/formset/template/detail/{formSetTemplateId}
	*/
	getTemplateDetail(id) {
		return xhr({
			method: 'post',
			url: rootPathBj + '/formset/cumstomtemplate/detail/' + JSON.stringify(id)
		})
	}

	/*
		保存自定义模板
		@method: post 
		@param: 1. formSetTemplateReq				模板基本信息
				2. addFormItem						新增字段数组
				3. updateFormItem					更新字段入参集合
				4. deleteIds						删除字段入参集合
		@function: mac.jd.com/formset/template/save
	*/
	saveTemplate(paramObj) {
		return xhr({
			method: 'post',
			url: rootPathBj +'/formset/cumstomtemplate/save',
			body: paramObj
		})
	}

	/*
		自定义模板删除
		@method: post
		@param: id       模板id 
		@function: mac.jd.com/formset/template/delete/{id}
	*/
	deleteTemplate(id, formSetId) {
		return xhr({
			method: 'post',
			url: rootPathBj+'/formset/cumstomtemplate/delete/'+JSON.stringify(id)+'/'+JSON.stringify(formSetId)
		})
	}
}

// 实例化后导出
export default new CustomTempService();