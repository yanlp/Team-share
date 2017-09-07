const path = require('path'),
      /*多页面引入工具，glob*/
      glob = require('glob'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDORS = require('./VENDORS'),
      PATHS   = require('./PATHS'),
      PORTS   = require('./PORTS'),
      CONFIG  = require('./config');


 // filter path 
let filterPath = 'views';

// 获取对应的路径 util
function getEntry(globPath) {
    var entries = {},
        enrtryArr = [],
        entryLen = 0,
        basename, tmp, pathname;
    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry)); //获取entry路径下，文件名称
        /*
            仅支持index.js/html,否则排除entry
        */
        if(basename != 'index'){
            return true;
        }
        enrtryArr = entry.split('/');
        entrylen  = enrtryArr.length;
        tmp = enrtryArr.splice(2-entryLen);
        if(tmp[1] == filterPath){
            pathname = basename;
        } else {
            let delePos = tmp.length - 2;
            pathname = tmp.splice(1, delePos).join('/') + '/' + basename; // 正确输出js和html的路径    
       }
        entries[pathname] = entry;
    });
    return entries;
}
//utils-function 生成html页面
function generateHtml(config, htmlPath){
    var pages = getEntry('./src/views/**/*.html');
    var filepath = htmlPath ? htmlPath : '',
        pathName = "";
    for (var pathname in pages) {
        // 配置生成的 html 文件，定义路径等
        pathName =  pathname.replace(/^\//,"");
        var conf = {
            title: CONFIG.title,
            filename: filepath + pathName + '.html', // html 文件输出路径
            template: pages[pathname], // 模板路径
            inject: true, // js 插入位置
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        };
        if (pathname in config.entry) {
            conf.chunks = ['vendors', pathname];
            conf.hash = true;
        }
        // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
}

var resolvePath = {
	self:this,
	filterPath:'views',
	getEntry:getEntry,
	generateHtml:generateHtml
}

module.exports = resolvePath;