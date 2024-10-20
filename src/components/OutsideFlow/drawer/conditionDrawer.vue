<!--
 * @Date: 2023-03-15 14:44:17
 * @LastEditors: LDH 574427343@qq.com
 * @LastEditTime: 2023-05-24 15:20:48
 * @FilePath: /ant-flow/src/components/drawer/conditionDrawer.vue
-->

<template>
    <el-drawer :append-to-body="true" title="条件设置" v-model="visible" class="condition_copyer"  :with-header="false" :size="680">
        <span class="drawer-title">条件设置</span> 
        <template #header="{ titleId, titleClass }">
            <h3 :id="titleId" :class="titleClass">条件设置</h3>
            <select v-model="conditionConfig.priorityLevel" class="priority_level">
                <option v-for="item in conditionsConfig.conditionNodes.length" :value="item" :key="item">优先级{{item}}</option>
            </select>
        </template>
        <div class="demo-drawer__content">
            <div class="condition_content drawer_content">
                <p class="tip">当审批单满足以下条件时进入此流程</p>
                
                <ul>
                    <li v-for="(item,index) in conditionConfig.conditionList" :key="index"> 
                        <div style="font-size: small;"> 
                            <span style="margin-right: 10px;width: 100px;overflow: hidden;">{{ item.showName }} </span>
                            <el-select v-model="item.zdy1"  placeholder="请选择条件" style="width: 300px">
                                <el-option v-for="opt in JSON.parse(item.fixedDownBoxValue)" :key="opt.key" :label="opt.value" :value="opt.key" />
                            </el-select>
                        </div>   
                    </li>
                </ul>         
            </div>
   
            <div class="demo-drawer__footer clear">
                <el-button type="primary" @click="saveCondition">确 定</el-button>
                <el-button @click="closeDrawer">取 消</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script setup>
import { ref, watch, computed, onMounted } from 'vue' 
import $func from '@/utils/flow/index'
import { useStore } from '@/store/modules/outsideflow'
import { getConditions } from '@/api/mockoutsideflow'  
let store = useStore()
let { setCondition, setConditionsConfig } = store
let conditionsConfig = ref({
    conditionNodes: [],
})
let conditionConfig = ref({})
let PriorityLevel = ref('')
let conditionConfigDef=ref({}) 
let conditionsConfig1 = computed(()=> store.conditionsConfig1)
let conditionDrawer = computed(()=> store.conditionDrawer)
let visible = computed({
    get() {
        return conditionDrawer.value
    },
    set() {
        closeDrawer()
    }
})

watch(conditionsConfig1, (val) => { 
    conditionsConfig.value = val.value;
    PriorityLevel.value = val.priorityLevel 
    conditionConfig.value = val.priorityLevel ? conditionsConfig.value.conditionNodes[val.priorityLevel - 1] : conditionConfigDef
    if(Array.isArray(conditionConfig.value.conditionList) && conditionConfig.value.conditionList.length == 0){
        conditionConfig.value.conditionList = conditionConfigDef.value.conditionList
    }
}) 
onMounted(async () => {
    let { data } =await getConditions();
    conditionConfigDef.value = { 
        nodeApproveList: [], 
        conditionList: data
    } 
})
 
const saveCondition = () => {
    closeDrawer()  
    var a = conditionsConfig.value.conditionNodes.splice(PriorityLevel.value - 1, 1)//截取旧下标
    conditionsConfig.value.conditionNodes.splice(conditionConfig.value.priorityLevel - 1, 0, a[0])//填充新下标
    conditionsConfig.value.conditionNodes.map((item, index) => {
        item.priorityLevel = index + 1
    });
    for (var i = 0; i < conditionsConfig.value.conditionNodes.length; i++) {
        conditionsConfig.value.conditionNodes[i].error = $func.conditionStr(conditionsConfig.value, i) == "请设置条件" && i != conditionsConfig.value.conditionNodes.length - 1
        conditionsConfig.value.conditionNodes[i].nodeDisplayName =  $func.conditionStr(conditionsConfig.value, i);
    }
    setConditionsConfig({
        value: conditionsConfig.value,
        flag: true,
        id: conditionsConfig1.value.id
    })
}

const closeDrawer = (val) => {
    setCondition(false)
}
</script>
<style scoped lang="scss">  
@import "@/assets/styles/flow/dialog.scss";
.condition_copyer {
    .priority_level {
        position: absolute;
        top: 11px;
        right: 30px;
        width: 100px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(217, 217, 217, 1);
        font-size: 12px;
    }
    .condition_content {
        padding: 20px 20px 0;
        p.tip {
            margin: 20px 0;
            width: 610px;
            text-indent: 17px;
            line-height: 50px;
            background: rgba(241, 249, 255, 1);
            border: 1px solid rgba(64, 163, 247, 1);
            color: #46a6fe;
            font-size: 14px;
        }
        ul {
            max-height: 500px;
            overflow-y: scroll;
            margin-bottom: 20px;     
            li { 

                p.selected_list {
                    padding-left: 10px;
                    border-radius: 4px;
                    min-height: 32px;
                    // border: 1px solid rgba(217, 217, 217, 1);
                    word-break: break-word;
                }
 
            }
        } 
    }
}

 
</style>