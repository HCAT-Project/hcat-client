/* eslint-disable no-console */
import { useAxios } from '@vueuse/integrations/useAxios'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

// create an axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8081/api',
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

// // request interceptor
instance.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // const token = store.state.user.token;

    // if (token) {
    //   // let each request carry token
    //   config.headers = {
    //     ...config.headers,
    //     Authorization: `Bearer ${token}`
    //   };
    // }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// // response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (res) => {
    // if the custom code is not 200, it is judged as an error.
    if (res.status !== 200) {
      // Toast(res.msg)
      // 412: Token expired;
      if (res.status === 412) {
        // store.dispatch('user/userLogout');
      }
      return Promise.reject(res.data.msg || 'Error')
    }
    else {
      return res
    }
  },
  (error) => {
    console.log(1111!)
    console.log(`err${error}`)
    // Toast(error.message)
    return Promise.reject(error.message)
  },
)

// /**
//  * reactive useFetchApi
//  */

export default function useAxiosApi(url: string, config: AxiosRequestConfig) {
  return useAxios(url, config, instance, { immediate: false })
}
