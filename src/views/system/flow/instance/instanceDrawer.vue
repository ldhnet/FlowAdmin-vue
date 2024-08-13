<template>
  <el-drawer v-model="visible" title="流程实例预览" :size="800" :with-header="false" :show-close="false">
    <span style="font-weight: bold;">流程实例预览</span>
    <el-divider />
  
    <el-tabs v-model="activeName" class="set-tabs">
        <el-tab-pane label="表单信息" name="baseTab">   
          <div style="max-height: 400px;overflow: hidden">
            <DynamicForm ref="buinessDemo1" />
          </div> 
        </el-tab-pane>
        <el-tab-pane label="审批记录" name="flowStep">   
          <FlowStepTable />
        </el-tab-pane>
        <el-tab-pane label="流程预览" name="flowReview">   
          <ReviewWarp v-if="flowParam" v-model:flowParam="flowParam" />
        </el-tab-pane>
      </el-tabs>
    <label class="page-close-box" @click="closeDrawer()"><img src="@/assets/images/back-close.png"></label>
  </el-drawer>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/store/modules/flow' 
import DynamicForm from "@/components/dynamicForm/index.vue"
import FlowStepTable from "@/components/flow/flowStepTable.vue" 
import ReviewWarp from "@/components/flow/reviewWarp.vue"

let store = useStore()
let { setInstanceDrawer } = store
const activeName = ref('baseTab')
const flowParam = ref({
    "formCode": "DSFZH_WMA",
    "accountType": 1
})
let instanceDrawer = computed(() => store.instanceDrawer)
let visible = computed({
  get() {
    return instanceDrawer.value
  },
  set() {
    closeDrawer()
  }
})

onMounted(async () => {
 
});
 
const closeDrawer = () => {
  setInstanceDrawer(false)
}
</script>
