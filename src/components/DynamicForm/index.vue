<template>
  <div class="my-nav-content">
    <div id="designer-id" style="margin-right: 100px; margin-left: -100px;">
      <v-form-designer ref="formDesign"></v-form-designer>
    </div>
    <!-- <button @click="submitForm">ok</button> -->
  </div>
</template>

<script setup>
import { ref,onUnmounted, onMounted } from 'vue'
import { ObjectUtils } from '@/utils/ObjectUtils'
import { useStore } from '@/store/modules/workflow'
let store = useStore()
const formDesign = ref(null)
let formField = {};
 
const observer = new MutationObserver(() => {
    const returnFiled = formDesign.value.getFormFieldJson(); 
    if (ObjectUtils.isObjectChanged(formField, returnFiled)) {
      formField = returnFiled;
      console.log('异步执行一次', formField.formFields);
      store.setLowCodeFormField(formField);
    }
}); 
onMounted(() => {
  const targetNode = document.querySelector('#designer-id');
  const config = { childList: true, subtree: true };
  observer.observe(targetNode, config);
}); 
onUnmounted(() => {
  observer.disconnect();
});
const getData = () => {
  let exportData = formDesign.value.getFormJson();
  //console.log('exportData=========',JSON.stringify(exportData)) 
  return new Promise((resolve, reject) => {
    resolve({ formData: exportData })
  })
}

/*
获取字段
*/
const getFieldList = () => {
  let exportField = formDesign.value.getFormFieldJson();
  return new Promise((resolve, reject) => {
    resolve({ formData: exportField.formFields })
  })
}
defineExpose({
  getData,
  getFieldList
})
</script>

<style lang="css" scoped>
body {
  margin: 0;
  /* 如果页面出现垂直滚动条，则加入此行CSS以消除之 */
}

.el-dialog {
  width: 700px !important;
  border: 1px solid #DDE1E5 !important;
  border-radius: 3px !important;
}
</style>