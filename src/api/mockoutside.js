/*
 * @Date:  2024-10-10 20:00:00
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2024-10-10 20:00:00
 * @FilePath: src\api\mockoutside.js
 */
import http from '@/utils/axios';
import cache from '@/plugins/cache';
const headers = {
  "Userid": cache.session.get('userId'),
  "Username": cache.session.get('userName')
}
let baseUrl = "http://117.72.70.166:7001";
//let baseUrl = "http://localhost:7001";

/**
 * 获取接入业务方列表
 * @param { page } 分页
 * @param { vo } 条件
 * @returns 
 */
export function getBusinessPartyList(page,vo) {
  let data = {
    "page": page,
    "vo": vo
  }
  return http.get(`${baseUrl}/outSideBpm/businessParty/listPage`,data, { headers })
}
/**
 * 获取接入业务方详情
 * @param { Number } id 
 * @returns 
 */
export function getBusinessPartyDetail(id) {
  return http.get(`${baseUrl}/outSideBpm/businessParty/detail/${id}`, { headers })
}

/**
 * 编辑接入业务方
 * @param {*} param 
 * @returns 
 */
export function setBusinessParty(data) { 
  return http.post(`${baseUrl}/outSideBpm/businessParty/edit`, data, { headers })
} 
/**
 * 获取业务方应用列表
 * @param {*} page 
 * @param {*} vo 
 * @returns 
 */
export function getApplicationsPageList(page,vo) {
  let data = {
    "page": page,
    "vo": vo
  }
  return http.get(`${baseUrl}/outSideBpm/businessParty/applicationsPageList`,data, { headers })
}

/**
 * 接入业务方应用注册
 * @param {*} data 
 * @returns 
 */
export function registerApplication(data) {
  return http.post(`${baseUrl}/outSideBpm/businessParty/registerApplication`, data, { headers })
} 
/**
 * 获取注册应用详情
 * @param {*} data 
 * @returns 
 */
export function getApplicationDetail(id) {
  return http.get(`${baseUrl}/outSideBpm/businessParty/applicationDetail/${id}`, { headers })
} 
/**
 * 获取可用接入业务方的标识
 * @param { String } businessPartyMark 
 * @returns 
 */
export function getPartyMarkByIdBpmConf(businessPartyMark) {
  return http.get(`${baseUrl}/outSideBpm/businessParty/getPartyMarkByIdBpmConf/${businessPartyMark}`, { headers })
}
/**
 * 获取业务方k-v 
 * @returns 
 */
export function getPartyMarkKV() {
  return http.get(`${baseUrl}/outSideBpm/businessParty/getPartyMarkKV`, { headers })
}
 


/** 流程设计 * /
 
/**
 * 获取审批数据
 * @param { Number } id 
 * @returns 
 */
export function getApiWorkFlowData(data) {
  return http.get(`${baseUrl}/bpmnConf/detail/${data.id}`, { headers })
}
 
/**
 * 设置审批数据
 * @param {*} data 
 * @returns 
 */
export function setApiWorkFlowData(data) {
  return http.post(`${baseUrl}/bpmnConf/edit`, data, { headers })
}