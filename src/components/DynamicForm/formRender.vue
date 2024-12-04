<template>
    <div>
      <v-form-render ref="vFormRef" :form-json="formJson" :form-data="formData" :option-data="optionData">
      </v-form-render>
      <el-button v-if="!isPreview" type="primary" @click="submitForm">提交</el-button>
    </div>
  </template>
  
  <script setup>
    import { ref, reactive } from 'vue'
    import { ElMessage } from 'element-plus'
    let props = defineProps({
      lfFormData: {
        type: String,
        default: "",
      },
      isPreview: {
          type: Boolean,
          default: true,
      }
    });
    /* 注意：formJson是指表单设计器导出的json，此处演示的formJson只是一个空白表单json！！ */
    const formJson = reactive(JSON.parse(props.lfFormData));
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
  