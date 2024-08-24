<template>
    <div class="app-container">
        <el-tabs v-model="activeName" class="set-tabs" @tab-click="handleTabClick">
            <el-tab-pane label="表单信息" name="baseTab">
                <div class="approve" v-if="componentLoaded">
                    <el-row style="float: left;">
                        <el-col :span="24" class="my-col">
                            <div v-if="baseTabShow" style="pointer-events: none;">
                                <component v-if="componentLoaded" :is="loadedComponent" :previewData="componentData"
                                    :isPreview="true" />
                            </div>
                        </el-col>

                        <el-col :span="24" class="my-col">
                            <el-form ref="ruleFormRef" :model="approveForm" :rules="rules" class="my-form">
                                <el-form-item label="审批备注" prop="remark">
                                    <el-input v-model="approveForm.remark" type="textarea" placeholder="请输入备注"
                                        :maxlength="100" show-word-limit :autosize="{ minRows: 4, maxRows: 4 }"
                                        :style="{ width: '100%' }"></el-input>
                                </el-form-item>
                                <el-form-item prop="remark" style="float: right;">
                                    <el-button type="primary" @click="handleApprove(3)">同意</el-button>
                                    <el-button type="warning" @click="handleApprove(4)">拒绝</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>

                    <el-row style="float: left;">
                        <el-col :span="24">
                            <el-timeline style="max-width: 600px">
                                <el-timeline-item v-for="(activity, index) in activities" :key="index"
                                    :timestamp="activity.timestamp">
                                    {{ activity.content }}
                                </el-timeline-item>
                            </el-timeline>
                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="审批记录" name="flowStep">
                <div v-if="flowStepShow" style="width: 80%;">
                    <FlowStepTable />
                </div>
            </el-tab-pane>
            <el-tab-pane label="流程预览" name="flowReview">
                <div v-if="flowReviewShow" style="width: 80%;">
                    <ReviewWarp v-model:flowParam="flowParam" />
                </div>
            </el-tab-pane>
        </el-tabs>
        <label class="page-close-box" @click="close()"><img src="@/assets/images/back-close.png"></label>
    </div>
</template>

<script setup>
import { ref, markRaw } from 'vue'
import { getViewBusinessProcess } from "@/api/mockflow"
import FlowStepTable from "@/components/flow/flowStepTable.vue"
import ReviewWarp from "@/components/flow/reviewWarp.vue"
import { bizFormMaps } from "@/utils/flow/const"
const { proxy } = getCurrentInstance()
const route = useRoute();
const formCode = route.query?.formCode
const processNumber = route.query?.processNumber
const activeName = ref('baseTab')
const modules = import.meta.glob('../../forms/**/*.vue');

let baseTabShow = ref(true);
let flowStepShow = ref(false);
let flowReviewShow = ref(false);

let componentData = ref(null);
let componentLoaded = ref(false);
let loadedComponent = ref(null);

const approveForm = reactive({
    remark: ''
})

let rules = {
    remark: [{
        required: true,
        message: '请输入备注',
        trigger: 'blur'
    }]
};
const flowParam = ref({
    "formCode": "DSFZH_WMA",
    "accountType": 1
})
const activities = [
    {
        content: 'Event start',
        timestamp: '2018-04-15',
    },
    {
        content: 'Approved',
        timestamp: '2018-04-13',
    },
    {
        content: 'Success',
        timestamp: '2018-04-11',
    },
    {
        content: 'Approved',
        timestamp: '2018-04-13',
    },
    {
        content: 'Success',
        timestamp: '2018-04-11',
    },
    {
        content: 'Approved',
        timestamp: '2018-04-13',
    },
    {
        content: 'Success',
        timestamp: '2018-04-11',
    },
    {
        content: 'Approved',
        timestamp: '2018-04-13',
    },
    {
        content: 'Success',
        timestamp: '2018-04-11',
    },
]

const handleApprove = (type) => {

}
const handleTabClick = (tab, event) => {
    if (tab.paneName == 'baseTab') {
        loadComponent();
        preview();
        baseTabShow.value = true;
        flowStepShow.value = false;
        flowReviewShow.value = false;
    } else if (tab.paneName == 'flowStep') {
        baseTabShow.value = false;
        flowStepShow.value = true;
        flowReviewShow.value = false;
    } else if (tab.paneName == 'flowReview') {
        baseTabShow.value = false;
        flowStepShow.value = false;
        flowReviewShow.value = true;
    }
}
const close = () => {
    proxy.$tab.closePage();
}
const loadComponent = () => {
    if (bizFormMaps.has(formCode)) {
        const componentPath = bizFormMaps.get(formCode);
        const componentPathVue = `../..${componentPath}`;
        const importDybanicVue = modules[componentPathVue];
        importDybanicVue().then(component => {
            loadedComponent.value = markRaw(component.default)
        })
    }
}

const preview = () => {
    let queryParams = ref({
        "formCode": formCode,
        "processNumber": processNumber,
        "type": 2
    });
    proxy.$modal.loading();
    getViewBusinessProcess(queryParams.value).then(response => {
        componentData.value = response.data;
        componentLoaded.value = true
        proxy.$modal.closeLoading();
    });
}

handleTabClick({ paneName: "baseTab" })
</script>
<style scoped lang="scss">
.approve {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
    padding: 10px 50px;
    box-sizing: border-box;
}

.my-col {
    border: 1px solid #ebeef5;
    padding: 10px 20px 10px 20px;
    margin: 5px;
}

.my-form {
    max-width: 600px;
    min-height: 100px;
    margin: auto;
}
</style>