<template>
    <div class="app-container">
        <div class="box">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="createFrom" style="max-width: 1280px;height: calc(100vh - 200px);overflow: auto">
                    <template #label>
                        填写表单
                    </template>
                    <el-row>
                        <el-col :span="24"> 
                            <component  ref="formRef" v-if="componentLoaded" :is="loadedComponent" :isPreview="false" @handleBizBtn="handleSubmit"></component>
                        </el-col>
                    </el-row> 
                </el-tab-pane>

                <el-tab-pane name="flowFromReview" label="流程预览">
                    <div v-if="reviewWarpShow">
                        <ReviewWarp v-model:flowParam="flowParam" />
                    </div>
                </el-tab-pane>
            </el-tabs>
            <label class="page-close-box" @click="close()"><img src="@/assets/images/back-close.png"></label>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue' 
import ReviewWarp from '@/components/Workflow/reviewWarp.vue'
import { processOperation } from '@/api/mockflow' 
import { bizFormMaps } from "@/utils/flow/const"
const modules = import.meta.glob('../forms/**/*.vue');

const { proxy } = getCurrentInstance()
const route = useRoute();
const activeName = ref("createFrom")
const flowCode = route.query?.formCode
const formRef = ref(null)
const reviewWarpShow = ref(false) 
const flowParam = ref(null) 
let componentLoaded= ref(false);
let loadedComponent= ref(null);

const handleSubmit = (param) => {  
    //console.log('handleSubmit=====param=======', param);
    startTest(param)
}
const handleClick = (tab, event) => {
    if (tab.props.name != 'flowFromReview') {
        reviewWarpShow.value = false;
        return;
    }
    formRef.value.handleValidate().then((isValid) => {
        if (!isValid) {
            activeName.value = "createFrom";
        } else { 
            flowParam.value = JSON.parse(formRef.value.getFromData());
            flowParam.value.formCode = flowCode ?? '';   
            reviewWarpShow.value = true;
        }
    });
} 
const startTest = (param) => {
    let bizFrom= JSON.parse(param);
    bizFrom.formCode = flowCode ?? '';  
    bizFrom.operationType = 1;//operationType 1发起 3 审批
    proxy.$modal.loading();
    processOperation(bizFrom).then((res) => {
        if (res.code == 200) { 
            proxy.$modal.msgSuccess("发起流程成功");
            const obj = { path: "/flowtask/mytask" };
            proxy.$tab.openPage(obj);
        } else {
            proxy.$modal.msgError("发起流程失败" + res.errMsg);
        }
        proxy.$modal.closeLoading();
    });

}

const loadComponent = () => {
  if (bizFormMaps.has(flowCode)) {
    const componentPath = bizFormMaps.get(flowCode);
    const componentPathVue = `..${componentPath}`;  
    const importDybanicVue = modules[componentPathVue];  
    importDybanicVue().then(component => {
      loadedComponent.value = markRaw(component.default)
      componentLoaded.value = true
    })
  }
}  
loadComponent();
/** 关闭按钮 */
function close() {
    proxy.$tab.closePage();
}
</script>
<style scoped lang="scss">
.task-title-text {
    line-height: 28px;
    font-weight: 600;
    font-size: 16px;
    color: #383838;
}
</style>