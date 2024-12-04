<template>
    <div v-if="visible">
        <div v-if="loadFaild" >
            <p style="font-size: small;color: red;text-align: center;margin: 0 10%;">
                {{ tips }}
            </p>
        </div>
        <div v-if="componentLoaded">
            <!-- style="pointer-events: none;" -->
            <component :is="loadedComponent" :previewData="componentData" :isPreview="isPreview"></component>
        </div>
        <div v-if="viewConfig.isOutSideAccess">
            <p v-if="formData" v-html="formData"></p>
        </div>
        <div v-if="viewConfig.isLowCodeFlow">
            <div style="background: white !important; padding: 30px;max-width: 850px;min-height: 520px;left: 0;right: 0;margin: auto;">
                <FormRender ref="formRenderSetting" 
                        v-if="lfFormDataConfig"  
                        :lfFormData="lfFormDataConfig" 
                        :lfFieldsData="lfFieldsConfig" 
                        :isPreview="isPreview"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,computed } from 'vue'
import FormRender from "@/components/DynamicForm/formRender.vue";
import { getViewBusinessProcess } from "@/api/mockflow" 
import { useStore } from '@/store/modules/workflow' 
import {loadComponent} from '@/views/workflow/components/componentload.js'
const { proxy } = getCurrentInstance()
let store = useStore()
let viewConfig = computed(() => store.instanceViewConfig1)

let props = defineProps({
    isPreview: {
        type: Boolean,
        default: false,
    }
}); 

let loadFaild = ref(false);
let componentData = ref(null);
let componentLoaded = ref(false);
let formData = ref(null);
let loadedComponent = ref(null); 
let lfFormDataConfig = ref(null);
let lfFieldsConfig = ref(null);

let tips = "*未获取到外部表单信息，请联系管理员。";
let visible = computed({
  get() {  
    return true;
  }
})
 
/**
 * 预览
 */
const preview = async (param) => {
    let queryParams = ref({
        "formCode": param.formCode,
        "processNumber": param.processNumber,
        "type": 2,
        "isOutSideAccessProc": param.isOutSideAccess || false,
        "isLowCodeFlow": param.isLowCodeFlow || false
    });
    proxy.$modal.loading();
    await getViewBusinessProcess(queryParams.value).then(async (response) => {
        if (response.code == 200) {
            const responseData = response.data;
            if (responseData.isOutSideAccessProc) {//外部接入
                formData.value = responseData.formData;
            }
            else if (responseData.isLowCodeFlow) {//低代码表单
                lfFormDataConfig.value = responseData.lfFormData;
                lfFieldsConfig.value = JSON.stringify(responseData.lfFields);
                console.log('lfFieldsConfig.value===========',lfFieldsConfig.value)
            }
            else {//自定义开发表单
                loadedComponent.value = await loadComponent(param.formCode);
                componentData.value = responseData;
                componentLoaded.value = true
            }
        } else {
            loadFaild.value = true
        }
        proxy.$modal.closeLoading();
    });
}
preview(viewConfig.value);
</script>
