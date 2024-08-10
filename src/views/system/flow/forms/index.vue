<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
            <el-form-item label="表单名称" prop="formName">
                <el-input v-model="queryParams.formName" placeholder="请输入表单名称" clearable style="width: 200px"
                    @keyup.enter="handleQuery" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="postList">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="流程类型" align="center" prop="flowTypeName" width="200" />
            <el-table-column label="表单名称" align="center" prop="formName" width="200" />
            <el-table-column label="创建时间" align="center" prop="createTime" width="200">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="left" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" @click="handlePreview(scope.row)">预览表单</el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize" @pagination="getList" />

        <!-- 添加或修改用户配置对话框 -->
        <el-dialog v-model="open" width="600px" append-to-body :before-close="handleClose">
            <div class="task-title-text">
                <span>表单预览</span>
            </div>
            <el-divider />
            <div style="max-height: 350px;overflow: hidden;">
                <demo1 />
            </div>
            <template #footer>
                <el-button @click="handleClose">取 消</el-button>
            </template>
        </el-dialog>
    </div>

</template>

<script setup>
import demo1 from "@/views/system/flow/forms/demo1.vue";
const { proxy } = getCurrentInstance();
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(2);
const postList = [
    {

        "Id": 1,
        "flowTypeName": "第三方账号申请",
        "formName": "云账号申请单",
        "status": 0,
        "remark": "",
        "createTime": "2024-08-03 10:34:48"
    },
    {
        "Id": 2,
        "flowTypeName": "请假流程申请",
        "formName": "请假申请单",
        "status": 0,
        "remark": "",
        "createTime": "2024-08-03 10:34:48"
    }];
const data = reactive({
    form: {},
    queryParams: {
        pageNum: 1,
        pageSize: 10,
        formName: undefined
    },
    rules: {
        formName: [{ required: true, message: "表单名称不能为空", trigger: "blur" }]
    }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询岗位列表 */
function getList() {
    loading.value = false;
}

function handlePreview() {
    open.value = true;
};
function handleClose() {
    open.value = false;
};


/** 表单重置 */
function reset() {
    form.value = {
        formName: undefined
    };
    proxy.resetForm("postRef");
}

/** 搜索按钮操作 */
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}
getList();
</script>

<style scoped lang="scss">
.task-title-text {
    line-height: 28px;
    font-weight: 600;
    font-size: 16px;
    color: #383838;
}

</style>