/**
 * 请求地址统一处理 / 组装
 */

export default function (actionName) {
  // 非生产环境 && 开启代理， 接口前缀统一使用[/proxyApi/]前缀做代理拦截！http://10.201.78.181:8085 http://10.200.42.222:7003'
  // console.log(process.env.NODE_ENV)
  return (
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:8070'
      : '') + actionName
  // window.SITE_CONFIG.baseUrl
  // http://10.200.40.70:8081/proxyApi
}
