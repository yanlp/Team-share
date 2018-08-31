//环境
import ENV from 'ROOT/config/CONFIG';
import PORTS from 'ROOT/config/PORTS';

// 此处配置后端 API 根路径 以及 全局错误处理
// 更多配置请根据业务逻辑自行实现

// 后端 API 根路径 - 上海后端团队
let rootPathConf = '';
export const rootPath = rootPathConf

// 后端 API 根路径 - 核心业务 - 北京后端团队
// let rootPathCoreConf = '/api';
let rootPathCoreConf = '';
export const rootPathCore = rootPathCoreConf

// 后端 API 根路径 - 核心业务 - 北京后端团队new
let rootPathBjConf = '';
export const rootPathBj = rootPathBjConf

// node API 根路径
let rootNodeConf = '/nodeApi';
export const rootNode = rootNodeConf

// XHR 错误处理
export const errHandler = (e) => {
  // $.toast({
  //   heading: '请求 API 失败',
  //   icon: 'error',
  //   stack: false
  // })
  // console.warn(e)
  // alert('[ XHR:Failed ] 详情请看控制台')
  console.warn('[ XHR:Failed ] 详情请看控制台');
  console.error(e)
}

//env
let envConfig = ENV.env;
export const env = envConfig