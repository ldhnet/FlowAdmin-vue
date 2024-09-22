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
import LineWarp from "@/components/Workflow/lineWarp.vue"
import { getFlowPreview } from '@/api/mockflow'
import { FormatUtils } from '@/utils/flow/formatFlowPreview'
const { proxy } = getCurrentInstance()
const nodeConfig = ref(null)

let props = defineProps({
    flowParam: {
        type: Object,
        default: () => ({}),
    }
});

const getFlowPreviewList = async (param) => {  
    proxy.$modal.loading();
    let resData = await getFlowPreview(param);
    proxy.$modal.closeLoading();
    let formatData = FormatUtils.formatSettings(resData.data);
    nodeConfig.value = formatData;
}

getFlowPreviewList(props.flowParam);
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