/**
 * Created by aresn on 16/7/18.
 img 域名头

 */
let util = {

};
util.alert = function(content) {
    window.alert(content);
};

util = {
	checkEmptyObject(object){
		let  flag = true;
		for(var n in object){
			if(typeof n != 'undefined'){
				flag = false;
			}
		}
		return flag;
	},
	getPathUrl: function(url){
		if(url.match('http')){
           return url; 
        }
		let localUrl = window.location.href;
        localUrl = localUrl.replace(window.location.protocol+'//','');
        let path = localUrl.split('\/');
        if(path.length>2){
            path = localUrl.match('dist') ? path[1]+'/'+path[2] : path[1];
            path = '/'+path+'/';
        }else{
            path = '/';
        }
        if(url.indexOf('?')<0){
            url = url == 'index' ? '' : url+'/';
        }
        url = path + url;
        return url;
        
	},
    goLoginPage: function(returnUrl){
        var url = this.getPathUrl('login');
        window.location.href = returnUrl? url + returnUrl : url;
    },
    loginByErp(url, type){
        let returnUrl = encodeURIComponent(url || ''),
        sscUrlHead = '//ssa.jd.com/sso/login?ReturnUrl=';
        if(type == 'public'){
            sscUrlHead = '//autherp.jd.com/?returnUrl=';
        }
        if(type == 'vender'){
            sscUrlHead = '//passport.jd.com/new/login.aspx?ReturnUrl=';
        }
        window.location.href = sscUrlHead + returnUrl;
    },
    // 带中文参数的
    getUrlParam :(name) => {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]); return null;
    },
    getQueryString:function(name){
        var me = this;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return "";
    },
    checkAjaxCallbackCode: function(data, msgFun){
        var sign = false;
        var returnUrl = "?returnUrl="+window.location.href;
        if(data.code == '0'){
            sign = true;
        }else{
            if(data.code == '3'){//未登录
                this.goLoginPage(returnUrl);
            }else{
                msgFun.info(data.msg,2);
            }
        }
        return sign;
    },
    //北京端后台
    checkAjaxSuccess: function(data, msgFun){
        var sign = false;
        if(data.isSuccess==true && data.code == '00000'){
            sign = true;
        }else{
             msgFun.info({
                 content: data.message,
                 duration: 2
             });
        }
        return sign;
    },
    getRequesString: function(data){
        var str = '';
        for(let item in data){
            str += item+'='+data[item]+'&';
        }
        str = str.substr(0, str.length-1);
        return str;
    },
    randomFun(min,max){
        return Math.round(Math.random()*(max-min)+min)
    },
    getImgUrl: function(url){
        var url = url.replace(/^\s+/g,"");
        // 添加.dpg后缀压缩处理，提升图片资源加载速度
        if (/\.jpg$/.test(url)) {
            url = url+'.dpg';
        }
        var imgHead = [
            '//img11.360buyimg.com/applylogo/',
            '//img12.360buyimg.com/applylogo/',
            '//img13.360buyimg.com/applylogo/',
            '//img14.360buyimg.com/applylogo/',
            '//img20.360buyimg.com/applylogo/',
            '//img30.360buyimg.com/applylogo/'],
            index = 0,
            len = imgHead.length;
        index = this.randomFun(0,len-1);
        var urlHead = imgHead[index];
        return urlHead+url;
    },
    /*
        case: 0: ** ,
              1: **,
    */
    getActivityJumpUrl(type, activityId){
        var url = '';
        switch(type){
            case 1:
            case 4: url = '//hd.jd.com/apply/detail_showColumns.action?activity.id='+activityId+'from=actApply'; break;
            case 5: url = '//hd.jd.com/bi/assign/resourceInit.action?activity.id='+activityId+'&from=actApply'; break;
        }
        return url;
    },
    //截取时间到分
    cutDate:function(time){
        
        if(typeof(time) != "string" || !time) return "";
        var timeArray = time.split(":");
        var l = timeArray.length;
        if(l>2) return timeArray[0]+':'+timeArray[1];
        return time;
    },
    formateCompateDate(date){
        if(date && typeof date == 'string'&&  date.indexOf("-")){
            let res  = date.replace(/-/g,'/');
            return res.replace(/\.\S*/,'');   
        }else if(typeof date === 'number'){
            return date;
        }
        return date;
    },
    /*options:{
     date: "",
     flag:false \ true 当为true时,时间精确到分，反之精确到秒
    } ""|String  默认格式化当前时间*/
    getFormatDate(options){
        let hasDate    = !options || !options.date;
        let formatDate = !hasDate ? this.formateCompateDate(options.date): -1; 
        var date = hasDate ? new Date() : new Date(formatDate);
        var flag = !!(options && options.flag);
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate(),
            strHour = date.getHours(),
            strMinutes = date.getMinutes(),
            strSeconds = date.getSeconds();
        strHour = strHour <= 9 ? "0"+strHour :strHour;
        strMinutes = strMinutes <= 9 ? "0"+strMinutes :strMinutes;
        strSeconds = strSeconds <= 9 ? "0"+strSeconds :strSeconds;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " +strHour + seperator2 + strMinutes + (flag ? "":seperator2 + strSeconds);
        return currentdate;
    },
    concatObject(defaultO,options){
        var defaultOptions = defaultO || {}
        for(var p in options){
            defaultOptions[p] = options[p]
        }
        return defaultOptions;
    },
    //根据时间判断活动状态
    getActiveStatus:function(beginTime,endTime,systemTime){
        /*
        status:0 未开始 
               1 进行中 
              -1 已失效
        */
        var status     = -1,
            systemTime = this.formateCompateDate(systemTime),
            beginTime  = this.formateCompateDate(beginTime),
            endTime    = this.formateCompateDate(endTime),
            nowDate    = new Date(systemTime),
            beginTime  = new Date(beginTime),
            endTime = new Date(endTime);
        status = (beginTime > nowDate ? 0 : (endTime >= nowDate ? 1 : -1))

        return status;
    },
    //封装活动管理组成员
    getUserList:function(headman,manager){
        var userList = [];
        // var headman = headman + ',';
        //var headList = headman ? headman.split(",") : [];
        var managerList = manager ? manager.split(",") : [];
        var l = managerList.length;
        // if(l<1) return userList;
        // for(var i=0;i<l;i++){
        //     if(headman.match(managerList[i]+',')){
        //         userList.push({
        //             isLeader:0,
        //             erp:managerList[i]
        //         });
        //     }
        //     else
        //         userList.push({
        //             isLeader:1,
        //             erp:managerList[i]
        //         });
        // }
        userList.push({
            isLeader:true,
            erp:headman
        })
        if(l>0){
            for(var item of managerList){
                userList.push({
                    isLeader:false,
                    erp:item
                })
            }
            
        }
        return userList;
    },
    /*获取dom相对窗口的坐标*/
    getPosition(el) {
      var xPosition = 0;
      var yPosition = 0;
      var width,height;

        while (el) {
            if (el.tagName == "body") {
              // deal with browser quirks with body/window/document and page scroll
              var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
              var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

              xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
              yPosition += (el.offsetTop - yScrollPos + el.clientTop);
            } else {
              xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
              yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
          }
          return {
            x: xPosition,
            y: yPosition
          };
    },
    stringTrim: function(str){ //删除左右两端的空格
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },//限制字符数
    strictStrNum:(str,num)=>{
        var remainLen = num;
        for(var i of str){
            if(/^[\u4E00-\u9FA5]+$/g.test(i)){
                remainLen -= 2;
            } else {
                remainLen --;
            }
        }
        if(remainLen < 0){
            return false;
        }
        return true;
    },
     //校验是否有中文逗号和空格
    checkStringBlank(string){
        var str = string;
        str = str.replace(/\n|，/g,',');
        str = str.replace(/\s/g, "");
        var arr = str.split(',');
        str = this.unique(arr);
        return str;
    },
    //去重
    unique(arr){
        var newArr = [];//新建一个数组
        for(var i=0,len=arr.length;i<len;i++){
            if(newArr.indexOf(arr[i]) == -1){//若新数组中未包含该项则将其存入新数组
             newArr.push(arr[i]);
         }
        }
        return newArr.join(',');
    },
    //判断对象是否相等
    isObjectValueEqual(a, b) {
        if(typeof a == 'number' && typeof b == 'number'){
            return a == b
        }
     
     
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
     
        if (aProps.length != bProps.length) {
            return false;
        }
     
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if(Object.prototype.toString(a[propName]) == '[Object Object]'||Object.prototype.toString(b[propName]) == '[Object Object]'){
                isObjectValueEqual(a[propName],b[propName])
            }
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    },
    //虚拟a标签打开新页面
    newWin(url) {
      var a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');
      a.setAttribute('id', 'newPage');
      // 防止反复添加
      if(!document.getElementById('newPage')) {                     
          document.body.appendChild(a);
      }
      a.click();
    },
    //对象数组的深拷贝
    objDeepCopy(source) {
        var sourceCopy = source instanceof Array ? [] : {};
        for (var item in source) {
            sourceCopy[item] = typeof source[item] === 'object' ? this.objDeepCopy(source[item]) : source[item];
        }
        return sourceCopy;
    },
    inputLoseBlur(){
        let inputArr = document.getElementsByClassName("ivu-input");
        for(let i=0,l=inputArr.length;i<l;i++){
            inputArr[i].blur();
        }
    },
    rangeRandom(max,min){
        let randomItem = Math.random();
        return Math.round(randomItem*(max-min)+min);
    },
    //首页cms后台下发路径 http、https兼容
    switchHttps(url){
        let re = /^[0-9]+.?[0-9]*$/;
        if(re.test(url)) return url;
        let protocol = window.location.protocol;
        let newUrl = url.replace('http:',protocol);
        return newUrl;
    }
}

export default util;