/*
 * @Date: 2023-03-29 15:25:37
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2023-03-29 15:52:38
 * @FilePath: /src/utils/const.js
 */

export let bgColors = ["192,192,192", '87, 106, 149', '255，97，0', '65，105，225', '255, 148, 62', '50, 150, 250'] // '灰色, 蓝色, 橙色, 黄色, 黄色'
export let placeholderList = ["发起人", "审核人", "抄送人"];

export let nodeTypeList = ["未知", "发起人", "网关", "条件", "审核人", "抄送人"];

// export let setTypes = [
//   { value: 1, label: '指定成员' },
//   { value: 2, label: '主管' },
//   { value: 3, label: '指定角色' },
//   //{ value: 4, label: '指定部门' },
//   { value: 5, label: '发起人自己' }, 
//   { value: 8, label: '关联业务表' }, 
// ]

export let setTypes = [
  { value: 5, label: '指定人员' },
  { value: 13, label: '直属领导' },
  { value: 4, label: '指定角色' },
  // { value: 3, label: '指定层级审批' },
  { value: 6, label: 'HRBP' },
  // { value: 12, label: '发起人自己' },

  //{ value: 2, label: '层层审批' },
  //{ value: 8, label: '关联业务表' },
  //{ value: 14, label: '指定部门' },
]
export let typeCodes = [
  { value: 2, type: 1 },
  { value: 3, type: 3 },
  { value: 4, type: 4 },
  { value: 5, type: 5 },
  { value: 12, type: 2 },
  { value: 13, type: 13 },
]

export let hrbpOptions = [
  { value: 1, label: 'HRBP' },
  { value: 2, label: 'HRBP Leader' },
]
export let optTypes = [
  { value: '1', label: '大于等于' },
  { value: '2', label: '大于' },
  { value: '3', label: '小于等于' },
  { value: '4', label: '小于' }, 
  { value: '5', label: '等于' },
  { value: '6', label: '介于两个数之间' },
]

// export let optTypes = [
//   { value: '1', label: '小于' },
//   { value: '2', label: '大于' },
//   { value: '3', label: '小于等于' },
//   { value: '4', label: '等于' },
//   { value: '5', label: '大于等于' },
//   { value: '6', label: '介于两个数之间' },
// ]

export let opt1s = [
  { value: '<', label: '<' },
  { value: '≤', label: '≤' },
]

export class ConstApprovalButton {
  static preview =0;//预览
  static submit =1;//提交
  static resubmit = 2;//重新提交
  static agree = 3;//同意
  static noAgree = 4;//不同意
  static print = 8;//打印
  static terminate = 12;//终止
  static forward = 15;//转发
  static repulse = 18;//打回
  static addApproval = 19;//加批
  static transfer = 21;//转办 
}

export let approvalPageButtons = [
  { value: ConstApprovalButton.agree, label: '同意', type: 'default' },
  { value: ConstApprovalButton.noAgree, label: '不同意', type: 'default' },
  { value: ConstApprovalButton.repulse, label: '打回' },
  { value: ConstApprovalButton.addApproval, label: '加批' },
  { value: ConstApprovalButton.transfer, label: '转办' }
]
export let startPageButtons = [
  { value: ConstApprovalButton.submit, label: '提交', type: 'default' },
  { value: ConstApprovalButton.resubmit, label: '重新提交', type: 'default' },
  { value: ConstApprovalButton.terminate, label: '终止' }
]
export let viewPageButtons = [
  { value: ConstApprovalButton.preview, label: '预览', type: 'default' },
  { value: ConstApprovalButton.print, label: '打印' },
  { value: ConstApprovalButton.forward, label: '转发' }
]

export const bizFormMaps = new Map([
  ['DSFZH_WMA', '/forms/form1.vue'],
  ['LEAVE_WMA', '/forms/form2.vue']
]);

export let statusColor = {
  0: 'info',
  1: 'primary',//提交
  2: 'primary',//同意
  3: 'danger',//拒绝
  4: 'danger',//撤回
  5: 'danger',//作废
  6: 'danger',//终止
  7: 'primary',//
  8: 'danger',//打回修改
  10: 'warning',//承办
  13: 'primary',//添加审批人
  19: 'success',//加批
  99: 'success',//处理中
  21: 'success',//转办
  100: 'info'
};

export let pageButtonsColor = {
  0: 'primary',
  1: 'primary',//提交
  2: 'success',//重新提交
  3: 'primary',//同意
  4: 'danger',//不同意
  8: 'success',//打印
  10: 'warning',//承办
  12: 'danger',//终止
  15: 'primary',//转发
  18: 'warning',//打回修改
  13: 'primary',//添加审批人
  19: 'success',//加批
  21: 'primary',//转办 
};

export let approveList = {
  1: '张三',
  2: '李四',
  3: '王五',
  4: '菜六',
  5: '牛七',
  6: '马八',
  7: '李九',
  8: '周十',
  9: '肖十一',
  10: '令狐冲',
  11: '风清扬',
  12: '刘正风',
  13: '岳不群',
  14: '宁中则',
  15: '桃谷六仙',
  16: '不介和尚',
  17: '丁一师太',
  18: '依林师妹',
  19: '邱灵珊',
  20: '任盈盈'
};

