/*
 * @Date:  2024-05-25 14:06:59
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2023-03-29 15:52:57
 * @FilePath: src\api\mockflow.js
 */
import http from '@/utils/axios';
import cache from '@/plugins/cache';
const headers = {
  "Userid": cache.session.get('userId'),
  "Username": cache.session.get('userName')
}
let baseUrl = "http://117.72.70.166:8001";
//let baseUrl = "http://localhost:8001";
 
/**
 * 获取低代码表单FromCode
 * @param { String } formCode 
 * @returns 
 */
export function getLowCodeFromCodeData(formCode) {
  return http.get(`${baseUrl}/lowcode/getformDataByFormCode?formCode=${formCode}`, { headers })
} 