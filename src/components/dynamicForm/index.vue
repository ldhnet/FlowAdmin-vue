<template>
    <div class="form-container">
        <el-row>
            <el-form label-position="right" label-width="auto" style="max-width: 600px;">  
                <el-col v-for="(item, index) in formCols" :key="'form_' + index" :span="item.step">
                    <el-form-item :label="item.label" :required="item.required">
                        <!-- <el-input v-model="item.value" :style="{ width: '100%' }"/> --> 
                        <el-text class="mx-2">{{ item.value}}</el-text>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script setup> 
//import DynamicForm from "@/components/dynamicForm/index.vue"
let formCols = [{
    "colType": "text",
    "colName": "accountType",
    "label": "账号类型:",
    "value": "腾讯云",
    "required": true,
    "step": 24,
    "sort": 1,
}, {
    "colType": "text",
    "colName": "userName",
    "label": "姓名:",
    "value": "张三",
    "required": true,
    "step": 24,
    "sort": 4,
}, {
    "colType": "text",
    "colName": "sex",
    "label": "性别:",
    "value": "男",
    "required": true,
    "step": 24,
    "sort": 1,
}, {
    "colType": "textarea",
    "colName": "remark",
    "label": "备注说明:",
    "value": "测试测试",
    "required": false,
    "step": 24,
    "sort": 1,
}];


</script>

<style scoped>
.form-container {
    background: white !important;
    padding: 30px;
    max-width: 600px;
    min-height: 520px;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
</style>