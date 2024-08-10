<template>
    <div class="app-container">
        <section class="dingflow-design">
            <div class="zoom">
                <div class="zoom-out" :class="nowVal == 50 && 'disabled'" @click="zoomSize(1)"></div>
                <span>{{ nowVal }}%</span>
                <div class="zoom-in" :class="nowVal == 300 && 'disabled'" @click="zoomSize(2)"></div>
            </div>
            <div class="box-scale" :style="`transform: scale(${nowVal / 100});`">
                <nodeWrap v-model:nodeConfig="nodeConfig" />
                <div class="end-node">
                    <div class="end-node-circle"></div>
                    <div class="end-node-text">流程结束</div>
                </div>
            </div>
        </section>

    </div>
    <errorDialog v-model:visible="tipVisible" :list="tipList" />
    <promoterDrawer />
    <approverDrawer :directorMaxLevel="directorMaxLevel" />
    <copyerDrawer />
    <conditionDrawer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/store/modules/flow'
import { nodeTypeList } from '@/utils/flow/const'
import errorDialog from "@/components/flow/dialog/errorDialog.vue";
import promoterDrawer from "@/components/flow/drawer/promoterDrawer.vue";
import approverDrawer from "@/components/flow/drawer/approverDrawer.vue";
import copyerDrawer from "@/components/flow/drawer/copyerDrawer.vue";
import conditionDrawer from "@/components/flow/drawer/conditionDrawer.vue";

let { setTableId, setIsTried } = useStore()
const emit = defineEmits(['nextChange'])
let props = defineProps({
    processData: {
        type: Object,
        default: () => (null),
    }
});

let tipList = ref([]);
let tipVisible = ref(false);
let nowVal = ref(100);
let nodeConfig = ref({});
let directorMaxLevel = ref(3);
onMounted(async () => {
    if (props.processData) {
        nodeConfig.value = props.processData;
    }
});

const reErr = ({ childNode }) => {
    if (childNode) {
        let { nodeType, error, nodeName, conditionNodes } = childNode;
        if (nodeType == 1) {
            reErr(childNode);
        }
        else if (nodeType == 2) {
            reErr(childNode);
            for (var i = 0; i < conditionNodes.length; i++) {
                if (conditionNodes[i].error) {
                    tipList.value.push({ name: conditionNodes[i].nodeName, nodeType: "条件" });
                }
                reErr(conditionNodes[i]);
            }
        }
        else if (nodeType == 3) {
            reErr(childNode);
        }
        else if (nodeType == 4 || nodeType == 5) {
            if (error) {
                tipList.value.push({
                    name: nodeName,
                    nodeType: nodeTypeList[nodeType],
                });
            }
            reErr(childNode);
        }
    } else {
        childNode = null;
    }
};

const zoomSize = (type) => {
    if (type == 1) {
        if (nowVal.value == 50) {
            return;
        }
        nowVal.value -= 10;
    } else {
        if (nowVal.value == 300) {
            return;
        }
        nowVal.value += 10;
    }
};

const getJson = () => {
    setIsTried(true);
    tipList.value = [];
    reErr(nodeConfig.value);
    if (tipList.value.length != 0) {
        emit('nextChange', { label: "流程设计", key: "processDesign" });
        tipVisible.value = true;
        return;
    }
    let submitData = JSON.parse(JSON.stringify(nodeConfig.value));
    return submitData;
};

// 给父级页面提供得获取本页数据得方法
const getData = () => {
    let resData = getJson();
    return new Promise((resolve, reject) => {
        if (!resData) {
            return
        }
        resolve({ formData: resData })
    })
};
defineExpose({
    getData
})
</script>
<style scoped lang="scss">
@import "@/assets/styles/flow/workflow.scss";

.app-container {
    position: relative;
    background-color: #f5f5f7;
    min-height: calc(100vh);
    padding-top: 5px;
    margin-top: 20px !important;
    height: auto;
}

.clearfix {
    zoom: 1
}

.zoom {
    display: flex;
    position: fixed;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 40px;
    width: 125px;
    right: 40px;
    margin-top: 30px;
    z-index: 10
}

.zoom .zoom-in,
.zoom .zoom-out {
    width: 30px;
    height: 30px;
    background: #fff;
    color: #c1c1cd;
    cursor: pointer;
    background-size: 100%;
    background-repeat: no-repeat
}

.zoom .zoom-out {
    background-image: url(https://gw.alicdn.com/tfs/TB1s0qhBHGYBuNjy0FoXXciBFXa-90-90.png)
}

.zoom .zoom-out.disabled {
    opacity: .5
}

.zoom .zoom-in {
    background-image: url(https://gw.alicdn.com/tfs/TB1UIgJBTtYBeNjy1XdXXXXyVXa-90-90.png)
}

.zoom .zoom-in.disabled {
    opacity: .5
}
</style>