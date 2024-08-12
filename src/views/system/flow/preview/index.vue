<template>
    <div class="app-container home">
        <div class="task-title">
            <span class="task-title-text">流程详情预览</span>
        </div>

        <el-row style="background-color: #f5f5f7;min-height: calc(100vh);">
            <el-col :span="24">
                <el-radio-group v-model="tabPosition">
                    <el-radio-button value="buinessForm">业务表单信息</el-radio-button>
                    <el-radio-button value="flowForm">流程基本信息</el-radio-button>
                    <el-radio-button value="flow">流程图预览</el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :span="24" v-if="tabPosition == 'buinessForm'">
                <demo1 ref="buinessDemo1" />
            </el-col>
            <el-col :span="24" v-if="tabPosition == 'flowForm'">
                <div style="pointer-events: none;">
                    <BasicSetting ref="basicSetting" :basicData="processConfig" />
                </div> 
            </el-col>
            <el-col :span="24" v-if="tabPosition == 'flow'">
                <div style="pointer-events: auto;">
                    <Process ref="processDesign" :processData="nodeConfig" />
                </div>                
            </el-col>
        </el-row>
        <label class="page-close-box" @click="close()"><img src="@/assets/images/back-close.png"></label>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getMockWorkFlowData } from "@/api/mock";
import BasicSetting from "@/components/flow/BasicSetting/index.vue";
import Process from "@/components/flow/Process/index.vue";
import demo1 from "@/views/system/flow/forms/demo1.vue";
import { FormatDisplayUtils } from '@/utils/flow/formatdisplay_data'
const { proxy } = getCurrentInstance();

const tabPosition = ref('buinessForm')
let processConfig = ref(null);
let nodeConfig = ref(null);
let title = ref('');
/** 关闭按钮 */
function close() {
    proxy.$tab.closePage();
};
onMounted(async () => {
    await init();
});
const init = async () => {
    let mockjson = await getMockWorkFlowData();
    //console.log("old===data=mockjson.data==========", JSON.stringify(mockjson.data));
    let data = FormatDisplayUtils.getToTree(mockjson.data);
    // console.log("old===data=mockjson==========", JSON.stringify(data));
    // console.log("old===data=.nodeConfig==========", JSON.stringify(data.nodeConfig));
    processConfig.value = data;
    title.value = data.bpmnName;
    nodeConfig.value = data.nodeConfig;
}
 
</script>

<style scoped lang="scss">
.task-title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 6px;
    margin-bottom: 16px;
    border-bottom: 2px solid #e8e8e8;
}

.task-title-text {
    line-height: 28px;
    font-weight: 600;
    font-size: 16px;
    color: #383838;
}
</style>