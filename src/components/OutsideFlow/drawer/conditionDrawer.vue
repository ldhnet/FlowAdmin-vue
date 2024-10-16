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
                <p class="tip">当审批单同时满足以下条件时进入此流程</p>
                <ul>
                    <li v-for="(item,index) in conditionConfig.conditionList" :key="index"> 
                        <div style="font-size: small;"> 
                            <span style="color: gray;margin-right: 10px;width: 100px;overflow: hidden;">{{ item.showName }} </span>
                            <el-select v-model="item.zdy1"  placeholder="请选择" style="width: 300px">
                                <el-option v-for="opt in JSON.parse(item.fixedDownBoxValue)" :key="opt.value" :label="opt.label" :value="opt.value" :disabled="item.disabled" />
                            </el-select>
                        </div> 
                        <a @click="$func.removeEle(conditionConfig.conditionList,item,'columnId')">删除</a>
                    </li>
                </ul>
                <el-button type="primary" @click="addCondition">添加条件</el-button>
                <el-dialog title="选择条件" v-model="conditionVisible" :width="480" append-to-body class="condition_list">
                    <p class="tip">请选择用来区分审批流程的条件字段</p>
                    <p class="check_box"> 
                         <template  v-for="(item,index) in conditions" :key="index" >                        
                             <a :class="$func.toggleClass(conditionList,item,'columnId')&&'active'"  @click="$func.toChecked(conditionList,item,'columnId')">{{item.showName}}</a>
                             <br v-if="(index + 1)%3 == 0"/> 
                         </template> 
                    </p>
                    <template #footer>
                        <el-button @click="conditionVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sureCondition">确 定</el-button>
                    </template>
                </el-dialog>
            </div>
   
            <div class="demo-drawer__footer clear">
                <el-button type="primary" @click="saveCondition">确 定</el-button>
                <el-button @click="closeDrawer">取 消</el-button>
            </div>
        </div>
    </el-drawer>
</template>
<script setup>
import { ref, watch, computed } from 'vue' 
import $func from '@/utils/flow/index'
import { useStore } from '@/store/modules/outsideflow'
import { getConditions } from '@/api/mockoutsideflow' 

let conditionVisible = ref(false)
let conditionsConfig = ref({
    conditionNodes: [],
})
let conditionConfig = ref({})
let PriorityLevel = ref('')
let conditions = ref([])
let conditionList = ref([]) 
let store = useStore()
let { setCondition, setConditionsConfig } = store
let tableId = computed(()=> store.tableId)
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
    conditionConfig.value = val.priorityLevel
        ? conditionsConfig.value.conditionNodes[val.priorityLevel - 1]
        : { nodeApproveList: [], conditionList: [] }
}) 
const addCondition = async () => { 
    conditionList.value = [];
    conditionVisible.value = true;
    let { data } = await getConditions({ tableId: tableId.value })
    conditions.value = data;
    if (conditionConfig.value.conditionList) {

        for (var i = 0; i < conditionConfig.value.conditionList.length; i++) {
            var { columnId } = conditionConfig.value.conditionList[i]
            if (columnId == 0) {
                conditionList.value.push({ columnId: 0 })
            } else {
                conditionList.value.push(conditions.value.filter(item => { return item.columnId == columnId; })[0])
            }
        }
    }
}
const sureCondition = () => { 
    for (var i = 0; i < conditionList.value.length; i++) {
        var { columnId, showName, columnName, showType, columnType, fixedDownBoxValue } = conditionList.value[i];  
        if ($func.toggleClass(conditionConfig.value.conditionList, conditionList.value[i], "columnId")) {
            continue;
        }
        if (columnId == 0) {
            conditionConfig.value.nodeApproveList = [];
            conditionConfig.value.conditionList.push({
                "type": 1,
                "columnId": columnId,
                "showName": '发起人'
            });
        } else { 
            conditionConfig.value.conditionList.push({
                    "showType": showType,
                    "columnId": columnId,
                    "type": 2,
                    "showName": showName,
                    "zdy1": "",
                    "columnDbname": columnName,
                    "columnType": columnType,
                    "fixedDownBoxValue": fixedDownBoxValue
            })
        }
    } 
    for (let i = conditionConfig.value.conditionList.length - 1; i >= 0; i--) {
        if (!$func.toggleClass(conditionList.value, conditionConfig.value.conditionList[i], "columnId")) {
            conditionConfig.value.conditionList.splice(i, 1);
        }
    }
    conditionConfig.value.conditionList.sort(function (a, b) { return a.columnId - b.columnId; }); 
    conditionVisible.value = false;
}
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
                // border-bottom: 1px solid #F2F2F2;
                margin-bottom: 20px;
                &>span {
                    float: left;
                    margin-right: 5px;
                    width: 70px;
                    line-height: 65px;
                    text-align: right;
                    color: #0857a1;
                    font-size: 14px;

                }

                &>div {
                    display: inline-block;
                    width: 80%;

                    &>p:not(:last-child) {
                        margin-bottom: 10px;
                    }
                }

                &:not(:last-child)>div>p {
                    margin-bottom: 20px;
                }

                &>a {
                    float: right;
                    margin-right: 10px;
                    margin-top: 10px;
                    color: #46a6fe;
                    font-size: 14px;
                }

                select,
                input {
                    width: 100%;
                    height: 32px;
                    background: rgba(255, 255, 255, 1);
                    border-radius: 4px;
                    border: 1px solid rgba(217, 217, 217, 1);
                }

                select+input {
                    width: 260px;
                }

                select {
                    margin-right: 10px;
                    width: 100px;
                }

                p.selected_list {
                    padding-left: 10px;
                    border-radius: 4px;
                    min-height: 32px;
                    // border: 1px solid rgba(217, 217, 217, 1);
                    word-break: break-word;
                }

                p.check_box {
                    line-height: 32px;
                }
            }
        }

        .el-button {
            margin-bottom: 20px;
        }
    }
}

.condition_list {
    .el-dialog__body {
        padding: 16px 26px;
    }

    p {
        color: #666666;
        margin-bottom: 10px;

        &>.check_box {
            margin-bottom: 0;
            line-height: 36px;
        }
    }
}
</style>