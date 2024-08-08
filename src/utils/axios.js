/*
 * @Date:  2024-05-25 14:43:53
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2022-09-21 14:37:02
 * @FilePath: /ant-flow/src/plugins/axios.js
 */
"use strict";

import axios from "axios";  
import cache from '@/plugins/cache';
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control 
  headers: { 
    'X-Custom-Header': 'foobar',
    'Content-Type': 'application/json;charset=utf-8',
  }
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    config.headers = config.headers || {};  
    config.headers.Userid = cache.session.get('userId');
    return config;
  },
  function (error) { 
    return Promise.reject(error);
  }
);
 
_axios.interceptors.response.use(
  function (response) { 
    return response.data;
  },
  function (error) { 
    return Promise.reject(error);
  }
);

export default _axios;
