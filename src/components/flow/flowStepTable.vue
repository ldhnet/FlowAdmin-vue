<template>
    <div>
        <el-table v-loading="loading" :data="activityList">
            <!-- <el-table-column label="序号" align="center" prop="id" /> -->
            <el-table-column label="流程环节" align="center" prop="taskName" />
            <el-table-column label="执行人" align="center" prop="verifyUserName" />
            <el-table-column label="操作" align="center" prop="type">
                <template #default="item">
                    <el-tag :type="item.row.type">{{ item.row.verifyStatusName ?? "结束" }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="审批意见" align="center" prop="remark" />
            <el-table-column label="处理时间" align="center" prop="verifyDate" width="180">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.verifyDate) }}</span>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { statusColor } from '@/utils/flow/const';
import { getBpmVerifyInfoVos } from '@/api/mockflow';

let activityList = ref(null);
let loading = ref(false);

onMounted(async () => {
    loading.value = true;
    await getPreviewData();
})
const getPreviewData = async () => {
    let param = {
        "processNumber": "DSFZH_WMA_9",
    }
    let resData = await getBpmVerifyInfoVos(param);
    loading.value = false;
    if (resData.code == 200) {
        activityList.value = resData.data.map(c => {
            return {
                ...c,
                type: statusColor[c.verifyStatus],
                size: c.verifyStatus == 99 ? 'large' : 'normal',
                remark: c.verifyStatus == 0 ? '流程结束' : c.verifyDesc
            }
        })
    };
};

</script>
<style lang="scss"></style>