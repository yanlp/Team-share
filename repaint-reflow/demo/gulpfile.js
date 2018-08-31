var url = require('url');
var fs = require('fs');
var path = require('path');

gulp = require('gulp');
livereload = require('gulp-livereload');
webserver = require('gulp-webserver');

//web服务器
gulp.task('webserver', function() {
    gulp.src('./static') // 服务器目录（./代表根目录）
    .pipe(webserver({ // 运行gulp-webserver
        port: 8000, //端口，默认8000
        livereload: true, // 启用LiveReload
        open: true, // 服务器启动时自动打开网页
        directoryListing: {
            enable: true,
            path: '/static/'
        },
        middleware: function(req, res, next) {
            //mock local data
            var urlObj = url.parse(req.url, true),
                method = req.method;


            if (!urlObj.pathname.match(/^\/api/)) { //不是api开头的数据，直接next
                next();
                return;
            }
            var mockDataFile = path.join(__dirname, urlObj.pathname) + ".js";
            //file exist or not
            fs.access(mockDataFile, fs.F_OK, function(err) {
                if (err) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                        "status": "没有找到此文件",
                        "notFound": mockDataFile
                    }));
                    return;
                }
                var data = fs.readFileSync(mockDataFile, 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
            });
            next();
        },
        proxies: []
    }));
});


// 默认任务
gulp.task('default', ['webserver']);