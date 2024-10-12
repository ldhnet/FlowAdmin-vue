<template>
  <div class="app-container">
    <el-form :model="vo" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="应用名称" prop="title">
        <el-input v-model="vo.title" placeholder="请输入关键字" clearable style="width: 200px" @keyup.enter="handleQuery" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd">注册</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list">
      <el-table-column label="业务方标识" align="center" prop="businessCode" />
      <el-table-column label="应用名称" align="center" prop="title" />
      <el-table-column label="应用类型" align="center" prop="applyTypeName" />
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" v-model:page="page.page" v-model:limit="page.pageSize"
      @pagination="getList" />

    <!-- 添加或修改委托对话框 -->
    <el-dialog :title="title" v-model="open" width="550px" append-to-body>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="130px" style="margin: 0 20px;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="业务方" prop="businessCode">
              <el-select v-model="form.businessCode" placeholder="请选择业务方" :style="{ width: '100%' }">
                <el-option v-for="(item, index) in partyMarkOptions" :key="index" :label="item.value"
                  :value="item.key"></el-option>
              </el-select>
            </el-form-item> 
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="应用名称" prop="title">
              <el-input v-model="form.title" placeholder="请输入应用名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="应用类型" prop="applyType">
              <el-radio-group v-model="form.applyType">
                <el-radio value="1">流程</el-radio>
                <el-radio value="2">应用</el-radio>
                <el-radio value="3">父级应用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="子应用" prop="isSon">
              <el-radio-group v-model="form.isSon">
                <el-radio value="1">是</el-radio>
                <el-radio value="2">否</el-radio> 
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="应用URL" prop="applicationUrl">
              <el-input v-model="form.applicationUrl" placeholder="请输入应用URL" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="icon图(app)" prop="effectiveSource">
              <ImageUpload :limit="1" :fileSize="3" :fileType="['jpg']"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; 
import { getApplicationsPageList, registerApplication, getApplicationDetail, getPartyMarkKV } from "@/api/mockoutside";
const { proxy } = getCurrentInstance();
const list = ref([]);
const loading = ref(false);
const showSearch = ref(true);
const total = ref(0);

const open = ref(false);
const title = ref("");
let partyMarkOptions = ref([]);
const data = reactive({
  form: {},
  page: {
    page: 1,
    pageSize: 10
  },
  vo: {},
  rules: {
    businessCode: [{ required: true, message: '请选择业务方', trigger: 'change' }],
    title: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
    applyType: [{ required: true, message: '', trigger: 'change' }]
  }
});
const { page, vo, form, rules } = toRefs(data);

onMounted(async () => {
  getList();
  getListAA();
})


function getListAA() {
  loading.value = true;
  getPartyMarkKV().then(response => {
    console.log('getListAA() ========', JSON.stringify(response));
    partyMarkOptions.value = response.data;
  }).catch(() => {

  });
}

/** 查询注册应用列表 */
function getList() {
  loading.value = true;
  getApplicationsPageList(page.value, vo.value).then(response => {
    list.value = response.data.data;
    total.value = response.data.pagination.totalCount;
    loading.value = false;
  }).catch(() => {
    loading.value = false;
  });
}
/** 新增接入业务方 */
function handleAdd() {
  reset();
  title.value = "添加业务方";
  open.value = true;
}
/** 提交表单 */
function submitForm() {
  proxy.$refs["formRef"].validate(valid => {
    if (valid) {
      if (form.value.id != undefined) {
        registerApplication(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        registerApplication(form.value).then(response => {
          if (response.code != 200) {
            proxy.$modal.msgError("注册失败");
            return;
          }
          proxy.$modal.msgSuccess("注册成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 修改按钮操作 */
function handleEdit(row) {
  reset();
  const id = row.id;
  getApplicationDetail(id).then(response => {
    form.value = response.data;
    form.value.applyType = form.value.applyType.toString();
    form.value.isSon = form.value.isSon?.toString();
    open.value = true;
    title.value = "编辑业务方";
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal.msgError("演示环境不允许删除操作！");
}

/** 取消操作表单 */
function cancel() {
  open.value = false;
  reset();
}

/** 重置操作表单 */
function reset() {
  form.value = {
    id: undefined,
    businessCode: undefined,
    title: undefined,
    applyType: undefined,
    isSon: undefined,
    applicationUrl: undefined,
    pcIcon: undefined,
    effectiveSource: undefined,
    remark: undefined
  };
  proxy.resetForm("queryRef");
};

/** 搜索按钮操作 */
function handleQuery() {
  page.value.page = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  vo.value = {};
  proxy.resetForm("queryRef");
  handleQuery();
}

</script>