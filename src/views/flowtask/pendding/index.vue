<template>
   <div class="app-container">
      <el-form :model="taskMgmtVO" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item label="流程编号" prop="processNumber">
            <el-input v-model="taskMgmtVO.processNumber" placeholder="请输入关键字" clearable style="width: 200px"
               @keyup.enter="handleQuery" />
         </el-form-item>
         <el-form-item label="流程名称" prop="description">
            <el-input v-model="taskMgmtVO.description" placeholder="请输入关键字" clearable style="width: 200px"
               @keyup.enter="handleQuery" />
         </el-form-item>

         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
         </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="dataList">
         <el-table-column label="模板类型" align="center" prop="processKey" />
         <!-- <el-table-column label="模板名称" align="center" prop="processTypeName" /> -->
         <el-table-column label="流程编号" align="center" prop="processNumber" />
         <el-table-column label="流程描述" align="center" prop="description" />
         <el-table-column label="状态" align="center" prop="effectiveStatus">
            <template #default="item">
               <el-tag>{{ item.row.taskState }}</el-tag>
            </template>
         </el-table-column>
         <el-table-column label="创建时间" align="center" prop="createTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
         </el-table-column>
         <el-table-column label="更新时间" align="center" prop="runTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.runTime, '{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
         </el-table-column>
         <el-table-column label="操作" width="220" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">审批</el-button>
            </template>
         </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="pageDto.page" v-model:limit="pageDto.pageSize"
         @pagination="getList" />
   </div>
</template>

<script setup>
import { getPenddinglistPage } from "@/api/mockflow";
import { useStore } from '@/store/modules/workflow'
let store = useStore()
let { setInstanceDrawerConfig } = store
const { proxy } = getCurrentInstance();
const dataList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);

const data = reactive({
   form: {},
   pageDto: {
      page: 1,
      pageSize: 10 
   },
   taskMgmtVO: { 
      processNumber: undefined,
      processTypeName: undefined
   },
   rules: {
      bpmnCode: [{ required: true, message: "关键字不能为空", trigger: "blur" }],
      bpmnName: [{ required: true, message: "关键字不能为空", trigger: "blur" }],
   }
});
const { pageDto, taskMgmtVO } = toRefs(data);

/** 查询岗位列表 */
function getList() {
   loading.value = true;
   getPenddinglistPage(pageDto.value,taskMgmtVO.value).then(response => {
      dataList.value = response.data;
      total.value = response.pagination.totalCount;
      loading.value = false;
   });
}

/** 搜索按钮操作 */
function handleQuery() {
   pageDto.value.page = 1;
   getList();
}
/** 修改按钮操作 */
function handleUpdate(row) {  
   const params = {
      formCode: row.processKey,
      processNumber: row.processNumber,
      taskId:  row.taskId
   };
   setInstanceDrawerConfig(params); 
   const obj = { path: "pendding/approve", query: params };
   //proxy.$tab.openPage(obj);   
   proxy.$tab.closeOpenPage(obj);
}
function resetQuery() {
   taskMgmtVO.value = {
      processNumber: undefined,
      processTypeName: undefined
  };
  handleQuery();
}
getList();
</script>
