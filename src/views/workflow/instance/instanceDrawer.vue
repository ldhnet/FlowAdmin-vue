<template>
  <div>
    <el-drawer v-model="visible" v-if="visible" title="流程预览" :size="800" :with-header="false" :destroy-on-close="true">
      <span style="font-weight: bold;">流程详情</span>
      <el-divider />
      <el-tabs v-model="activeName" class="set-tabs" @tab-click="handleTabClick">
        <el-tab-pane label="表单信息" name="baseTab">
          <div v-if="baseTabShow" style="pointer-events: none;">
            <component v-if="componentLoaded" :is="loadedComponent" :previewData="componentData" :isPreview="true">
            </component>
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
      <label class="page-close-box" @click="closeDrawer()"><img src="@/assets/images/back-close.png"></label>
    </el-drawer>
  </div>

</template>

<script setup>
import { ref, markRaw } from 'vue'
import { useStore } from '@/store/modules/workflow'
import { getViewBusinessProcess } from "@/api/mockflow"
import FlowStepTable from "@/components/Workflow/flowStepTable.vue"
import ReviewWarp from "@/components/Workflow/reviewWarp.vue"
import { bizFormMaps } from "@/utils/flow/const"
const { proxy } = getCurrentInstance()
let store = useStore()
let { setInstanceDrawer } = store
let instanceDrawer = computed(() => store.instanceDrawer)
let viewConfig = computed(() => store.instanceViewConfig1)
const activeName = ref('baseTab')
const modules = import.meta.glob('../../forms/**/*.vue');

let baseTabShow = ref(true);
let flowStepShow = ref(false);
let flowReviewShow = ref(false);

let componentData = ref(null);
let componentLoaded = ref(false);
let loadedComponent = ref(null);

const flowParam = ref({
  "processNumber": viewConfig.value?.processNumber,
  "isStartPreview": false
})

let visible = computed({
  get() {
    return instanceDrawer.value
  },
  set() {
    closeDrawer()
  }
})
const handleTabClick = (tab, event) => {
  if (tab.paneName == 'baseTab') {
    loadComponent();
    preview();
    if(viewConfig.value.isOutSideAccess){
      baseTabShow.value = false;
    }else{
      baseTabShow.value = true;
    }    
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
/**
 * 关闭抽屉
 */
const closeDrawer = () => {
  setInstanceDrawer(false)
}
/**
 * 动态加载业务表单组件
 */
const loadComponent = () => {
  if (bizFormMaps.has(viewConfig.value.formCode)) {
    const componentPath = bizFormMaps.get(viewConfig.value.formCode);
    const componentPathVue = `../..${componentPath}`;
    const importDybanicVue = modules[componentPathVue];
    importDybanicVue().then(component => {
      loadedComponent.value = markRaw(component.default)
    })
  }
}
/**
 * 预览
 */
const preview = () => { 
  let queryParams = ref({
    "formCode": viewConfig.value.formCode,
    "processNumber": viewConfig.value.processNumber,
    "type": 2,
    "isOutSideAccessProc": viewConfig.value.isOutSideAccess
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
