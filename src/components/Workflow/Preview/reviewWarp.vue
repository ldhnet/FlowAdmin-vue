<template>
    <div style="text-align:center;">
        <div class="box-scale">
            <LineWarp v-if="nodeConfig" v-model:nodeConfig="nodeConfig" />
            <div class="end-node">
                <div class="end-node-circle"></div>
                <div class="end-node-text">流程结束</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import LineWarp from "@/components/Workflow/Preview/lineWarp.vue"
import { getFlowPreview } from '@/api/mockflow'
import { FormatUtils } from '@/utils/flow/formatFlowPreview'
import { useStore } from '@/store/modules/workflow' 
const { proxy } = getCurrentInstance()
let store = useStore()
let viewConfig = computed(() => store.instanceViewConfig1) 

const nodeConfig = ref(null) 
const getFlowPreviewList = async (objData) => {  
    const param = ref({
        "processNumber": objData.processNumber,
        "isStartPreview": false,
        "isOutSideAccessProc": objData.isOutSideAccess || false,
        "isLowCodeFlow": objData.isLowCodeFlow || false
    }) 
    proxy.$modal.loading();
    let resData = await getFlowPreview(param);
    proxy.$modal.closeLoading();
    let formatData = FormatUtils.formatSettings(resData.data);
    nodeConfig.value = formatData;
}
getFlowPreviewList(viewConfig.value);
</script>
<style scoped lang="scss">
.end-node-circle {
    width: 20px;
    height: 20px;
    margin: auto;
    border-radius: 50%;
    background: #dbdcdc
} 
</style>