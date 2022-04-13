<template>
<div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>数据统计</el-breadcrumb-item>
    <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

     <!-- 卡片视图 -->
    <el-card>
        <!-- 为Echarts准备一个具备大小（宽高）的Dom -->
        <div id="main" style="width: 600px;height:400px;"></div>
        
    </el-card>

</div>
</template>

<script>
// 导入echarts
import echarts from 'echarts'

export default {
    data(){},
    created(){},
    mouted(){
        // 
    },
    methods:{}
}
</script>

<style lang="less" scoped>

</style>