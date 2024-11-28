<template>
    <div>
      <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
      </v-form-render>
      <el-button type="primary" @click="submitForm">Submit</el-button>
    </div>
  </template>
  
  <script setup>
    import { ref, reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    let props = defineProps({
      lfFromData: {
        type: String,
        default: "",
      }
    });
    /* 注意：formJson是指表单设计器导出的json，此处演示的formJson只是一个空白表单json！！ */
    const formJson = reactive(JSON.parse(props.lfFromData));
    const formData = reactive({})
    const optionData = reactive({})
    const vFormRef = ref(null)
  
    const submitForm = () => {
      vFormRef.value.getFormData().then(formData => {
        // Form Validation OK
        alert( JSON.stringify(formData) )
      }).catch(error => {
        // Form Validation failed
        ElMessage.error(error)
      })
    }
  </script>
  