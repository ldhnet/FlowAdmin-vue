<template>
    <div style="margin-top: 50px; position: relative;">
        <div class="form-container">
            <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto"
                style="max-width: 600px;margin: auto;">
                <!-- <el-form-item label="流程分组" prop="bpmnType">
                    <el-select v-model="form.bpmnType" placeholder="请选择分组" :style="{ width: '100%' }">
                        <el-option v-for="(item, index) in bpmnTypeOptions" :key="index" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->

                <el-form-item label="流程类型" prop="formCode">
                    <el-select v-model="form.formCode" placeholder="请选择分类" :style="{ width: '100%' }">
                        <el-option v-for="(item, index) in formCodeOptions" :key="index" :label="item.value"
                            :value="item.key"></el-option>
                    </el-select>
                </el-form-item> 
      
                <el-form-item label="流程名称" prop="bpmnName">
                    <el-input v-model="form.bpmnName" placeholder="请输入审批名称" :style="{ width: '100%' }" />
                </el-form-item>

                <el-form-item label="审批人去重" prop="deduplicationType">
                    <el-select v-model="form.deduplicationType" placeholder="请选择去重类型" :style="{ width: '100%' }">
                        <el-option v-for="(item, index) in duplicateOptions" :key="index" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批说明" prop="remark">
                    <el-input v-model="form.remark" type="textarea" placeholder="请输入审批说明" :maxlength="100"
                        show-word-limit :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button type="primary" @click="nextSubmit(ruleFormRef)">下一步》》》</el-button>

                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import { NodeUtils } from '@/utils/flow/nodeUtils'
//import { getFromCodeData } from '@/api/flow/jdCloudApi';
const { proxy } = getCurrentInstance()
const emit = defineEmits(['nextChange'])
let props = defineProps({
    basicData: {
        type: Object,
        default: () => (null),
    }
});

const generatorID = "PROJECT_" + NodeUtils.idGenerator();
const ruleFormRef = ref(null);
let duplicateOptions = [{
    "label": "不去重",
    "value": 1
}, {
    "label": "前去重",
    "value": 2
}, {
    "label": "后去重",
    "value": 3
}];
 
let formCodeOptions = ref([]);

const form = reactive({
    bpmnName: '合同审批',
    bpmnCode: generatorID,
    bpmnType: 1,
    formCode: '',
    remark: '',
    effectiveStatus: false,
    deduplicationType: 1
})

onMounted(async () => {
    //console.log('basicData=====props=======',JSON.stringify(props.basicData))
    if (props.basicData) {
        form.bpmnName = props.basicData.bpmnName;
        form.bpmnCode = props.basicData.bpmnCode; 
        form.formCode = props.basicData.formCode;
        form.remark = props.basicData.remark;
        form.deduplicationType = props.basicData.deduplicationType;
    }
    // await getFromCodeData().then((res) => {
    //     if (res.code == 200) { 
    //         formCodeOptions.value = res.data;
    //     }
    // });
});

let rules = {
    formCode: [{
        required: true,
        message: '请选择分类',
        trigger: 'blur'
    }],
    bpmnName: [{
        required: true,
        message: '请输入流程名称',
        trigger: 'blur'
    }],
    bpmnCode: [{
        required: true,
        message: '请输入流程编号',
        trigger: 'blur'
    }], 
};
const nextSubmit = (ruleFormRef) => {
    if (!ruleFormRef) return
    ruleFormRef.validate((valid, fields) => {
        if (valid) {
            emit('nextChange', { label: "流程设计", key: "processDesign" })
        }
    })
}
// 给父级页面提供得获取本页数据得方法
const getData = () => {
    return new Promise((resolve, reject) => {
        proxy.$refs['ruleFormRef'].validate((valid, fields) => {
            if (!valid) {
                emit('nextChange', { label: "基础设置", key: "basicSetting" })
                return;
            }
            form.effectiveStatus = form.effectiveStatus ? 1 : 0;
            resolve({ formData: form })  // TODO 提交表单
        })
    })
};
defineExpose({
    getData
})
</script>
<style scoped>
.form-container {   
  background: white !important;
  padding: 30px;
  max-width: 700px;
  min-height: 600px;
  position: absolute;
  top:270px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
</style>