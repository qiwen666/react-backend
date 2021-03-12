import axios from 'axios';

import storageUtils from './storageUtils'

const baseURL = 'http://localhost:3000'

const instance = axios.create({
  baseURL,
  timeout: 0, // 请求超时时间
  maxContentLength: 6000,
});

// 请求拦截器
instance.interceptors.request.use(config => {
  console.log(config,'请求拦截config');
  const token = storageUtils.getToken()
  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
},error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  console.log(response,'响应拦截resposse');
  return response.data
}, error => {
  return Promise.error(error)
})

export default instance;