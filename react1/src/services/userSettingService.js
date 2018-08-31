import xhr from './xhr';
import { rootPath, rootPathCore, rootPathBj } from './xhr/config';
import util from 'LIBS/util';
/*
 *用户设置相关请求api
*/
class UserSettingService {
	/*
	用户设置-消息设置-京东秒杀
	@method: post
	@functionID: mac.jd.com/view/userSetting/msgsetting/secondkill
	*/
	getMessageList(paramObj) {
		return xhr({
			method: 'post',
			url: rootPathBj + '/message/list',
			localUrl: '/data/userSetting.json',
			body: paramObj
		})
	}

	/*
	用户设置-消息设置-京东秒杀
	@method: post
	@functionID: mac.jd.com/view/userSetting/msgsetting/secondkill
	*/
	saveMessageSetting(paramObj) {
		return xhr({
			method: 'post',
			url: rootPathBj + '/message/create',
			localUrl: '/data/userSetting.json',
			body: paramObj
		})
	}

	/*
	 *用户设置-常用联系人: 根据分页获取常用联系人列表
	 *@param {Integer}       query.contactsType       常用联系人类型（1:ERP 2:部门ID 3:商家） 非必须
	 *@param {String}        query.name               常用联系人分组名称                      非必须
	 *@param {int}           query.page               页码                                    必须
	 *@param {int}           query.pageSize           内容                                    必须
	 *@result {Object[]}
	 *@functionID: mac.jd.com/view/userSetting/msgsetting/topcontract
	*/
	getContactsPage(paramObj) {
		return xhr({
			method: 'post',
			url: rootPathBj + '/contacts/page',
			localUrl:'/data/userSettingList.json',
			body: paramObj
		})
	}

	/*
	 *用户设置-常用联系人：根据ID获取常用联系人详细信息
     *@param {Integer}      id
     *result {}
	 *@functionID: mac.jd.com/view/userSetting/msgsetting/topcontract 
	*/
	getDetailInfo(paramObj) {
		return xhr({
			method: 'get',
			url: rootPathBj + '/contacts/detail/' + JSON.stringify(paramObj)
		})
	}

	/*
	 *用户设置-常用联系人: 更新常用联系人信息
	 *@param {Long}         query.id             常用联系人ID
	 *@param {String}       query.contacts       常用联系人列表 
	 *@param {integer}      query.Integer        常用联系人类型
	 *@param {name}         query.name           常用联系人分组名称 
	 *@functionID: mac.jd.com/view/userSetting/msgsetting/topcontract 
	*/
	updateContactsInfo(paramObj) {
		return xhr({
			method: 'post',
			url: rootPathBj + '/contacts/update',
			body: paramObj
		})
	}

	/*
	 *用户设置-常用联系人: 批量新增常用联系人
	 *@param {String}       query.contacts         常用联系人列表
	 *@param {integer}      query.contactsType     常用联系人类型（1:ERP 2:部门 3:商家）
	 *@param {String}       query.name             常用联系人分组名称                        
	 *@functionID: mac.jd.com/view/userSetting/msgsetting/topcontract
	*/
	createContacts(paramObj) {
		var str = JSON.stringify([paramObj]);
		return xhr({
			method: 'post',
			url: rootPathBj + '/contacts/multi/create',
			body: {multiContactsData: str}
		})
	}

	/*
	 *用户设置-常用联系人: 批量删除常用联系人
	 *@param {List}       query.contactsId      常用联系人ID列表                       
	 *@functionID: mac.jd.com/view/userSetting/msgsetting/topcontract
	*/
	deleteContacts(paramObj) {
		var str = JSON.stringify(paramObj);
		return xhr({
			method: 'post',
			url: rootPathBj + '/contacts/multi/delete',
			body: {contactsIdList: str}
		})
	}

	/*
	 *用户设置-常用联系人: 商家id的有效性和重复性校验
	 *@param    1、contacts：商家id，以逗号隔开
				2、contactsType：常用联系人类型                    
	 *@functionID: http://cf.jd.com/pages/viewpage.action?pageId=97633801
	*/
	validateVenderId(paramObj) {
		return xhr({
			method: 'post',
			url: rootPathBj + '/contacts/validateVenderIdValidate',
			body: paramObj
		})
	}

	/*
	用户设置-消息设置-新提报活动
	@method: post
	@functionID: http://cf.jd.com/pages/viewpage.action?pageId=98339877
	*/
	getNewMsgList() {
		return xhr({
			method: 'post',
			url: rootPathBj + '/message/new/list',
		})
	}

	/*
	用户设置-消息设置-保存新提报活动消息
	@method: post
	@functionID: http://cf.jd.com/pages/viewpage.action?pageId=98339877
	*/
	saveNewMsgSetting(paramObj) {
		return xhr({
			method: 'post',
			url: rootPathBj + '/message/new/create',
			body: paramObj
		})
	}
}

export default new UserSettingService();