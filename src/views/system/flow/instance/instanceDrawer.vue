<template>
  <div>
    <el-drawer v-model="visible" title="流程预览" :size="800" :with-header="false" :destroy-on-close="true" >
      <span style="font-weight: bold;">流程详情</span>
      <el-divider />

      <el-tabs v-model="activeName" class="set-tabs" @tab-click="handleTabClick">
        <el-tab-pane label="表单信息" name="baseTab">
          <div v-if="baseTabShow">
            <DynamicForm ref="buinessDemo1" />
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
import { ref } from 'vue'
import { useStore } from '@/store/modules/flow'
import DynamicForm from "@/components/dynamicForm/index.vue"
import FlowStepTable from "@/components/flow/flowStepTable.vue"
import ReviewWarp from "@/components/flow/reviewWarp.vue"

let store = useStore()
let { setInstanceDrawer } = store
let instanceDrawer = computed(() => store.instanceDrawer)
const activeName = ref('baseTab')

let baseTabShow = ref(true);
let flowStepShow = ref(false);
let flowReviewShow = ref(false);

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
</script>
