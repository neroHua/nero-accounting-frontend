import axios from 'axios'

let httpService = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 5000
})

// 拦截请求
httpService.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token');
  }
  return config;
},err => {
  Promise.reject(err);
})

// 拦截响应
httpService.interceptors.response.use(response => {
  return response.data.data;
},err => {
  return Promise.reject(err);
})

// get请求的封装
export async function  get(url, params={}, headers = {'Content-Type':'application/json'}) {
  return new Promise((resolve,reject) => {
    httpService({
      url: url,
      method: 'get',
      params: params,
      headers: headers,
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

// post请求封装 
export async function post(url, data = {}, headers = {'Content-Type':'application/json'}) {
  return new Promise((resolve,reject) => {
    httpService({
      url: url,
      method:'post',
      data: JSON.stringify(data),
      headers: headers
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

// put请求封装 
export async function put(url, data = {}, headers = {'Content-Type':'application/json'}) {
  return new Promise((resolve,reject) => {
    httpService({
      url: url,
      method:'put',
      data: JSON.stringify(data),
      headers: headers
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

// delete请求的封装
export async function deleteMethod(url, data={}, headers = {'Content-Type':'application/json'}) {
  return new Promise((resolve,reject) => {
    httpService({
      url: url,
      method: 'delete',
      data: JSON.stringify(data),
      headers: headers,
    }).then(res => {
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}
