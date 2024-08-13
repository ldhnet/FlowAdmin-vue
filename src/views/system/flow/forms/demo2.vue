<template>
    <div class="form-container">
        <el-form ref="ruleFormRef" :model="form" :rules="rules" style="max-width: 600px; margin: auto;">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="请假类型" prop="leaveType">
                        <el-select v-model="form.leaveType" placeholder="请选择请假类型" :style="{ width: '100%' }">
                            <el-option v-for="(item, index) in leaveTypeOptions" :key="index" :label="item.label"
                                :value="item.value"></el-option>
                         </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="开始时间" prop="beginDate">
                        <el-date-picker :disabled-date="disabledBeginDateDate" v-model="form.beginDate" type="datetime"
                            placeholder="请选择开始时间" format="YYYY/MM/DD HH:mm" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="结束时间" prop="endDate">
                        <el-date-picker :disabled-date="disabledEndDate" v-model="form.endDate" type="datetime"
                            placeholder="请选择结束时间" format="YYYY/MM/DD HH:mm" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="请假说明" prop="remark">
                        <el-input v-model="form.remark" type="textarea" placeholder="请填写请假理由" :maxlength="100"
                            show-word-limit :autosize="{ minRows: 4, maxRows: 4 }"
                            :style="{ width: '100%' }"></el-input>
                    </el-form-item>
                </el-col>
                 
            </el-row>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
const ruleFormRef = ref(null)
 
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
</script>
<style scoped>
.form-container {
    background: white !important;
    padding: 30px;
    max-width: 600px;
    min-height: 520px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}

.end-node-circle {
    width: 20px;
    height: 20px;
    margin: auto;
    border-radius: 50%;
    background: #dbdcdc
}
</style>