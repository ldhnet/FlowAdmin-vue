<template>
    <div class="app-container">
        <div class="box">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="createFrom" style="max-width: 1280px">
                    <template #label>
                        账号申请
                    </template>
                    <el-form ref="ruleFormRef" :model="form" :rules="rules"
                        style="max-width: 600px;min-height: 500px; margin: auto;">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="申请账户类型" prop="accountType">
                                    <el-select v-model="form.accountType" placeholder="请选择账户类型"
                                        :style="{ width: '100%' }">
                                        <el-option v-for="(item, index) in accountTypeOptions" :key="index"
                                            :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="备注说明" prop="remark">
                                    <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" :maxlength="100"
                                        show-word-limit :autosize="{ minRows: 4, maxRows: 4 }"
                                        :style="{ width: '100%' }"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item>
                                    <el-button type="primary" style="position: absolute;top:5px; right: 5px;"
                                        @click="handleSubmit">提交</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane name="flowFromReview" label="流程预览">
                    <div v-if="reviewWarpShow"> 
                        <ReviewWarp  v-model:flowParam="flowParam" />
                    </div>                     
                </el-tab-pane>
            </el-tabs>
            <label class="page-close-box" @click="close()"><img src="@/assets/images/back-close.png"></label>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive,watch, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import ReviewWarp from "@/components/flow/reviewWarp.vue"
import { processOperation, addBizDemo } from '@/api/mockflow' 
const { proxy } = getCurrentInstance()
const route = useRoute();
const activeName = ref("createFrom")
const flowCode = route.query?.formCode
const ruleFormRef = ref(null)
const reviewWarpShow = ref(false)

const flowParam = ref({
    "formCode": flowCode,
    "accountType": 1
})
let accountTypeOptions = [{
    "label": "腾讯云",
    "value": 1
}, {
    "label": "百度云",
    "value": 2
}, {
    "label": "阿里云",
    "value": 3
}];
const form = reactive({
    formName: '',//云账号申请单
    formNo: '',//
    accountType: '',
    remark: ''
})

let rules = {
    formName: [{
        required: true,
        message: '请输入表单名称',
        trigger: 'blur'
    }],
    formNo: [{
        required: true,
        message: '请输入表单编号',
        trigger: 'blur'
    }],
    accountType: [{
        required: true,
        message: '请选择账户类型',
        trigger: 'change'
    }],
};

watch(form, (val) => { 
    flowParam.value.accountType = val.accountType;
})

function handleSubmit() { 
    proxy.$refs['ruleFormRef'].validate((valid) => {
        if (!valid) {
            activeName.value = "createFrom"; 
            ElMessage.error('请先填写表单');
        } else { 
            startTest(); 
        }
    })
}

const handleClick = (tab, event) => { 
    if (tab.props.name != 'flowFromReview') {
        reviewWarpShow.value=false; 
        return;
    }
    proxy.$refs['ruleFormRef'].validate((valid) => {
        if (!valid) {
            activeName.value = "createFrom";
            ElMessage.error('请先填写表单');
        } else {
            activeName.value = "flowFromReview";
            reviewWarpShow.value=true; 
        }
    }) 
}

const startTest = () => {
    let param = {
        "formCode": flowCode ?? '',
        "operationType": form.accountType,
        "remark": '发起测试流程accountType' + form.accountType
    };
    proxy.$modal.loading();
    processOperation(param).then((res) => {
        if (res.code == 200) {
            param.processNumber = res.data.processNumber;
            addBizDemo(param).then((res) => {
                console.log('res============', JSON.stringify(res));
            });
            ElMessage.success("发起测试流程成功");
            const obj = { path: "/flowtask/mytask" };
            proxy.$tab.openPage(obj);
        } else {
            ElMessage.error("发起测试流程失败" + res.errMsg);
        }
        proxy.$modal.closeLoading();
    });

}
/** 关闭按钮 */
function close() {
    proxy.$tab.closePage();
}
</script>
<style scoped lang="scss"> 
.task-title-text {
    line-height: 28px;
    font-weight: 600;
    font-size: 16px;
    color: #383838;
}
</style>