<template>
  <div>
     <!-- 面包屑导航区域 -->
     <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>用户管理</el-breadcrumb-item>
     <el-breadcrumb-item>用户列表</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图区域 -->
     <el-card>

         <!-- 使用分栏间隔el-row -->
        <el-row :gutter="20">
            <el-col :span="9">
                <!-- 搜索区域 -->
                <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>

            <el-col :span="4">
                <!-- 添加按钮添加区域 -->
                <el-button type="primary">添加用户</el-button>
            </el-col>
        </el-row>
    </el-card>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>