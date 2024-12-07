<template>
  <div>
    <el-row>
      <el-col :span="16">
        <v-form-render ref="vFormRef" :form-json="formJson" :form-data="formData" :option-data="optionData"> </v-form-render>
      </el-col>  
    </el-row> 
    <el-row>  
      <el-col :span="16">
        <el-button v-if="!isPreview" type="primary" @click="submitForm">提交</el-button>
      </el-col>
    </el-row> 
  </div>
</template>
  
  <script setup>
    import { ref, reactive,getCurrentInstance } from 'vue'
    import { ElMessage } from 'element-plus'
    const { proxy } = getCurrentInstance()
    let props = defineProps({
      lfFormData: {
        type: String,
        default: "{}",
      },
      lfFieldsData: {
        type: String,
        default: "{}",
      }, 
      isPreview: {
          type: Boolean,
          default: true,
      }
    });
    /* 注意：formJson是指表单设计器导出的json，此处演示的formJson只是一个空白表单json！！ */
    const formJson = reactive(JSON.parse(props.lfFormData||"{}"));
    const formData = reactive(JSON.parse(props.lfFieldsData||"{}"));
    const optionData = reactive({});
    const vFormRef = ref(null)
  
    const submitForm = () => {
      vFormRef.value.getFormData().then(formData => {
        // Form Validation OK
        console.log("Form Validation===", JSON.stringify(formData))
        proxy.$emit("handleBizBtn", JSON.stringify(formData))
      }).catch(error => { 
        ElMessage.error(error)
      })
    }
  const handleValidate = () => {
    return new Promise((resolve, reject) => {
      try {
        vFormRef.value.validateForm((isValid) => { 
          resolve(isValid);
        });
      } catch (error) {
        reject(false);
      }
    });
  }

  const getFromData = () => {
    return new Promise((resolve, reject) => {
      try {
        vFormRef.value.getFormData().then(formData => {
          resolve(JSON.stringify(formData));
        }).catch(err => {
          reject("");
        })
      } catch (error) {
        reject("");
      }
    });
  }
  defineExpose({
    handleValidate,
    getFromData
  })
  </script>
  
