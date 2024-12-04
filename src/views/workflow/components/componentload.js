import { ref, markRaw } from 'vue' 
import { bizFormMaps } from "@/utils/flow/const"
const modules = import.meta.glob("./forms/*.vue"); // 动态引入组件

/**
 * 动态加载业务表单组件
 */
export const loadComponent = (flowCode) => {
  return new Promise((resolve, reject) => { 
    if (bizFormMaps.has(flowCode)) {
      const componentPath = bizFormMaps.get(flowCode);
      const componentPathVue = `.${componentPath}`;
      const importDybanicVue = modules[componentPathVue];
      importDybanicVue()
        .then((component) => {
          resolve(markRaw(component.default));
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    } else {
      reject();
    }
  });
};   
