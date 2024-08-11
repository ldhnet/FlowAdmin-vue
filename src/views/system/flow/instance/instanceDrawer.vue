<template>
  <el-drawer v-model="visible" title="流程实例预览" :size="800" :with-header="false" :show-close="false">
    <span>流程实例预览</span>
    <el-divider />
    <el-row style="background-color: #f5f5f7;min-height: calc(100vh - 200px);">
      <el-col :span="24" style="margin-bottom: 10px;">
        <el-radio-group v-model="tabPosition">
          <el-radio-button value="buinessForm">业务表单信息</el-radio-button>
          <el-radio-button value="flowForm">流程基本信息</el-radio-button>
          <el-radio-button value="flow">流程图预览</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="24" v-if="tabPosition == 'buinessForm'">
        <div style="pointer-events: none;max-height: calc(100vh - 200px); overflow: hidden;">
          <demo1 ref="buinessDemo1" />
        </div>

      </el-col>
      <el-col :span="24" v-if="tabPosition == 'flowForm'">
        <div style="pointer-events: none;max-height: calc(100vh - 200px);overflow: hidden;">
          <BasicSetting ref="basicSetting" :basicData="processConfig" />
        </div>
      </el-col>
      <el-col :span="24" v-if="tabPosition == 'flow'">
        <div style="pointer-events: auto;">
          <Process ref="processDesign" :processData="nodeConfig" />
        </div>
      </el-col>
    </el-row>
    <label class="page-close-box" @click="closeDrawer()"><img src="@/assets/images/back-close.png"></label>
  </el-drawer>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/store/modules/flow'
import { getMockWorkFlowData } from "@/api/mock"
import BasicSetting from "@/components/flow/BasicSetting/index.vue"
import Process from "@/components/flow/Process/index.vue"
import demo1 from "@/views/system/flow/forms/demo1.vue"
import { FormatDisplayUtils } from '@/utils/flow/formatdisplay_data'

let store = useStore()
let { setInstanceDrawer } = store
const tabPosition = ref('buinessForm')

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
  await init();
});
const init = async () => {
  let mockjson = await getMockWorkFlowData();
  console.log("old===data=mockjson.data==========", JSON.stringify(mockjson.data));
  let data = FormatDisplayUtils.getToTree(mockjson.data);
  console.log("old===data=mockjson==========", JSON.stringify(data));
  console.log("old===data=.nodeConfig==========", JSON.stringify(data.nodeConfig));
  processConfig.value = data;
  title.value = data.bpmnName;
  nodeConfig.value = data.nodeConfig;
}

const closeDrawer = () => {
  setInstanceDrawer(false)
}
</script>