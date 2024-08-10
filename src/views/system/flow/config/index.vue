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

      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button type="success" plain icon="Edit"  @click="handleUpdate">修改</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete"  @click="handleDelete">删除</el-button>
         </el-col>
      </el-row>

      <el-table v-loading="loading" :data="configList">
         <el-table-column label="流程类型" align="center" prop="formCode" />
         <el-table-column label="流程编号" align="center" prop="bpmnCode" />
         <el-table-column label="流程名称" align="center" prop="bpmnName" />
         <el-table-column label="是否去重" align="center" prop="deduplicationType">
            <template #default="item">
               {{ item.row.deduplicationType == 1 ? '否' : '是' }}
            </template>
         </el-table-column>

         <el-table-column label="状态" align="center" prop="effectiveStatus">
            <template #default="item">
               {{ item.row.effectiveStatus == 1 ? '活跃' : '不活跃' }}
            </template>
         </el-table-column>

         <el-table-column label="修改时间" align="center" prop="updateTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.updateTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column label="操作" width="180" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button link type="primary" @click="handlePreview(scope.row)">预览</el-button>
               <el-button link type="primary"  @click="handleDelete(scope.row)">删除</el-button>
            </template>
         </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.page" v-model:limit="queryParams.pageSize"
         @pagination="getList" />
   </div>
</template>

<script setup name="Post">
import { getBpmnConflistPage } from "@/api/mockflow";
const router = useRouter();
const { proxy } = getCurrentInstance();

const configList = ref([]);
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
   getBpmnConflistPage(queryParams.value).then(response => {
      let res = response.data;
      configList.value = res.data;
      total.value = res.pagination.totalCount;
      loading.value = false;
   });
}

/** 搜索按钮操作 */
function handleQuery() {
   queryParams.value.page = 1;
   getList();
}
 
function handleAdd() {
   router.push({ path: "design"});
}

function handleUpdate() {
   proxy.$modal.msgError("演示环境不允许删除操作！");
}

/** 重置按钮操作 */
function resetQuery() {
   proxy.resetForm("queryRef");
   handleQuery();
}

/** 删除按钮操作 */
function handleDelete(row) {
   proxy.$modal.msgError("演示环境不允许删除操作！");
}
/** 预览 */
function handlePreview(row) {
   const obj = { path: "/system/flow/preview" };
   proxy.$tab.openPage(obj);
}
getList();
</script>
