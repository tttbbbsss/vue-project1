<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <el-row>
            <el-col :span="8"></el-col>
            <el-col :span="4"></el-col>
        </el-row>

        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    // 生命周期函数
    created(){

    },
    methods:{}
}
</script>

<style lang="less" scoped>

</style>