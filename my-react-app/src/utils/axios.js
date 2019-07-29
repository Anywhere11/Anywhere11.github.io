// 引入AXIOS
import axios from 'axios'

// 引入UI库
import { Toast } from 'antd-mobile'

// 配置基路径
// axios.defaults.baseURL = 'http://localhost:8883/' 

axios.defaults.baseURL = 'http://123.57.211.31:8883' 

// 加载中...
export function loadingToast(msg) {
    // 调用这个函数时  把其他正在显示的Toast隐藏
    Toast.hide()
    Toast.loading(msg, 1, () => { })
}

// 请求失败
export function failToast(msg) {
    Toast.hide()
    Toast.fail(msg, 1)
}

// 请求成功
export function successToast(msg) {
    Toast.hide()
    Toast.success(msg, 1);
}

// 配置请求拦截器
axios.interceptors.request.use(function (config) {

    // 将token配置到POST请求中去
    config.data = config.data || {}
    config.data.token = localStorage.token

    loadingToast('加载中')
    return config

}, function (error) {

    failToast('响应失败')
    return Promise.reject(error)

})

// 配置响应拦截器
axios.interceptors.response.use(function (response) {

    successToast('数据加载成功')
    return response

}, function (error) {

    failToast('数据请求失败')
    return Promise.reject(error)
})

export { axios }