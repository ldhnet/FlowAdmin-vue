<template>
    <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item label="流程编号" prop="bpmnCode">
            <el-input v-model="queryParams.postCode" placeholder="请输入流程编号" clearable style="width: 200px"
               @keyup.enter="handleQuery" />
         </el-form-item>
         <el-form-item label="流程名称" prop="bpmnName">
            <el-input v-model="queryParams.postName" placeholder="请输入流程名称" clearable style="width: 200px"
               @keyup.enter="handleQuery" />
         </el-form-item>
 
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
         </el-form-item>
      </el-form> 
       <el-table v-loading="loading" :data="dataList" > 
         <el-table-column label="流程类型" align="center" prop="processKey" />
         <el-table-column label="流程编号" align="center" prop="processNumber" />
         <el-table-column label="流程名称" align="center" prop="processDigest" /> 
         <el-table-column label="状态" align="center" prop="effectiveStatus">
            <template #default="item">
               <el-tag>{{ item.row.taskState }}</el-tag>
            </template>
         </el-table-column> 
          <el-table-column label="创建时间" align="center" prop="createTime" width="180">
             <template #default="scope">
                <span>{{ parseTime(scope.row.createTime) }}</span>
             </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center" class-name="small-padding fixed-width">
             <template #default="scope">
                <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">预览</el-button> 
             </template>
          </el-table-column>
       </el-table>
 
       <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.page"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
       /> 
    </div>
 </template>
 
 <script setup> 
 import { getApprovedlistPage } from "@/api/mockflow";  
 const { proxy } = getCurrentInstance();
 const dataList = ref([]); 
 const loading = ref(true);
 const showSearch = ref(true); 
 const total = ref(0); 
 
 const data = reactive({
   form: {},
   queryParams: {
      page: 1,
      pageSize: 10,
      bpmnCode: undefined,
      bpmnName: undefined
   },
   rules: {
      bpmnCode: [{ required: true, message: "流程编号不能为空", trigger: "blur" }],
      bpmnName: [{ required: true, message: "流程名称不能为空", trigger: "blur" }],
   }
 });
 const { queryParams, form, rules } = toRefs(data);
 
 /** 查询岗位列表 */
 function getList() {
   loading.value = true;
   getApprovedlistPage(queryParams.value).then(response => { 
     dataList.value = response.data;
     total.value = response.pagination.totalCount;
     loading.value = false;
   });
 } 
  
 /** 搜索按钮操作 */
 function handleQuery() {
   queryParams.value.page = 1;
   getList();
 } 
 function resetQuery() { 
 } 
 /** 修改按钮操作 */
 function handleUpdate(row) {
   proxy.$modal.msgError("演示环境不允许操作！");
 }
   
 getList();
 </script>
 