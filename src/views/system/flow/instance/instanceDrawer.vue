<template>
  <el-drawer v-model="visible" title="流程实例预览" :size="620" :with-header="false" :show-close="false">
    <span>流程实例预览</span>
    <el-divider />
  
    <el-tabs v-model="activeName" class="set-tabs">
        <el-tab-pane label="业务表单信息" name="baseTab">   
          <div style="max-height: 400px;overflow: hidden">
            <demo1 ref="buinessDemo1" />
          </div> 
        </el-tab-pane>
        <el-tab-pane label="审批进度" name="flowStep">   
          <FlowStep />
        </el-tab-pane>
      </el-tabs>
    <label class="page-close-box" @click="closeDrawer()"><img src="@/assets/images/back-close.png"></label>
  </el-drawer>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/store/modules/flow' 
import FlowStep from "@/components/flow/flowStep.vue"
import demo1 from "@/views/system/flow/forms/demo1.vue" 

let store = useStore()
let { setInstanceDrawer } = store
const activeName = ref('baseTab')

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
