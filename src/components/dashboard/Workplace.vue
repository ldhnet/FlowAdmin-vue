<template>
      <el-card > 
        <template v-slot:header>
            <div class="clearfix">
                <span>可用流程</span>
            </div>
        </template> 
        <el-row :gutter="10">
            <el-col :md="6" v-for="(item, index) in enableList" >
                <el-card shadow="always"  class="card-col" @click="handleStart(item)">
                    <div slot="title">                    
                        <div class="card-icon">
                            <el-avatar  size="large">
                                <img  :src="item.IconUrl" />
                            </el-avatar>
                        </div>
                        <div class="card-title">
                            <a>{{ item.title }}</a>
                            <p>{{ item.description }}</p>
                        </div>
                    </div>
                </el-card>
            </el-col> 
        </el-row> 
    </el-card> 
    <el-card >
        <template v-slot:header>
            <div class="clearfix">
                <span>考勤管理（4）</span>
            </div>
        </template> 
        <el-row :gutter="10">
            <el-col :md="6" v-for="(item, index) in flowList" >
                <el-card shadow="always"  class="card-col" @click="handleFlow">
                    <div slot="title">                    
                        <div class="card-icon">
                            <el-avatar size="large" :src="item.IconUrl"/>
                        </div>
                        <div class="card-title">
                            <a>{{ item.title }}</a>
                            <p>{{ item.description }}</p>
                        </div>
                    </div>
                </el-card>
            </el-col> 
        </el-row> 
    </el-card> 
    <el-card>
        <template v-slot:header>
            <div class="clearfix">
                <span>人事管理（5）</span>
            </div>
        </template> 
        <el-row :gutter="10">
            <el-col :md="6" v-for="(item, index) in hrList" >
                <el-card shadow="always"  class="card-col" @click="handleFlow">
                    <div slot="title">                    
                        <div class="card-icon">
                            <el-avatar size="large" :src="item.IconUrl"/>
                        </div>
                        <div class="card-title">
                            <a>{{ item.title }}</a>
                            <p>{{ item.description }}</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row> 
    </el-card> 
</template>

<script setup> 
 const { proxy } = getCurrentInstance();
function handleFlow(row) {
   proxy.$modal.msgSuccess("演示环境努力开发中！");
 }

 const flowList = [
    { 
        title: "请假申请",
        description: "请假申请流程办理",
        IconUrl:"src/assets/images/work/leave.png"
    },
    {
        title: "加班申请",
        description: "加班申请流程办理",
        IconUrl:"src/assets/images/work/person.png"
    },
    {
        title: "打卡申诉",
        description: "打卡申诉流程办理",
        IconUrl:"src/assets/images/work/daka.png"
    },
    {
        title: "工时录入",
        description: "工时录入流程办理",
        IconUrl:"src/assets/images/work/overtime.png"
    }
 ]; 

 const hrList = [
    { 
        title: "人员入职流程",
        description: "人员入职流程办理",
        IconUrl:"src/assets/images/work/richang.png"
    },
    {
        title: "人员转正流程",
        description: "人员转正流程办理",
        IconUrl:"src/assets/images/work/zhushou.png"
    },
    {
        title: "人员离职流程",
        description: "人员离职流程办理",
        IconUrl:"src/assets/images/work/worktile.png"
    },
    {
        title: "人员离职交接流程",
        description: "人员离职交接流程办理",
        IconUrl:"src/assets/images/work/icon-manage-04.png"
    },
    {
        title: "部门调动流程",
        description: "部门调动流程办理",
        IconUrl:"src/assets/images/work/jiejing.png"
    }
 ]; 

 const enableList= [ 
    {
        formCode:"DSFZH_WMA",
        title: "第三方账号申请",
        description: "第三方账号申请办理",
        IconUrl:"src/assets/images/work/person.png"
    },
    { 
        formCode:"LEAVE_WMA",
        title: "请假申请",
        description: "请假申请流程办理",
        IconUrl:"src/assets/images/work/leave.png"
    }
 ]; 


function handleStart(row) { 
    if (row.formCode == "DSFZH_WMA") { 
        const obj = { path: "/bizdemo/demo1" };
        proxy.$tab.openPage(obj);
    }
    if (row.formCode == "LEAVE_WMA") { 
        const obj = { path: "/bizdemo/demo2" };
        proxy.$tab.openPage(obj);
    }

}
</script>
<style lang="scss" scoped>
 .card-col {
     cursor: pointer;
     margin-bottom: 10px;

     &:hover {
         background: rgba(0, 0, 0, 0.45);

         .card-title a,
         p {
             color: #ffff;
         }
     }

 }

.card-title {
     float: left;
     margin-left: 15px;

     a {
         margin-bottom: 8px;
         font-size: 14px;
         color: #1890ff;
         overflow: hidden;
     }

     p {
         font-size: 12px;
         font-weight: 300;
         overflow: hidden;
     }
 }

.card-icon {
     float: left;
     transform: translate(5%, -10%);
 }
</style>