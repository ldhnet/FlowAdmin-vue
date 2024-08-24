<template>
  <div>
    <el-drawer v-model="visible" v-if="visible" title="流程预览" :size="800" :with-header="false" :destroy-on-close="true" >
      <span style="font-weight: bold;">流程详情</span>
      <el-divider /> 
      <el-tabs v-model="activeName" class="set-tabs" @tab-click="handleTabClick">
        <el-tab-pane label="表单信息" name="baseTab">
          <div v-if="baseTabShow">
            <!-- <DynamicForm ref="buinessDemo1" /> -->
            <component v-if="componentLoaded" :is="loadedComponent"></component>
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
import { ref,markRaw } from 'vue'
import { useStore } from '@/store/modules/flow'
import FlowStepTable from "@/components/flow/flowStepTable.vue"
import ReviewWarp from "@/components/flow/reviewWarp.vue"
import { bizFormMaps } from "@/utils/flow/const"
let store = useStore()
let { setInstanceDrawer } = store
let instanceDrawer = computed(() => store.instanceDrawer)
let viewConfig = computed(() => store.instanceViewConfig1)
const activeName = ref('baseTab')
const modules = import.meta.glob('../../../bizdemo/*.vue');
let baseTabShow = ref(true);
let flowStepShow = ref(false);
let flowReviewShow = ref(false);

let componentLoaded= ref(false);
let loadedComponent= ref(null);

const flowParam = ref({
  "formCode": "DSFZH_WMA",
  "accountType": 1
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
const closeDrawer = () => {
  setInstanceDrawer(false)
} 
const loadComponent = () => {
  if (bizFormMaps.has(viewConfig.value.formCode)) {
    const componentPath = bizFormMaps.get(viewConfig.value.formCode);
    const componentPathVue = `../../..${componentPath}.vue`;
    const importDybanicVue =modules[componentPathVue]; 
    importDybanicVue().then(component => {
      loadedComponent.value = markRaw(component.default)
      componentLoaded.value = true
    })
  }
}  
handleTabClick({ paneName: "baseTab" })
</script>
