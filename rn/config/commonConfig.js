const path = require('path');
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