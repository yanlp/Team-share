const path = require('path');
/**
 * 便捷求取路径原型函数
 * @param  {String} target
 * @return {String} path to target
 */
String.prototype.join = function (target) {
  return path.join(this.toString(), target);
};
const ROOT = path.resolve(__dirname, '..');
const config = {
	PATHS: {
    ROOT, // 项目根目录
    DIST: path.join(ROOT, 'build'), // build 后输出目录
    SRC: path.join(ROOT, 'src'), // 源码目录
  },
  PORTS: {
  	BROWSER_SYNC: 8899
  }
}
module.exports = config;