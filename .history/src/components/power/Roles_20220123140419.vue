<template>
  <div>
     <!-- 面包屑导航区域 -->
     <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>权限管理</el-breadcrumb-item>
     <el-breadcrumb-item>角色列表</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图 -->
     <el-card>
         <!-- 添加角色按钮区域 -->
         <el-row>
             <el-col>
                 <el-button type="primary">添加角色</el-button>
             </el-col>
         </el-row>

         <!-- 角色列表区域 -->

     </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            // 定义所有角色列表数据
            rolelist:[]
        }
    }
}
</script>

<style lang='less' scoped>

</style>