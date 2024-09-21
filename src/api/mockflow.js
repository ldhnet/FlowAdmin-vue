/*
 * @Date:  2024-05-25 14:06:59
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2023-03-29 15:52:57
 * @FilePath: /ant-flow/src/api/index.js
 */

import http from '@/utils/axios';
import cache from '@/plugins/cache';
let baseUrl = "http://117.72.70.166:7001";
//let baseUrl = "http://localhost:7001";
/**
 * 获取审批数据
 * @param { Number } id 
 * @returns 
 */
export function getApiWorkFlowData(data) {
  return http.get(`${baseUrl}/bpmnConf/detail/${data.id}`,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    })
}
/**
 * 获取审批数据
 * @param { Number } id 
 * @returns 
 */
export function getFromCodeData() {
  return http.get(`${baseUrl}/bpmnBusiness/listFormInfo`,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    })
}
/**
 * 设置审批数据
 * @param {*} data 
 * @returns 
 */
export function setApiWorkFlowData(data) {
  return http.post(`${baseUrl}/bpmnConf/edit`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    })
}
/**
* 获取代办事项 
* @returns 
*/
export function getTodoList() {
  return http.get(`${baseUrl}/bpmnConf/todoList`,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
 * 获取所有实例列表
 * @param {*} pageDto 
 * @param {*} taskMgmtVO 
 * @returns 
 */
export function getAllProcesslistPage(pageDto, taskMgmtVO) {
  let data = {
    "pageDto": pageDto,
    "taskMgmtVO": taskMgmtVO
  }
  return http.post(`${baseUrl}/bpmnConf/process/listPage/6`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
 * 获取用户代办数据列表
 * @param {*} pageDto 
 * @param {*} taskMgmtVO 
 * @returns 
 */
export function getPenddinglistPage(pageDto, taskMgmtVO) {
  let data = {
    "pageDto": pageDto,
    "taskMgmtVO": taskMgmtVO
  }
  return http.post(`${baseUrl}/bpmnConf/process/listPage/5`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
 * 获取用户已审批数据列表
 * @param {*} pageDto 
 * @param {*} taskMgmtVO 
 * @returns 
 */
export function getApprovedlistPage(pageDto, taskMgmtVO) {
  let data = {
    "pageDto": pageDto,
    "taskMgmtVO": taskMgmtVO
  }
  return http.post(`${baseUrl}/bpmnConf/process/listPage/4`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
 * 获取我发起的流程列表
 * @param {*} pageDto 
 * @param {*} taskMgmtVO 
 * @returns 
 */
export function getMyRequestlistPage(pageDto, taskMgmtVO) {
  let data = {
    "pageDto": pageDto,
    "taskMgmtVO": taskMgmtVO
  }
  return http.post(`${baseUrl}/bpmnConf/process/listPage/3`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
 * 获取流程配置数据列表
 * @param {*} data 
 * @returns 
 */
export function getBpmnConflistPage(pageDto, taskMgmtVO) {
  let data = {
    "pageDto": pageDto,
    "entity": taskMgmtVO
  }
  return http.post(`${baseUrl}/bpmnConf/listPage`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
 * 审批,发起审批
 * @param {*} data 
 * operationType 1 发起 3 审批
 * @returns 
 */
export function processOperation(data) {
  return http.post(`${baseUrl}/bpmnConf/process/buttonsOperation`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
 * 获取审批进度数据
 * @param { Number } id 
 * @returns 
 */
export function getBpmVerifyInfoVos(param) {
  return http.get(`${baseUrl}/bpmnConf/getBpmVerifyInfoVos?processNumber=${param.processNumber}`,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    })
}

/**
 * 流程预览
 * @param {*} param 
 * @returns 
 */
export function getFlowPreview(data) {
  // let paramA = {
  //   "formCode": "DSFZH_WMA",
  //    "accountType":1
  // }
  return http.post(`${baseUrl}/bpmnConf/startPagePreviewNode`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}


/**
 * 流程生效
 * @param {*} data 
 * @returns 
 */
export function getEffectiveBpmn(data) {
  return http.get(`${baseUrl}/bpmnConf/effectiveBpmn/${data.id}`,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
 * 获取审批页面按钮权限
 * @param {*} data 
 * @returns 
 */
export function getViewBusinessProcess(data) {
  return http.post(`${baseUrl}/bpmnConf/process/viewBusinessProcess`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
* 获取审批页面 审批人配置类型 
* @returns 
*/
export function getApproveNodeProperties() {
  return http.get(`${baseUrl}/bpmnBusiness/listNodeProperties`,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
* 获取业务表单数据
* @returns 
*/
export function getBizDemoByFlowKey(flowkey) {
  return http.get(`${baseUrl}/bizdemo/getBizDemoByFlowKey?flowkey=${flowkey}`,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}

/**
* 新增业务表单数据
* @returns 
*/
export function addBizDemo(param) {
  let data = {
    "flowkey": param.processNumber,
    "formcode": param.formCode,
    "processnumber": param.processNumber,
    "bizformjson": JSON.stringify(param)
  }
  return http.post(`${baseUrl}/bizdemo/addBizDemo`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}
/**
 * 获取委托列表
 * @param {*} pageDto 
 * @param {*} taskMgmtVO 
 * @returns 
 */
export function getUserEntrustListPage(pageDto, taskMgmtVO) {
  let data = {
    "pageDto": pageDto,
    "taskMgmtVO": taskMgmtVO
  }
  return http.post(`${baseUrl}/bpmnBusiness/entrustlist/1`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}
/**
 * 获取委托列表
 * @param {*} pageDto 
 * @param {*} taskMgmtVO 
 * @returns 
 */
export function getEntrustListPage(pageDto, taskMgmtVO) {
  let data = {
    "pageDto": pageDto,
    "taskMgmtVO": taskMgmtVO
  }
  return http.post(`${baseUrl}/bpmnBusiness/entrustlist/2`,
    data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    }
  );
}
/**
*  委托详情
* @returns 
*/
export function entrustDetail(id) {
  return http.get(`${baseUrl}/bpmnBusiness/entrustDetail/${id}`,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}
/**
* 设置委托
* @returns 
*/
export function setEntrust(data) {
  return http.post(`${baseUrl}/bpmnBusiness/editEntrust`, data,
    {
      headers: {
        'Userid': cache.session.get('userId')
      }
    });
}