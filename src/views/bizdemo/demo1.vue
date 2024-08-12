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
                    <div style="text-align:center;">
                        <div class="box-scale">
                            <flowReviewWarp v-if="nodeConfig" v-model:nodeConfig="nodeConfig" />
                            <div class="end-node">
                                <div class="end-node-circle"></div>
                                <div class="end-node-text">流程结束</div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <label class="page-close-box" @click="close()"><img src="@/assets/images/back-close.png"></label>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import flowReviewWarp from "@/components/flow/flowReviewWarp.vue"
import { getFlowPreview, processOperation,addBizDemo } from '@/api/mockflow';
import { FormatUtils } from '@/utils/flow/formatFlowPreview'
import {showLoading,closeLoading} from '@/plugins/loading'
const { proxy } = getCurrentInstance()
const activeName = ref("createFrom")
const flowCode = "DSFZH_WMA"
const nodeConfig = ref(null)
const ruleFormRef = ref(null)
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
function handleSubmit() {
    proxy.$refs['ruleFormRef'].validate((valid) => {
        if (!valid) {
            activeName.value = "createFrom";
            ElMessage.error('请先填写表单');
        } else {

            startTest();
            // if (ret) {
          

            // }
        }
    })
}

const handleClick = (tab, event) => {
    if (tab.props.name != 'flowFromReview') {
        return;
    }
    proxy.$refs['ruleFormRef'].validate((valid) => {
        if (!valid) {
            activeName.value = "createFrom";
            ElMessage.error('请先填写表单');
        } else {
            getFlowPreviewList();
        }
    })

    getFlowPreviewList();
}
const getFlowPreviewList = async () => {
    let param = {
        "formCode": flowCode,
        "accountType": form.accountType
    }
    let resData = await getFlowPreview(param);
    let formatData = FormatUtils.formatSettings(resData.data);
    nodeConfig.value = formatData;
}
const startTest = () => {
    let param = {
        "processKey":'',
        "processNumber": '',
        "formCode": flowCode ?? '',
        "operationType": form.accountType,
        "remark":  '发起测试流程accountType' + form.accountType
    }; 
    showLoading();
    processOperation(param).then((res) => { 
        if (res.code == 200) {
            param.processNumber = res.data.processNumber; 
            addBizDemo(param).then((res) => {
                console.log('res============',JSON.stringify(res));         
            });
            ElMessage.success("发起测试流程成功");
            const obj = { path: "/flowtask/mytask" };
            proxy.$tab.openPage(obj);
        } else {
            ElMessage.error("发起测试流程失败" + res.errMsg);
        }
        closeLoading();
    });

}
/** 关闭按钮 */
function close() {
    proxy.$tab.closePage();
}
</script>
<style scoped lang="scss">
.end-node-circle {
    width: 20px;
    height: 20px;
    margin: auto;
    border-radius: 50%;
    background: #dbdcdc
}

.task-title-text {
    line-height: 28px;
    font-weight: 600;
    font-size: 16px;
    color: #383838;
}
</style>