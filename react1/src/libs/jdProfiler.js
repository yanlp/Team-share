/**
 * Created by Zeng Tong on 2016/2/24.
 */

// todo: 查看 navigationStart 没有的情况比例多少，系统版本等信息，决定是否要做过滤
; (function (global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory(global);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global);
    } else {
        global.jdProfiler = factory(global);
    }
} (typeof window !== 'undefined' ? window : this, function (window) {
    //##**common_start
    'use strict';
    var INSTANCE = null;

    /**
     * 合并对象
     * @param target
     * @param source
     */
    function extend(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key) && source[key] !== undefined) {
                target[key] = source[key];
            }
        }
    }

    /**
     * 解析 URL 查询字符串
     * @param url
     * @param name
     * @returns {*}
     */
    function getUrlParam(url, name) {
        var regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
        var urlInfo = regex.exec(url);
        var param = urlInfo[9];
        if (param && param !== "") {
            var paramInfo = param.split("&");
            for (var i = 0; i < paramInfo.length; i++) {
                var obj = paramInfo[i];
                var objInfo = obj.split("=");
                if (objInfo[0] === name) {
                    return decodeURIComponent(objInfo[1]);
                }
            }
        }
        return false;
    }

    /**
     * 性能检测对象
     * @param options
     * @returns {JdProfiler}
     */
    function JdProfiler(options) {
        if (!(this instanceof JdProfiler)) {
            return new JdProfiler(options);
        }
        this.selected = false;
        this.timing = {};
        this.isReported = false;
        this.options = {
            serverUrl: "//h5speed.m.jd.com",
            flag: 0,
            id: 0,
            profilingRate: 1,
            autoReport: false
        };
        this.init(options);
        this.customizedData = [];
        this.staticFileData = [];
        this.CONST_CREATE_TIME_MS = 1460538816969;
        this.CONST_REASONABLE_TIME_LIMIT = 60 * 1000;

        // 用于判断是否有 timing Api，如果没有，point4及以后，包括自定义数据都不上报
        this.performance = window.performance;
        this.isPerformanceApiAvailable = (typeof this.performance !== 'undefined');
        this.isTimingApiAvailable = (this.isPerformanceApiAvailable && typeof this.performance.timing !== 'undefined');
        this.isGetEntriesApiAvailable = (this.isPerformanceApiAvailable && typeof this.performance.getEntries === 'function');
    }

    /**
     * 配置项
     * @param options
     */
    JdProfiler.prototype.init = function (options) {
        if (typeof options === 'object') {
            extend(this.options, options);
        }
        this.selected = Math.random() < this.options.profilingRate;
        if (this.options.autoReport === true) {
            this.enableAutoReport();
        }
    };


    /**
     * 获取计时数据
     * @returns {{}}
     */
    JdProfiler.prototype.getTimingData = function () {
        var timingData = {}, firstPaintTimeValue;
        var that = this;
        // 删除掉了 MozAfterPaint event Handler，因为：
        // This event is available to add-ons but since Firefox 4 it is not available to web pages by default. It can only be made available to web pages by setting the preference dom.send_after_paint_to_content to true.


        /**
         * 首次Paint，费 chrome浏览器拿不到数据
         * @returns {number}
         */
        function getFirstPaintTime() {
            var firstPaintTime = 0;
            if (window.chrome && ((typeof window.chrome.loadTimes) === "function")) { //Chrome
                firstPaintTime = window.chrome.loadTimes().firstPaintTime * 1000;
            } else if ((that.isTimingApiAvailable && (typeof that.performance.timing.msFirstPaint) === "number")) { //IE
                firstPaintTime = that.performance.timing.msFirstPaint;
            }
            return Math.round(firstPaintTime);
        }

        timingData.hasPerformanceApi = that.isPerformanceApiAvailable ? 1 : 0; // point1
        timingData.hasTimingApi = that.isTimingApiAvailable ? 1 : 0;           // point2
        timingData.hasGetEntriesApi = that.isGetEntriesApiAvailable ? 1 : 0;   // point3
        // 记录是否有 FirstPaint 事件
        firstPaintTimeValue = getFirstPaintTime();
        timingData.hasFirstPaintApi = (firstPaintTimeValue > 0) ? 1 : 0;       // point4
        try {
            // 如果有 timing API 则执行
            if (that.isTimingApiAvailable) {
                that.performance.timing.firstPaint = firstPaintTimeValue;
                var timing = that.performance.timing;
                timingData.domainLookup = timing.domainLookupEnd - timing.domainLookupStart; // point5
                timingData.redirection = timing.fetchStart - timing.navigationStart;// point6
                timingData.serverConnection = timing.requestStart - timing.connectStart;// point7
                timingData.request2ResponseStart = timing.responseStart - timing.requestStart;// point8
                timingData.responseStart2responseEnd = timing.responseEnd - timing.responseStart;// point9
                timingData.request2ResponseEnd = timing.responseEnd - timing.requestStart;// point10
                timingData.domInteractive = timing.domInteractive - timing.navigationStart;// point11
                timingData.domContentLoaded = timing.domContentLoadedEventStart - timing.navigationStart;// point12
                timingData.firstPaint = timing.firstPaint - timing.navigationStart;// point13
                timingData.pageLoad = timing.loadEventStart - timing.navigationStart;// point14
                timingData.backEnd = timing.responseEnd - timing.navigationStart;// point15
                timingData.frontEnd = timing.loadEventStart - timing.responseEnd;// point16
            }
        } catch (e) {
            console.log(e.message);
        }
        //如果某项值小于0，则说明没有正常获取到，为不影响监控绘图，统一设置为 0
        for (var key in timingData) {
            if (timingData.hasOwnProperty(key) && timingData[key] !== undefined) {
                if (timingData[key] < 0 || timingData[key] > that.CONST_REASONABLE_TIME_LIMIT) {
                    timingData[key] = 0;
                }
            }
        }
        return timingData;
    };

    /**
     * 上报数据
     */
    JdProfiler.prototype.report = function () {
        try {
            // 被抽样抽中才执行
            if (this.selected) {
                if (!this.isReported) {
                    var img = new Image();
                    var urlStr = this.buildUrl(this.getServerInfo(), this.getTimingData(), this.customizedData, this.staticFileData);
                    if (urlStr) {
                        img.src = urlStr;
                    }
                    this.isReported = true;
                }
            }
        } catch (e) {
            console.log(e.message)
        }
    };

    /**
     * 获取上报服务API所需的数据
     * @returns {{id: number, flag: number, sid: (*|string)}}
     */
    JdProfiler.prototype.getServerInfo = function () {
        return {
            id: this.options.id,
            flag: this.options.flag,
            sid: getUrlParam(location.href, "sid") || ""
        };
    };

    /**
     * 添加自定义点位
     * @param {Object} customizedPointsObj
     */
    JdProfiler.prototype.add = function (customizedPointsObj) {
        try {
            if (Object.prototype.toString.call(customizedPointsObj) === "[object Object]") {
                this.customizedData.push(customizedPointsObj);
            }
        } catch (e) {
            console.log(e.message)
        }
    };

    /**
     * 上报静态资源数据
     * @param {Array} filePointObj
     */
    JdProfiler.prototype.detectStaticFile = function (filePointObj) {
        try {
            if (Object.prototype.toString.call(filePointObj) === "[object Object]") {
                this.staticFileData.push(filePointObj);
            }
        } catch (e) {
            console.log(e.message)
        }
    };

    /**
     * 构造上报URL
     * @param serverInfo
     * @param buildInTimingData
     * @param customizedData
     * @param staticFileData
     * @returns {*}
     */
    JdProfiler.prototype.buildUrl = function (serverInfo, buildInTimingData, customizedData, staticFileData) {

        var serverAndClientParam = {};
        //储存合并后的自定义数据点位
        var customizedPoints = {};
        //储存合并后的静态文件点位
        var staticFilePoints = {};
        var serverAndClientParamEncodedArr = [], customizedPointsEncodedArr = [], dataArray = [], staticFilePointsEncodedArr = [];
        var paramKeyValueStr = "";
        var imgUrl;
        var that = this;
        // 如果没有 timing Api，则没必要计算，直接返回


        function appendQuery(url, query) {
            if (query === '') {
                return url;
            }
            return (url + '&' + query).replace(/[&?]{1,2}/, '?');
        }

        function buildEncodedKeyValueArr(obj) {
            var arrTemp = [];
            for (var k in obj) {
                if (obj.hasOwnProperty(k) && obj[k] !== undefined) {
                    arrTemp.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]));
                }
            }
            return arrTemp;
        }

        /**
         * 将用户自定义打点数据拼接成查询字符串；打点数据与this.performance.timing.navigationStart时间相减，然后再拼接
         * @param {Object} obj 合并后的自定义点位集合
         * @returns {Array}
         */
        function buildCustomizedEncodedKeyValueArr(obj) {
            var arrTemp = [];
            //写这个代码时的时间；如果传入的时间值大于此值，说明传入的是当前时间戳，则计算时与 navigationStart相减；否则，说明是用户自行计算的时间差值，此时原封不动地上报；

            var navigationStart, timestamp, relativeTime, pointTemp;
            if (!(that.isTimingApiAvailable)) {
                return arrTemp;
            }
            navigationStart = that.performance.timing.navigationStart;
            for (var k in obj) {
                if (obj.hasOwnProperty(k) && obj[k] !== undefined) {
                    pointTemp = k;
                    try {
                        if (parseInt(pointTemp.replace('point', '')) >= 20) {
                            timestamp = parseInt(obj[k]);
                            if (timestamp > that.CONST_CREATE_TIME_MS) {
                                relativeTime = parseInt(timestamp - navigationStart);
                                if (relativeTime >= 0 && relativeTime < that.CONST_REASONABLE_TIME_LIMIT) {
                                    arrTemp.push(encodeURIComponent(k) + '=' + relativeTime);
                                }
                            } else if (timestamp >= 0 && timestamp < that.CONST_REASONABLE_TIME_LIMIT) {
                                arrTemp.push(encodeURIComponent(k) + '=' + timestamp);
                            }
                        }
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }
            return arrTemp;

        }

        /**
         * 处理静态文件上报
         * @param {Object} obj 合并后的静态文件点位对象
         */
        function buildStaticFileEncodedKeyValueArr(obj) {
            var arrTemp = [];
            var entries = null;
            var fileName, duration, keyTemp;

            function getFileTimingData(fileName, entriesList) {
                if (fileName && (entriesList.length > 0)) {
                    for (var i = 0, len = entriesList.length; i < len; i++) {
                        var item = entriesList[i];
                        if (item.name.indexOf(fileName) !== -1) {
                            return item.duration;
                        }
                    }
                }
            }

            if (that.isGetEntriesApiAvailable) {
                entries = that.performance.getEntries();
            } else {
                return arrTemp;
            }
            for (var k in obj) {
                if (obj.hasOwnProperty(k) && obj[k]) {
                    keyTemp = k;
                    try {
                        if (parseInt(keyTemp.replace('point', '')) >= 20) {
                            fileName = obj[k];
                            if (fileName) {
                                duration = parseInt(getFileTimingData(fileName, entries));
                                if (duration >= 0) { // 等于0时也上报
                                    arrTemp.push(encodeURIComponent(k) + '=' + duration);
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }
            return arrTemp;
        }

        // 拼接服务器及客户端参数
        extend(serverAndClientParam, serverInfo);
        serverAndClientParamEncodedArr = buildEncodedKeyValueArr(serverAndClientParam);
        if (serverAndClientParamEncodedArr.length > 0) {
            paramKeyValueStr = serverAndClientParamEncodedArr.join('&');
        }

        //拼接打点数据
        var iter = 0;
        for (var j in buildInTimingData) {
            if (buildInTimingData.hasOwnProperty(j) && buildInTimingData[j] !== undefined) {
                iter++;
                dataArray.push(("point" + iter) + '=' + (buildInTimingData[j]));
            }
        }
        //打点数据不为空时才拼接
        if (dataArray.length > 0) {
            paramKeyValueStr = paramKeyValueStr + '&' + dataArray.join('&');
        }
        // 只有当系统提供 timing API 时才统计，否则这些值会干扰正常值
        if (that.isTimingApiAvailable) {
            //拼接用户自定义数据
            customizedData.forEach(function (pointsObj) {
                extend(customizedPoints, pointsObj);
            });
            customizedPointsEncodedArr = buildCustomizedEncodedKeyValueArr(customizedPoints);
            if (Object.prototype.toString.call(customizedPointsEncodedArr) === '[object Array]' && customizedPointsEncodedArr.length > 0) {
                paramKeyValueStr = paramKeyValueStr + '&' + customizedPointsEncodedArr.join('&');
            }
        }
        // 只有当系统提供 getEntries API 时才统计，否则这些值会干扰正常值
        if (that.isGetEntriesApiAvailable) {
            // 拼接静态文件打点
            staticFileData.forEach(function (fileDataObj) {
                extend(staticFilePoints, fileDataObj);
            });
            staticFilePointsEncodedArr = buildStaticFileEncodedKeyValueArr(staticFilePoints);
            if (Object.prototype.toString.call(staticFilePointsEncodedArr) === '[object Array]' && staticFilePointsEncodedArr.length > 0) {
                paramKeyValueStr = paramKeyValueStr + '&' + staticFilePointsEncodedArr.join('&');
            }
        }
        var serverUrl = this.options.serverUrl;
        imgUrl = appendQuery(serverUrl, paramKeyValueStr);
        return imgUrl;
    };

    JdProfiler.prototype.enableAutoReport = function () {
        var self = this;
        window.addEventListener('pageshow', function () {
            window.setTimeout(function () {
                self.report();
            }, 2000);
        }, false);
    };

    if (!INSTANCE) {
        INSTANCE = JdProfiler({
            serverUrl: "//h5speed.m.jd.com",
            flag: 0,
            id: 0,
            profilingRate: 1,
            autoReport: false
        });
        if (INSTANCE.options.autoReport === true) {
            INSTANCE.enableAutoReport();
        }
        return INSTANCE;
    } else {
        return INSTANCE;
    }
    //##**common_end
}))
    ;
