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
                <FormRender ref="formRenderSetting" :lfFormData="lfFormDataConfig" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref,computed, markRaw } from 'vue'
import FormRender from "@/components/DynamicForm/formRender.vue";
import { getViewBusinessProcess } from "@/api/mockflow"
import { bizFormMaps } from "@/utils/flow/const"
import { useStore } from '@/store/modules/workflow'
const modules = import.meta.glob("./forms/*.vue"); // 动态引入组件
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
let tips = "*未获取到外部表单信息，请联系管理员。";
let visible = computed({
  get() {  
    return true;
  }
})
/**
 * 动态加载业务表单组件
 */
const loadComponent = (formCode) => { 
  if (bizFormMaps.has(formCode)) {
    const componentPath = bizFormMaps.get(formCode);
    const componentPathVue = `.${componentPath}`;
    const importDybanicVue = modules[componentPathVue];
    importDybanicVue().then(component => {
      loadedComponent.value = markRaw(component.default)
    })
  }
} 
/**
 * 预览
 */
const preview = (param) => {
    let queryParams = ref({
        "formCode": param.formCode,
        "processNumber": param.processNumber,
        "type": 2,
        "isOutSideAccessProc": param.isOutSideAccess || false,
        "isLowCodeFlow": param.isLowCodeFlow || false
    });
    proxy.$modal.loading();
    getViewBusinessProcess(queryParams.value).then(response => {
        if (response.code == 200) {
            const responseData = response.data;
            if (responseData.isOutSideAccessProc) {//外部接入
                formData.value = responseData.formData;
            }
            else if (responseData.isLowCodeFlow) {//低代码表单
                lfFormDataConfig.value = responseData.lfFormData
            }
            else {//自定义开发表单
                loadComponent(param.formCode);
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
