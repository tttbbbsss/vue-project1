<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>

         <!-- 卡片视图 -->
        <el-card>
            <el-row :span="8">
                
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    created(){},
    methods:{}
}
</script>

<style lang="less" scoped>

</style>