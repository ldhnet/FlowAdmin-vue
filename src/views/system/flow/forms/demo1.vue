<template>
    <div class="form-container"> 
        <el-form ref="ruleFormRef" label-position="right" :model="form" :rules="rules" style="max-width: 600px; margin: auto;">
            <el-row>
                <!-- <el-col :span="24">
                    <el-form-item label="表单名称" prop="formName">
                        <el-input v-model="form.formName" :style="{ width: '100%' }" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="表单编码" prop="formNo">
                        <el-input v-model="form.formNo" :style="{ width: '100%' }" />
                    </el-form-item>
                </el-col> -->
                <el-col :span="24">
                    <el-form-item label="申请账户类型" prop="accountType">
                        <el-select v-model="form.accountType" placeholder="请选择账户类型" :style="{ width: '100%' }">
                            <el-option v-for="(item, index) in accountTypeOptions" :key="index" :label="item.label"
                                :value="item.value"></el-option>
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
            </el-row>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
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
        required: true
    }],
    formNo: [{
        required: true
    }],
    accountType: [{
        required: true
    }],
}; 
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