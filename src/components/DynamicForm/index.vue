<template>
     <div class="my-nav-content">
        <div style="margin-right: 100px; margin-left: -100px;">
          <v-form-designer ref="formDesign"></v-form-designer>
        </div>
        <!-- <button @click="submitForm">ok</button> -->
     </div>
  </template>
  
  <script setup>
  import { ref, watch,  computed, onMounted  } from 'vue'
  const formDesign = ref(null) 

const getWatchData = () => {
    return formDesign.value.getFormJson(); 
}
onMounted(() => { 
     let ret= getWatchData();
     console.log('ret===========:', ret); 
});

// watch(() => getWatchData(),  (newReturnValue) => { 
//         console.log('Method returned a new value:', newReturnValue); 
// });


  const getData = () => {
    let  exportData= formDesign.value.getFormJson();
    //console.log('exportData=========',JSON.stringify(exportData)) 
    return new Promise((resolve, reject) => {
      resolve({ formData: exportData })
    })
  }
 
   /*
  获取字段
  */
  const getFieldList =()=> { 
    let  exportField = formDesign.value.getFormFieldJson();
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
    margin: 0;  /* 如果页面出现垂直滚动条，则加入此行CSS以消除之 */
  }  
  .el-dialog {
    width: 700px !important;
    border: 1px solid #DDE1E5 !important;
    border-radius: 3px !important;
  }
  </style>
  