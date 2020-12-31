import Request from './luch-request/index.js'
const http = new Request();

http.setConfig((config) => { /* config 为默认全局配置*/
	//config.baseURL = 'http://localhost:8080/api'; /* 根域名 */
	config.baseURL = 'http://14.116.217.62:8087'; /* 根域名 */

	// config.header = {
	// 	"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",

	// }
	/**************************************/
	const token = uni.getStorageSync("token")
        config.header={
        	'token':token
        }
	/********************************************/
	// config.header.token=token
	return config
})
//请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	/*************************************/
	// let token;
	// uni.getStorage({
	// 	key: 'token',
	// 	success: function(res) {
	// 		console.log(res);
	// 		token = res.data
	// 		// config.header={
	// 		// 	'token':res.data
	// 		// }
	// 		return config
	// 	}
	// });
	// config.header = {
	//   ...config.header,
	//   token: token// 演示拦截器header加参
	// }
	/*********************************************/
	// 演示custom 用处
	// if (config.custom.auth) {
	//   config.header.token = 'token'
	// }
	// if (config.custom.loading) {
	//  uni.showLoading()
	// }
	// let token;
	// uni.getStorage({
	// 	key: 'token',
	// 	success: function(res) {
	// 		console.log(res);
	// 		token = res.data
	// 		// config.header={
	// 		// 	'token':res.data
	// 		// }
	// 		return config
	// 	}
	// });

	// setTimeout(() => {
	// // 	console.log(token)
	// // 	if (token) {
	// 		config.header = {
	// 			"token": token
	// 		}
	// // 		return config
	// // 	}

	// }, 50)
	

	// console.log(config)

	// if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	//    return Promise.reject(config)
	//  }

	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})
//相应拦截器
http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
	//  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
	//    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
	// if (response.config.custom.verification) { // 演示自定义参数的作用
	//   return response.data
	// }
	// console.log(response)
	return response
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
	// console.log(response)
	return Promise.reject(response)
})
export default http;
