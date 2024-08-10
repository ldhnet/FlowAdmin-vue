<template>
    <div class="app-container">
        <div class="box">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="createFrom" style="max-width: 1280px">
                    <template #label>
                        账号申请
                    </template>
              
                    <div style="max-height: 250px;overflow: hidden;">
                        <FormDemo1/>
                    </div> 
                    <el-form-item>
                        <el-button  type="primary" style="right: 4px;" @click="handleSubmit">提交</el-button>
                    </el-form-item> 
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
import { ref, reactive, onMounted, getCurrentInstance } from 'vue' 
import { useRoute } from 'vue-router'
import FormDemo1 from "@/views/system/flow/forms/demo1.vue"
import flowReviewWarp from "@/components/flow/flowReviewWarp.vue"
import { getFlowPreview, processOperation } from '@/api/mockflow';
import { FormatUtils } from '@/utils/flow/formatFlowPreview'

const { proxy } = getCurrentInstance()
const activeName = ref("createFrom") 
const flowCode = "DSFZH_WMA"
let nodeConfig = ref(null)
const form = reactive({
    userName: '测试人员',
    userId: 1,
    accountType: 1,
    remark: ''
})

function handleSubmit() { 
}

const handleClick = (tab, event) => {
    if (tab.props.name != 'flowFromReview') {
        return;
    }
    // proxy.$refs['ruleFormRef'].validate((valid) => {
    //     if (!valid) {
    //         activeName.value = "createFrom";
    //         ElMessage.error('请先填写表单');
    //     } else {
    //         getFlowPreviewList();
    //     }
    // })

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