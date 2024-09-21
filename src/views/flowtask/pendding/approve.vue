<template>
    <div class="app-container">
        <div class="flex gap-2">
            <el-tag type="primary">{{ formCode }}</el-tag>
            <el-tag type="success" style="margin-left: 5px;">{{ processNumber }}</el-tag>
        </div>
        <el-tabs v-model="activeName" class="set-tabs" @tab-click="handleTabClick">
            <el-tab-pane label="表单信息" name="baseTab">
                <div class="approve" v-if="componentLoaded">
                    <el-row style="padding-left: -5px;padding-right: -5px;">
                        <el-col :span="24" class="my-col">
                            <div v-if="baseTabShow" :class="{ disableClss: !enableClass }">
                                <component ref="componentFormRef" v-if="componentLoaded" :is="loadedComponent"
                                    :previewData="componentData" :isPreview="true" />
                            </div>
                        </el-col>
                        <el-col :span="24" class="my-col">
                            <el-form ref="approveFormRef" :model="approveForm" :rules="rules" class="my-form">
                                <el-form-item label="备注/说明" prop="remark">
                                    <el-input v-model="approveForm.remark" type="textarea" placeholder="请输入备注"
                                        :maxlength="100" show-word-limit :autosize="{ minRows: 4, maxRows: 4 }"
                                        :style="{ width: '100%' }"></el-input>
                                </el-form-item>
                                <el-form-item style="float: right;">
                                    <!-- <el-button type="primary" @click="approveSubmit(approveFormRef,3)">同意</el-button> -->
                                    <div v-for="btn in approvalButtons">
                                        <el-button style="margin: 5px;" v-if="btn.label"
                                            :type="pageButtonsColor[btn.value]"
                                            @click="approveSubmit(approveFormRef, btn.value)">
                                            {{ btn.label }}
                                        </el-button>
                                    </div>

                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>

                    <!-- <el-row style="float: left;">
                        <el-col :span="24">
                            <el-timeline style="max-width: 600px">
                                <el-timeline-item v-for="(activity, index) in activities" :key="index"
                                    :timestamp="activity.verifyDate" :size="activity.size" :type="activity.type">
                                    <p v-if="activity.taskName == '发起'"> {{ activity.taskName }}</p>
                                    <p v-else-if="activity.taskName == '流程结束'"> {{ activity.taskName }}</p>
                                    <div v-else>
                                        <el-card style="max-width: 600px;min-width: 200px">
                                            <template #header>
                                                <div class="card-header">
                                                    <span>{{ activity.taskName }} </span>
                                                    <span><el-tag type="success"
                                                            v-if="activity.verifyStatus == 99">进行中</el-tag></span>
                                                </div>
                                            </template>
<p v-if="activity.verifyUserName">审批人: {{ activity.verifyUserName }}</p>
<p v-if="activity.verifyStatusName">审批结果: {{ activity.verifyStatusName }}
</p>
<p v-if="activity.verifyDesc">审批备注: {{ activity.verifyDesc }}</p>
<p v-if="activity.verifyDate">操作时间: {{ activity.verifyDate }}</p>
</el-card>
</div>
</el-timeline-item>
</el-timeline>
</el-col>
</el-row>-->
                </div>
            </el-tab-pane>
            <el-tab-pane label="审批记录" name="flowStep">
                <div v-if="flowStepShow">
                    <FlowStepTable />
                </div>
            </el-tab-pane>
            <el-tab-pane label="流程预览" name="flowReview">
                <div v-if="flowReviewShow">
                    <ReviewWarp v-model:flowParam="flowParam" />
                </div>
            </el-tab-pane>
        </el-tabs>
        <label class="page-close-box" @click="close()"><img src="@/assets/images/back-close.png"></label>
        <employees-dialog v-model:visible="dialogVisible" :isMultiple="isMultiple" :title="dialogTitle"
            @change="sureDialogBtn" />
    </div>
</template>

<script setup>
import { ref, markRaw, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getViewBusinessProcess, processOperation, getBpmVerifyInfoVos } from "@/api/mockflow"
import FlowStepTable from "@/components/flow/flowStepTable.vue"
import ReviewWarp from "@/components/flow/reviewWarp.vue"
import employeesDialog from '@/components/flow/dialog/usersDialog.vue'
import { bizFormMaps, statusColor, pageButtonsColor, approvalPageButtons, ConstApprovalButton } from "@/utils/flow/const"

const { proxy } = getCurrentInstance()
const route = useRoute();
const formCode = route.query?.formCode
const processNumber = route.query?.processNumber
const taskId = route.query?.taskId
const activeName = ref('baseTab')
const modules = import.meta.glob('../../forms/**/*.vue');

let baseTabShow = ref(true);
let flowStepShow = ref(false);
let flowReviewShow = ref(false);

let componentData = ref(null);
let componentLoaded = ref(false);
let loadedComponent = ref(null);
let enableClass = ref(false);
let approvalButtons = ref([]);
const approveFormRef = ref(null);
const approveForm = reactive({
    remark: ''
});

const componentFormRef = ref(null);
const handleClickType = ref(null);
let dialogVisible = ref(false);
let dialogTitle = ref('');
let isMultiple = ref(false);

let rules = {
    remark: [{
        required: true,
        message: '请输入备注',
        trigger: 'blur'
    }]
};
const flowParam = ref({
    "formCode": formCode,
    "accountType": 1
});
const activities = ref([]);
let approveSubData = reactive({
    "taskId": taskId,
    "processNumber": processNumber,
    "formCode": formCode
});

onMounted(() => {
    approvalButtons.value = approvalPageButtons.filter((c) => {
        return c.type == 'default';
    });
});
watch(approvalButtons, (val) => {
    enableClass.value = val.some(c => c.value == ConstApprovalButton.resubmit);
})

watch(handleClickType, (val) => {
    dialogTitle.value = `设置${ConstApprovalButton.buttonsObj[val]}人员`;
    isMultiple.value = val == ConstApprovalButton.addApproval ? true : false;
})

const handleTabClick = (tab, event) => {
    if (tab.paneName == 'baseTab') {
        loadComponent();
        preview();
        getFlowApproveStep();
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
};
const getFlowApproveStep = async () => {
    let param = {
        "processNumber": processNumber,
    }
    let resData = await getBpmVerifyInfoVos(param);
    if (resData.code == 200) {
        activities.value = resData.data.map(c => {
            return {
                ...c,
                type: statusColor[c.verifyStatus],
                size: 'large'
            }
        });
    }
};
/**
 * 点击页面按钮
 * @param param 
 * @param type 
 */
const approveSubmit = async (param, type) => {
    if (!param) return;
    handleClickType.value = type;
    if (type == ConstApprovalButton.addApproval || type == ConstApprovalButton.transfer) {
        addUserDialog();
        return;
    };
    param.validate(async (valid, fields) => {
        if (valid) {
            approveSubData.approvalComment = approveForm.remark;
            approveSubData.operationType = type;
            if (type == ConstApprovalButton.resubmit) {
                await componentFormRef.value.handleValidate().then((isValid) => {
                    if (isValid) {
                        Object.assign(approveSubData, JSON.parse(componentFormRef.value.getFromData()));
                    }
                });
            };
            await approveProcess(approveSubData);
        }
    })
}


/**
 * 预览
 */
const preview = () => {
    let queryParams = ref({
        "formCode": formCode,
        "processNumber": processNumber,
        "type": 2
    });
    proxy.$modal.loading();
    getViewBusinessProcess(queryParams.value).then(response => {
        if (response.code == 200) {
            componentData.value = response.data;
            componentLoaded.value = true;
            let auditButtons = response.data.processRecordInfo?.pcButtons?.audit;
            if (Array.isArray(auditButtons) && auditButtons.length > 0) {
                approvalButtons.value = auditButtons.map(c => {
                    return { value: c.buttonType, label: c.name };
                });
            }
        } else {
            ElMessage.error("获取表单数据失败:" + response.errMsg);
            close();
        }
        proxy.$modal.closeLoading();
    });
}

/**
 * 审批
 * @param param 
 */
const approveProcess = async (param) => {
    ElMessageBox.confirm('确定完成操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        dialogVisible.value = false;
        proxy.$modal.loading();
        let resData = await processOperation(param);
        if (resData.code == 200) {
            ElMessage.success("审批成功");
            close();
        } else {
            ElMessage.error("审批失败:" + resData.errMsg);
        }
        proxy.$modal.closeLoading();
    }).catch(() => { });  
}
/**
 * 关闭当前审批页
 */
const close = () => {
    //proxy.$tab.closePage();
    const obj = { path: "/flowtask/pendding" };
    proxy.$tab.closeOpenPage(obj);
}
/**
 * 动态加载表单组件
 */
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

handleTabClick({ paneName: "baseTab" });
/**
 * 选人员Dialog 弹框
 */
const addUserDialog = () => {
    dialogVisible.value = true;
}
/**
 * 确定Dialog 弹框
 */
const sureDialogBtn = async (data) => { 
    if (!isMultiple.value) {
        data.selectList.unshift({
            id: 1,
            name: '张三',
        })
    }
    approveSubData.operationType = handleClickType.value;
    approveSubData.signUpUsers = data.selectList;
    approveSubData.approvalComment = data.remark;
    //console.log('sureDialogBtn==========approveSubData=============', JSON.stringify(approveSubData));  
    await approveProcess(approveSubData);
}

</script>
<style lang="scss">
.disableClss {
    pointer-events: none;
}

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

.el-timeline {
    --el-timeline-node-size-normal: 25px !important;
    --el-timeline-node-size-large: 25px !important;
}

.el-timeline-item__node--normal {
    left: -8px !important;
}

.el-timeline-item__node--large {
    left: -8px !important;
}

.el-timeline-item__wrapper {
    top: 0px !important;
}
</style>