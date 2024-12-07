<template>
    <div class="app-container">
        <el-form :model="vo" ref="queryRef" :inline="true" v-show="showSearch">
            <el-form-item label="关键字" prop="key">
                <el-input v-model="vo.关键字" placeholder="请输入关键字" clearable style="width: 200px"
                    @keyup.enter="handleQuery" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                <el-button icon="Refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8"> 
            <el-col :span="1.5">
            <el-button type="primary" plain icon="Edit" @click="handleDIYTemp">模板类型(DIY)</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="Edit"  @click="handleLFTemp">模板类型(LF)</el-button>
            </el-col> 
            <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="list">
            <el-table-column label="模板标识" align="center" prop="key" v-if="columns[0].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="模板名称" align="center" prop="value" v-if="columns[1].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="模板类型" align="center" prop="type" v-if="columns[2].visible" :show-overflow-tooltip="true">     
                <template #default="item">
                    <el-tag v-if="item.row.type === 'LF'" type="success">{{ item.row.type }}</el-tag>
                    <el-tag v-else type="warning">{{ item.row.type }}</el-tag>
                </template>
            </el-table-column> 
            <el-table-column label="备注" align="center" prop="remark" v-if="columns[3].visible"
                :show-overflow-tooltip="true" />
            <el-table-column label="创建时间" align="center" prop="createTime" v-if="columns[4].visible">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="320" align="center" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button link type="primary" icon="ZoomIn" @click="handlePreview(scope.row)">查看表单</el-button>
                    <el-button link type="primary" icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAllFormCodes } from "@/api/mockflow";
const { proxy } = getCurrentInstance();
const list = ref([]);
const loading = ref(false);
const showSearch = ref(true);

const data = reactive({
    form: {},
    vo: {}
});
const { vo, form } = toRefs(data);
onMounted(async () => {
    getList();
})

// 列显隐信息
const columns = ref([
    { key: 0, label: `模板标识`, visible: true },
    { key: 1, label: `模板名称`, visible: true },
    { key: 2, label: `模板类型`, visible: true },
    { key: 3, label: `备注`, visible: true },
    { key: 4, label: `创建时间`, visible: false }
]);

/** 查询接入业务方列表 */
function getList() {
    loading.value = true;
    getAllFormCodes().then(response => {
        list.value = response.data;
        loading.value = false;
    }).catch(() => {
        loading.value = false;
    });
}

/** 查看表单操作 */
function handleDIYTemp(row) {
    proxy.$modal.msgSuccess("后端添加流程适配以后自动查询出来");
}

/** 查看表单操作 */
function handleLFTemp(row) {
    proxy.$modal.msgError("演示数据不允许修改操作！");
}
/** 查看表单操作 */
function handlePreview(row) {
    proxy.$modal.msgError("演示数据不允许修改操作！");
}
/** 修改按钮操作 */
function handleEdit(row) {
    proxy.$modal.msgError("演示数据不允许修改操作！");
}

/** 删除按钮操作 */
function handleDelete(row) {
    proxy.$modal.msgError("演示环境不允许删除操作！");
}

/** 搜索按钮操作 */
function handleQuery() {
    getList();
}

/** 重置按钮操作 */
function resetQuery() {
    proxy.resetForm("queryRef");
    handleQuery();
}

</script>