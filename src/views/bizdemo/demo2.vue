<template>
    <div class="app-container">
        <div class="box">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="createFrom" style="max-width: 1280px">
                    <template #label>
                        请假申请
                    </template>
                    <el-form ref="ruleFormRef" :model="form" :rules="rules"
                        style="max-width: 600px;min-height: 500px; margin: auto;">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="请假类型" prop="leaveType">
                                    <el-select v-model="form.leaveType" placeholder="请选择请假类型"
                                        :style="{ width: '100%' }">
                                        <el-option v-for="(item, index) in leaveTypeOptions" :key="index"
                                            :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="开始时间" prop="beginDate">
                                    <el-date-picker :disabled-date="disabledBeginDateDate" v-model="form.beginDate"
                                        type="datetime" placeholder="请选择开始时间" format="YYYY/MM/DD HH:mm" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="结束时间" prop="endDate">
                                    <el-date-picker :disabled-date="disabledEndDate" v-model="form.endDate"
                                        type="datetime" placeholder="请选择结束时间" format="YYYY/MM/DD HH:mm" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="请假说明" prop="remark">
                                    <el-input v-model="form.remark" type="textarea" placeholder="请填写请假理由"
                                        :maxlength="100" show-word-limit :autosize="{ minRows: 4, maxRows: 4 }"
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
                    <ReviewWarp v-if="flowParam" v-model:flowParam="flowParam" />
                </el-tab-pane>
            </el-tabs>
            <label class="page-close-box" @click="close()"><img src="@/assets/images/back-close.png"></label>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import ReviewWarp from "@/components/flow/reviewWarp.vue" 
const { proxy } = getCurrentInstance()
const activeName = ref("createFrom")
const flowCode = "LEAVE_WMA" 
const ruleFormRef = ref(null)
const flowParam = ref({
    "formCode": flowCode,
    "accountType": 1
})
let leaveTypeOptions = [{
    "label": "年假",
    "value": 1
}, {
    "label": "事假",
    "value": 2
}, {
    "label": "婚嫁",
    "value": 3
}, {
    "label": "病假",
    "value": 4
}];

const form = reactive({
    leaveType: 1,
    beginDate: "",
    endDate: "",
    userName: '测试人员',
    userId: 1,
    remark: ''
})

let rules = {
    beginDate: [{
        required: true,
        message: '请选择开始时间',
        trigger: 'blur'
    }],
    endDate: [{
        required: true,
        message: '请选择结束时间',
        trigger: 'blur'
    }],
    remark: [{
        required: true,
        message: '请填写请假理由',
        trigger: 'blur'
    }],
    leaveType: [{
        required: true,
        message: '请选择请假类型',
        trigger: 'change'
    }],
};
const disabledBeginDateDate = (time) => {
    return time.getTime() > new Date(form.endDate);
}
const disabledEndDate = (time) => {
    return time.getTime() < new Date(form.beginDate);
}
watch(form, (val) => { 
    flowParam.value.accountType = val.accountType;
})
function handleSubmit() {
    proxy.$refs['ruleFormRef'].validate((valid) => {
        if (!valid) {
            activeName.value = "createFrom";
            ElMessage.error('请先填写表单');
        } else {
           ret = startTest(); 
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
            activeName.value = "flowFromReview";
        }
    }) 
}
 
const startTest = () => {
    let param = {
        "processKey": flowCode ?? '',
        "processNumber": flowCode ?? '',
        "formCode": flowCode ?? '', 
        "remark": flowCode + '发起请假测试流程'
    };
    processOperation(param).then((res) => {
        console.log('res============',JSON.stringify(res));
        if (res.code == 200) {
            ElMessage.success("发起测试流程成功");
            const obj = { path: "/flowtask/mytask" };
            proxy.$tab.openPage(obj);
        } else {
            ElMessage.error("发起请假测试流程失败" + res.errMsg);
        }
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