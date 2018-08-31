import activeListService from "SERVICES/activeListService";
import util from './util';
let base = {
    pageTitle: '京东营销活动中心',
    pageWidth: 1260, //页面内容宽度
    tableWidth: 1210, //表格宽度
    menuIndexTep: {
        "0": 10,
        "1": 9
    },
    defaultImgUrl: "//m.360buyimg.com/cms/jfs/t2218/111/2490744834/43/9acceab1/56d55ce6N5a567661.gif",
    statusOpt: [{
        cls: 'status-before',
        title: '未审核',
        synTitle: '未同步'
    }, {
        cls: 'status-on',
        title: '审核中',
        synTitle: '同步中'
    }, {
        cls: 'status-success',
        title: '已通过',
        synTitle: '同步成功'
    }, {
        cls: 'status-fail',
        title: '被驳回',
        subTitle: {
            1: '已驳回',
            2: '被驳回',
        },
        synTitle: '同步失败'
    }, {
        cls: 'status-quit',
        title: '已退出',
        synTitle: '素材下线'
    }, {
        cls: 'status-wait',
        title: '',
        synTitle: '待推送'
    }, {
        cls: 'status-fail',
        title: '',
        synTitle: '已删除'
    }, ],
    applyStatus: [{
        cls: "apply-valide",
        status: "有效"
    }, {
        cls: "apply-valide",
        status: "可换品"
    }, {
        cls: "apply-valide",
        status: "换品中"
    }, {
        cls: "apply-valide",
        status: "换品退出"
    }],
    whitelistStatusOpt: {
        "0": {
            status: "生效中"
        },
        "1": {
            status: "已失效"
        }
    },
    prompStatus: {
        "0": {
            status: "未生效"
        },
        "1": {
            status: "已生效"
        }
    },
    pageOperateWay: {
        'activeManage': {
            '0': {
                title: "创建活动",
                buttonText: "创建活动"
            },
            '1': {
                title: "活动设置",
                buttonText: '保存设置'
            }
        },
        ' batch': {
            '0': {
                title: "批次列表",
                buttonText: ""
            },
            '1': {
                title: "批次设置",
                buttonText: ''
            }
        }
    },
    activeStatus: {
        "-1": {
            text: "已结束",
            class: "outdate"
        },
        "0": {
            text: "未开始",
            class: "notbegin"
        },
        "1": {
            text: "报名中",
            class: "ing"
        }
    },
    emptyTableTips: {
        "activeManage": {
            check: "您还未创建任何活动,赶快去新建吧~",
            filter: "无相关活动~"
        },
        "validBatch": {
            check: "您被分配的批次均已过期，请查看其它活动~",
            filter: "无相关批次~"
        },
        "batch": {
            check: "您还未创建批次,赶快去新建批次吧~",
            filter: "无相关批次~"
        }, //已报名活动管理列表
        "enrollActive": {
            check: "您没有报名活动，敬请关注~",
            filter: "无相关内容~"
        }, //已报名管理列表
        "enrollManage": {
            check: "您没有已报名列表，敬请关注~",
            filter: "无相关内容~"
        }, // 待审核、资源审核中间人审核列表提示文案
        "precheckManage": {
            check: "您还没有待审核素材,敬请关注~",
            filter: "无相关内容~"
        },
        "precheckMyManage": {
            check: "您还没有待审核素材,敬请关注~",
            filter: "无相关内容~"
        },
        "precheckOtherManage": {
            check: "没有待他人审核素材,敬请关注~",
            filter: "无相关内容~"
        },
        "block": {
            check: "您还未创建任何区块,赶快去新建吧~",
            filter: "无相关内容~"
        },
        "userSet": {
            check: "您没有添加常用联系人，赶快去添加吧~",
            filter: "无相关内容~"
        },
        "resouceTemplate": {
            check: "您没有添加设置资质模板，赶快去设置吧",
            filter: "无相关内容~"
        },
        "whitelistTemplate": {
            check: "您没有添加任何商品,赶快去添加吧",
            filter: "无相关内容~"
        }
    },
    promoStatus: {
        0: '未建立',
        1: '审核中', 
        2: '建立成功',
        3: '建立失败',
        4: '促销系统驳回',
        5: '促销系统删除',
        6: '已失效',
        7: '促销已暂停', 
        8: '促销需人工审核',
        9: '审核通过'
    },
    promoLimit: {
        1: '该促销不与套餐叠加',
        0: '无限制'
    },
    promoLimitType: {
        0: '不限',
        1: '限每账号仅购买购买一次 限PC/APP分别最多一次',
        2: '限PC/APP分别最多一次',
        3: '限每账号仅购买购买一次'
    },
    templateType: {
        "0":"默认",
        "1":"商品",
        "2":"广告",
        "3":"促销",
        "4":"拼购",
        "5":"其他",
        "6":"优惠券",
        "7": "自建促销",
    },
    bookTemplate:['SYSTEM_FULL_AMOUNT_TEMPLATE', 'SYSTEM_MIX_AMOUNT_TEMPLATE','SYSTEM_FULL_MONTH_TEMPLATE'],
    vcCodeList: ["SYSTEM_WARE_TEMPLATE", "SYSTEM_CUSTOMIZED_WARE", "SYSTEM_BABEL_AD_TEMPLATE", "SYSTEM_BABEL_GROUP_TEMPLATE"],
    getBreadType(entry) {
        var breadTotalType = {
                "0": "manage",
                "1": "join"
            },
            type;
        type = breadTotalType[entry] || 'manage';
        return type;
    }, //空表格筛选文字设置
    emptyTableDefaultShow(env, initSign) {
        var emptyTableShow = this.emptyTableTips[env];
        if (initSign) {
            return this.showEmptyStatus(emptyTableShow['check']);
        } else {
            return this.showEmptyStatus(emptyTableShow['filter']);
        }
    },
    // 表格空数据自定义提示
    showEmptyStatus(text) {
        return `<div class="table-empty-wrap">
                    <i class ="icon"></i>
                    <span class ="text">
                        ${text}
                    </span>
                </div>`;
    },
    checkDouToSin(str) {
        if(!str) return '';
        return str.replace(/\"/g, '&quot;');
    },
    renderApplyData(data, type, templateType) { //1-商品、2-广告、3-促销
        var paramObj = {
            promId: '',
            tryoutName:'',
            tryoutId:'',
            activeUrl: '',
            skuId: '',
            shopName: '',
            productName: '',
            imgUrl: '',
            pinGoId: '',
            adName: '',
            sharedCopy: '',
            adTitle: '',
            adTime: '',
            shopList: ''
        }
        var appliedDataPOInfo = data;
        switch (type) {
            case "1": //商品
            case '7': //单品促销
                paramObj.imgUrl = appliedDataPOInfo.skuImg;
                paramObj.skuId = appliedDataPOInfo.skuId;
                paramObj.productName = base.checkDouToSin(appliedDataPOInfo.skuName);
                break;
            case "2": // 广告
                if (templateType == 27) {
                    paramObj.tryoutName = base.checkDouToSin(appliedDataPOInfo.adTitle) || '';
                    paramObj.tryoutId = appliedDataPOInfo.tryId || '';
                    paramObj.imgUrl = appliedDataPOInfo.picUrl;
                } else if(templateType == 33) { // 京豆计划
                    let temp = {
                        id: appliedDataPOInfo.beanPlanId || '',
                        name: appliedDataPOInfo.beanPlanName || ''
                    }; 
                    paramObj.beanInfo = appliedDataPOInfo ? temp : null;
                    paramObj.imgUrl = '';
                }else {
                    paramObj.imgUrl = appliedDataPOInfo.picUrl;
                    paramObj.activeUrl = appliedDataPOInfo.adUrl || this.getShopItemUrl(appliedDataPOInfo.shopId);
                    paramObj.skuList = this.isJson(appliedDataPOInfo.skuList) ? JSON.parse(appliedDataPOInfo.skuList) : "";
                    paramObj.adTime = appliedDataPOInfo.adTime;
                    paramObj.shopList = appliedDataPOInfo.shopList;
                    if(!paramObj.activeUrl) {
                        // 品类模板
                        paramObj.adName = base.checkDouToSin(appliedDataPOInfo.adName);
                        paramObj.sharedCopy = appliedDataPOInfo.sharedCopy;
                        paramObj.adTitle = base.checkDouToSin(appliedDataPOInfo.adTitle) || '';
                    }
                   
                }
                break;
            case "3": // 促销
                paramObj.imgUrl = appliedDataPOInfo.skuImg;
                paramObj.promId = appliedDataPOInfo.promoId;
                paramObj.productName = appliedDataPOInfo.skuName;
                break;
            case "4": //拼购
                paramObj.imgUrl = appliedDataPOInfo.skuImg;
                paramObj.pinGoId = appliedDataPOInfo.pinGoId;
                paramObj.skuId = appliedDataPOInfo.skuId;
                paramObj.productName = appliedDataPOInfo.skuName;
                break;
            case "6": //优惠券
            let [couponIdProp, logoImage] =['couponId', 'logoImage']
                switch(templateType) {
                    case 32: 
                    [couponIdProp, logoImage] =['financeCouponId', 'picUrl']
                        break;
                    default: 
                        break;
                } 
                paramObj.couponId = appliedDataPOInfo[couponIdProp] || "";
                paramObj.logoImage = appliedDataPOInfo[logoImage] || "";
                appliedDataPOInfo.skuList ? (paramObj.skuList =  this.isJson(appliedDataPOInfo.skuList) ? JSON.parse(appliedDataPOInfo.skuList) : "") : -1;
                break;
            default:
                break;
        }
        return paramObj;
    },
    /**
     *
     * @param region 小图的区域位置
     * @param offset 大图相对于小图的偏移
     * @param bigImageSize 大图的宽高
     * @param contentOffset 大图展示父区域的位置
     * @returns {*}
     */
    setBigImagePos(region, offset, bigImageSize, contentOffset) {
        let maxImageWidth = 500;
        let dH = bigImageSize ? bigImageSize.height : 200,
            dW = bigImageSize ? bigImageSize.width : 400;
        let winW = window.innerWidth || document.body.clientWidth,
            winH = window.innerHeight || document.body.clientHeight;
        contentOffset = contentOffset || {
            top: 0,
            left: 0,
        };
        offset = offset || {
            left: 0,
            top: 0
        }
        if (dW > maxImageWidth) { // 如果图片宽度大于500，按照比例缩放图片
            dH = (maxImageWidth * dH) / dW;
            dW = maxImageWidth;
        }
        let top, left, styleImgInline;
        top = parseInt(region.top - contentOffset.top); // 计算相对于父元素的top
        left = parseInt(region.right - contentOffset.left + offset.left); // 计算相对于父元素的left
        var posBottom = (region.top + offset.top) > (winH - dH), // 判断展示区域的高度是否大于屏幕的高度
            posRight = (region.right + offset.left) > (winW - dW); // 判断展示区域的宽度是否大于屏幕的宽度
        if (posBottom) {
            top = region.bottom - offset.top - dH - contentOffset.top; // 计算相对于content的top值
            if (top < 0) { // 如果top值小于0，top值应该等于父元素的top值的相对值 + 文字区域高度
                top = -contentOffset.top + 36;
            }
        }
        if (posRight) {
            left = region.left - offset.left - dW - contentOffset.left; // 计算相对于content的left值
        }
        styleImgInline = {
            display: 'block',
            top: `${top}px`,
            left: `${left}px`,
            width: `${dW}px`,
            height: `${dH}px`
        };
        return styleImgInline
    },
    setTreePos(region, pos) {
        var returnObj = {};
        var left = parseInt(region.left) - pos.left + 16,
            top = parseInt(region.top) - pos.top + 38,
            styleImgInline = {
                top: `${top}px`,
                left: `${left}px`,
            }
        return styleImgInline
    },
    showDataMsg(msgFun, data, type) {
        switch (type) {
            case 'success':
                msgFun.success(data.message);
                break;
            default:
                msgFun.error(data.message);
                break;
        }
    },
    trimBlank(str) {
        if(!str) return '';
        let reg = new RegExp(/^\s*|\s*$/, 'g');
        return str.replace(reg, '');
    },
    // 去除参数里两边空格
    trimObjBlank(obj) {
        let t = {};
        let item ='';
        for(let p in obj) {
            item = obj[p];
            if(item && typeof item == 'string') {
                item = base.trimBlank(item);
            }
            t[p] = item;
        }
        return t;
    },   
    //匹配规则
    ruleMap: {
        required: {
            title: '不能为空'
        },
        minLength: {
            key: 'min',
            title: '最少',
            unit: '个字符'
        },
        maxLength: {
            key: 'max',
            title: '最多',
            unit: '个字符'
        },
        minValue: {
            //key: 'min',
            title: '最小值'
        },
        maxValue: {
            //key: 'pattern',
            title: '最大值'
        },
        maxRows: { //商品集
            title: '最大个数'
        },
        //图片
        imgWidth: {
            title: '宽',
            unit: 'px'
        },
        imgHeight: {
            title: '高',
            unit: 'px'
        },
        imgMaxHeight: {
            title: '最大高',
            unit: 'px'
        },
        imgSize: {
            title: '大小不超过',
            unit: 'kb'
        },
        regex: {
            key: 'regexp',
            // title: '匹配正则表达式',
            title: {
                "": '不限',
                "\\S*": '不限',
                "^(http://|https://)(.)*": "要求以http://或https://开头",
                "(.)*(jd.com|jd.hk)(.)*": "要求包含jd.com或jd.hk",
                "^https://sale.jd.com/act/(.)*": 'jshop PC活动链接，要求以https://sale.jd.com/act/开头（即仅可提报PC活动链接）',
                "^https://sale.jd.com/(app|m|wq)/act/(.)*": 'jshop 移动端活动链接，要求以https://sale.jd.com/(app|m|wq)/act/开头',
                "/^[a-z]+$/": '必须全部英文',
                "^(https://pro.m.jd.com|https://shop.m.jd.com|http://sale.jd.com/(app|m|wq)/act|https://sale.jd.com/(app|m|wq)/act)(.)*": '移动端链接，要求以https://pro.m.jd或shop.m.jd、http(s)://sale.jd.com/(app|m|wq)/act开头',
                "BABEL_URL_CHECK": "要求为通天塔链接",
                "^(https://sale.jd.com/act/|https://pro.jd.com/mall/active/[a-zA-Z0-9]+/index.html)(.)*": '要求以https://sale.jd.com/act 或https://pro.jd.com/mall/active/活动ID/index.html 开头'
            }
        },
        betweenTime: {
            title: "批次时间段之内"
        },
        minSum: {
            title: '最小个数',
            unit: '个'
        },
        maxSum: {
            title: '最大个数',
            unit: '个'
        },
        maxSelect: {
            title: '多尺寸选',
            unit: '个'
        },
        skuMaxSize: {
            title: '商品集最大个数',
            unit: '个'
        },
        skuMinSize: {
            title: '商品集最小个数',
            unit: '个'
        },
        int: {
            title: '类型为'
        },
        float: {
            title: '类型为'
        },
        fileExtension: {
            title: '文件类型为'
        },
        promoMaxSize: {
            title: '促销编码集最大个数',
            unit: '个'
        },
        promoMinSize: {
            title: '促销编码集最小个数',
            unit: '个'
        },
        requiredOne: {
            title: '至少填写一个'
        }
    },
    hourCoupon: ['', '', '小时券'], //普通券不展示
    couponType: ['京券', '东券', '免运费券'],
    canNotChangeTemplateCode: [''], // SYSTEM_SHOP_TEMPLATE
     //5.0 增加自定义单选项  获取字段规则字符串
     getCustomerRadioStr(optionName,optionList,curRuleType,str){
        let lll = optionList.length;
        if (lll > 0) {	//itemOptionVOList 选项不为空的时候操作处理
            optionName  = optionName + '为';
            var options= str? '，'+optionName : optionName;
            let nameArr = [],optionStr = '';
            // optionName  = optionName + '为';
            // var options= str? '，'+optionName : optionName;
            for(var j=0; j<lll; j++){
                nameArr.push(optionList[j].optionText);
            }
            options+=nameArr.join('、');
            str+=options;
        }
        // if(lll<= 0 && curRuleType == 34){//自定义单选项  单选项数目为0时的 字段规则
        //     let tip ="输入文本，以英文逗号分隔可设置为单选项";
        //     let customerOptions= str? '，'+ tip : tip;
        //     str+=customerOptions;
        // }
        return str;
    },
    getRuleMsgStr(itemData) {
        let map = base.ruleMap[itemData.ruleCode];
        if (!map || (!itemData.ruleValue && !itemData.ruleCode.match(/img|regex/))) { //内容空-图片/链接
            return '';
        }
        let mapTitle = map.title;
        let unit = map.unit || "";
        let str = mapTitle + itemData.ruleValue;
        if (unit) {
            str += unit;
        }
        //是否必填项
        if (itemData.ruleCode == 'required') {
            str = itemData.ruleValue == "true" ? mapTitle : '';
        }
        //正则表达式
        if (itemData.ruleCode == 'regex') {
            str = mapTitle[itemData.ruleValue];
        }
        //图片尺寸-宽、高、最大高
        if (itemData.ruleCode == 'imgWidth' || itemData.ruleCode == 'imgHeight' || itemData.ruleCode == 'imgMaxHeight') {
            let value = itemData.ruleValue;
            value = value ? value + unit : '不限';
            str = mapTitle + value;
        }
        //图片大小-2048kb限制
        if (itemData.ruleCode == 'imgSize') {
            let value = itemData.ruleValue;
            value = value ? value : 2048;
            str = mapTitle + value + unit;
        }
        return str;
    },
    getRulesStr(arr, filterKey) {
        let item, str, strArr = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            item = arr[i];
            str = base.getRuleMsgStr(item);
            if (item.ruleCode == filterKey || !str) {
                continue;
            }
            strArr.push(str);
        }
        return strArr.join('，')
    },
    /*商品详情*/
    getPdItemUrl(sku) {
        if (!sku) {
            return '';
        }
        return 'https://item.jd.com/' + sku + '.html';
    },
    /*试用id名称链接 */
    getTryInfoUrl(tryId){
        if(!tryId) {
            return '';
        }
        return 'https://try.jd.com/' +  tryId + '.html';
    },
    /*店铺详情*/
    getShopItemUrl(shopId) {
        if (!shopId) {
            return '';
        }
        return 'https://mall.jd.com/index-' + shopId + '.html';
    },
    /*资讯详情*/
    getArticleUrl(articleId) {
        if (!articleId) {
            return 'javascript:;'
        }
        return `http://h5.m.jd.com/active/faxian/html/innerpage.html?id=${articleId}`;
    },
    getPriceDiscount(normal, sale) {
        if (!normal || normal <= 0) {
            return ""
        }
        let discount = Math.round((sale / normal) * 100);
        discount = discount / 10;
        if (isNaN(discount) || discount < 0) {
            discount = '';
        }
        return discount;
    },
    getJdPrice(price) {
        let jdPrice = price;
        if (isNaN(price) || price == null || !price) {
            jdPrice = '暂无数据';
        } else {
            jdPrice = '￥' + price;
        }
        return jdPrice
    },
    //判断日历当前日期之前的时间是否可选
    checkDisabledTime(date, time) {
        var timeDif = time != undefined ? time : 24 * 60 * 60 * 1000;
        return date && date.valueOf() < Date.now() - timeDif;
    },
    converObjectToStringForTemplate(data) {
        var dataToJson = JSON.stringify(data),
            strReconByTemplate = dataToJson.replace(/\"/g, "\'");

        return strReconByTemplate;
    },
    convertOjectToPrototype(data) {
        let str;
        if (data && typeof data == "string") {
            str = data.replace(/\'/g, "\"");
        } else {
            return "";
        }
        return JSON.parse(str);
    },
    isJson(str) {
        if (typeof str == 'string') {
            try {
                let tmp = JSON.parse(str);
                return true;
            } catch (e) {
                return false;
            }
        }
    },
    dataTranverse: (obj, key) => {
        key = key || "";
        const result = [];
        for (let prop in obj) {
            const value = obj[prop];
            if (typeof value === 'object') {
                result.push.apply(result, this.dataTranverse(value, key + "[" + prop + "]"))
            } else {
                result.push({ name: key ? key + "[" + prop + "]" : prop, value: value })
            }
        }
        return result;
    },
    exportCheckInfo(url, exportParamObj, msgFun) {
        var defaultParam = exportParamObj;
        // var url =rootPathBj+'/check/export';
        // 首先创建一个name为“__iframe_downloader__”的隐藏的iframe标签，防止页面跳出
        const iframeName = "__iframe_downloader__";
        var iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.name = iframeName;
        document.body.appendChild(iframe);
        var form = document.createElement("form"); //定义一个form表单
        form.method = 'post';
        form.action = url;
        form.target = iframeName;
        // 通过form发送json数据请参考  https://darobin.github.io/formic/specs/json/    
        const inputs = document.createDocumentFragment();
        const fields = this.dataTranverse(defaultParam);
        fields.forEach(field => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = field.name;
            input.value = field.value;
            inputs.appendChild(input);
        });
        form.appendChild(inputs);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        iframe.onload = (e) => {
            this.showDataMsg(msgFun, {message:"文件下载失败！"});
            document.body.removeChild(iframe);
        }
    },
    getEfficacyPath(pathUrl) {
        let localHost = window.location.host,
            pathReg = /localhost/g;
        let url = 'javascript:;'
        url = util.getPathUrl(pathUrl);
        if (!pathReg.test(localHost)) {
            url = url.replace(/\/dist[A-Za-z]*\//, '/distEfficacy/')
        } else {
            url = 'http://localhost:6080' + url;
        }
        return url;
    },
    //上报-接口请求结束-所需时间
    /*
        point21: 首页三个接口，分别请求所需时间
        point22: 首页三个接口，调用node合并接口请求所需时间
     */
    reportEndTime(jdProfiler, pointN, showTimeStart) {
        let endTime = new Date().getTime();
        let offsetTime = endTime - showTimeStart;
        //
        let jdProfilerObj = {};
        jdProfilerObj[pointN] = offsetTime;
        jdProfiler.add(jdProfilerObj);
        //report
        jdProfiler.report();

        // console.log('请求+渲染时间：'+ offsetTime);
    },
    checkNodeEnv(envConfig) {
        let hasNode = util.getQueryString(envConfig);
        return hasNode == 1;
    },
    /*
        检验动态表单图片字段是否为空
    */
    checkPicField(ruleList, styleId, styleType) {
        var itemRule, count = 0 ,
            fieldRuleList = {
                "minLength": "最小长度",
                "maxLength": "最大长度",
                "minValue": "最小值",
                "maxValue": "最大值",
                "maxRows": "最大行",
                "imgWidth": "图片宽",
                "imgHeight": "图片高",
                "imgMaxHeight": "图片最大高",
                "imgSize": "图片大小(KB)",
                "regex": "正则表达式",
                "minSum": "最小个数",
                "maxSum": "最大个数",
                "betweenTime": "批次时间段之内",
                "skuMaxSize": "SKU集最大个数",
                "skuMinSize": "SKU集最小个数",
                "fileExtension": "文件类型"
            };
        for (var i = 0; i < ruleList.length; i++) {
            itemRule = ruleList[i];
            if (fieldRuleList[itemRule.ruleCode]) {
                if (itemRule.ruleCode != 'imgHeight' && styleId == 15 && !itemRule.ruleValue) {
                    count++;
                } else if (itemRule.ruleCode != "imgMaxHeight" && styleId != 15 && styleType == '1' && !itemRule.ruleValue) {
                    count++;
                } else if (itemRule.ruleCode != 'imgMaxHeight' && styleType != '1' && !itemRule.ruleValue) {
                    count++;
                } else if ((itemRule.ruleCode == 'imgHeight' || itemRule.ruleCode == 'imgWidth') && styleId == 71 && styleType == '1' && (parseInt(itemRule.ruleValue)%3!=0 )){
                    count++;
                }
            }
        }
        return count;
    },
    // 获取数组中重复的元素
    getRepeatList(list) {
        let arr = [],
            obj = {};
        list.forEach(function(item) {
            if (obj[item] == item) {
                arr.push(item)
            } else {
                obj[item] = item;
            }
        });
        arr = Array.from(new Set(arr));
        return arr;
    },
    checkDomAttr(dom, attr) {
        let attrValue = window.getComputedStyle ? window.getComputedStyle(dom, false)[attr] : dom.currentStyle[attr];
        return attrValue;
    },
    // 滚动浏览器，固定表头
    checkCurrentPageScroll(tableDom, domHeader,rightDom, rightHeader, type){
        let initRectPos, rightRectPos;
        let self = this;
        let domWidth = tableDom.clientWidth || tableDom.offsetWidth;
        let rightWidth = rightDom ? rightDom.clientWidth || rightDom.offsetWidth : 0;
        window.onscroll = function() {
            initRectPos = tableDom.getBoundingClientRect();
            rightRectPos = rightDom ? rightDom.getBoundingClientRect() : {};
            let positionValue = self.checkDomAttr(domHeader, 'position');
            let x = initRectPos.x;
            if(initRectPos.top <= 25){
                if(type) {
                    rightHeader.style = `position:fixed;top: 2px; left: ${rightRectPos.x}px;z-index:999;width:${rightWidth}px;`;
                } 
                domHeader.style = `position:fixed;top: 2px; left: ${x}px;z-index:100;width:${domWidth}px;overflow: hidden;`;
                
            } else if(initRectPos.top > 50){
                if(positionValue == 'fixed') {
                    domHeader.style = '';
                    if(type) {
                        rightHeader.style = '';
                    }
                }
            }
        }
    },
    // 埋点：页面 pv uv
    eventTrack() {
        let ja = document.createElement('script');
        ja.type = 'text/javascript';
        ja.text = `
            var jaq = jaq || [];
            jaq.push(['account', 'JA2017_112683']); // 站点编号
            jaq.push(['domain', 'jd.com']); // 站点域名
            jaq.push(['erp_account']);
            (function() {
                var  ja = document.createElement('script');
                ja.type = 'text/javascript';
                ja.async = true;
                ja.src = '//wl.jd.com/joya.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ja, s);
            })();
        `
        let body = document.getElementsByTagName('body')[0];
        body.appendChild(ja);
    },
    // 双重解码
    decodeURICom(key) {
        let keyValue = decodeURIComponent(decodeURIComponent(key))
        return keyValue.replace(/\\/g, '');
    },
    // 双重编码
    encodeURICom(key) {
        return encodeURIComponent(encodeURIComponent(key));
    },
    removeData(data, item) {
        let i = data.indexOf(item);
        data.splice(i, 1);
    },
    // 二叉树深度遍历
    deepTraversal(node){
        let nodes=[];
        if(node!=null){
            nodes.push(node);
            let childrens=node.children;
            for(let i=0;i<childrens.length;i++){
                childrens[i].key = `${node.key}.${i}`
                this.deepTraversal(childrens[i]);
            }
                
        }
        return nodes;
    },
};

export default base;