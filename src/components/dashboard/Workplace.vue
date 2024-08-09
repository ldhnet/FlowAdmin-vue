<template>
    <el-card >
        <template v-slot:header>
            <div class="clearfix">
                <span>考勤管理（4）</span>
            </div>
        </template> 
        <el-row :gutter="10">
            <el-col :md="6">
                <el-card shadow="always"  class="card-col">
                    <div slot="title">                    
                        <div class="card-icon">
                            <el-avatar size="large" src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png" />
                        </div>
                        <div class="card-title">
                            <a>请假申请</a>
                            <p>请假申请流程办理</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="6">
                <el-card shadow="always" class="card-col">
                    <div slot="title" >                        
                        <div class="card-icon">
                            <el-avatar size="large"
                            src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/person.png" />
                        </div>
                        <div class="card-title">
                            <a>加班申请</a>
                            <p>加班申请流程办理</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="6">
                <el-card shadow="always" class="card-col">
                    <div slot="title" > 
                        <div class="card-icon">
                            <el-avatar size="large"
                                src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/sealing.png" />
                        </div>
                        <div class="card-title">
                            <a>打卡申诉</a>
                            <p>打卡申诉流程办理</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="6">
                <el-card shadow="always" class="card-col">
                    <div slot="title">
                        <div class="card-icon">
                            <el-avatar size="large"
                            src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/overtime.png" />
                        </div>
                        <div class="card-title">
                            <a>工时录入</a>
                            <p>工时录入流程办理</p>
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
            <el-col :md="6">
                <el-card shadow="always"  class="card-col">
                    <div slot="title">                    
                        <div class="card-icon">
                            <el-avatar size="large" src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png" />
                        </div>
                        <div class="card-title">
                            <a>人员入职流程</a>
                            <p>人员入职流程办理</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="6">
                <el-card shadow="always" class="card-col">
                    <div slot="title" >                        
                        <div class="card-icon">
                            <el-avatar size="large"
                            src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/person.png" />
                        </div>
                        <div class="card-title">
                            <a>人员转正流程</a>
                            <p>人员转正流程办理</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="6">
                <el-card shadow="always" class="card-col">
                    <div slot="title" > 
                        <div class="card-icon">
                            <el-avatar size="large"
                                src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/sealing.png" />
                        </div>
                        <div class="card-title">
                            <a>人员离职流程</a>
                            <p>人员离职流程办理</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="6">
                <el-card shadow="always" class="card-col">
                    <div slot="title">
                        <div class="card-icon">
                            <el-avatar size="large"
                            src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/overtime.png" />
                        </div>
                        <div class="card-title">
                            <a>人员离职交接流程</a>
                            <p>人员离职交接流程办理</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row> 

        <el-row :gutter="10">
            <el-col :md="6">
                <el-card shadow="always"  class="card-col">
                    <div slot="title">                    
                        <div class="card-icon">
                            <el-avatar size="large" src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png" />
                        </div>
                        <div class="card-title">
                            <a>部门调动流程</a>
                            <p>部门调动流程办理</p>
                        </div>
                    </div>
                </el-card>
            </el-col>
           
        </el-row> 
    </el-card> 
</template>

<script>

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