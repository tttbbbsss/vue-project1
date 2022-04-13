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
        <!-- 使用echarts第2步：为Echarts准备一个具备大小（宽高）的Dom -->
        <div id="main" style="width: 600px;height:400px;"></div>
        
    </el-card>

</div>
</template>

<script>
// 使用echarts第1步：导入echarts
import echarts from 'echarts'

export default {
    data(){},
    created(){},
    // mouted是在DOM完成之后的生命周期，此时页面上的元素，已经被渲染完毕
    mouted(){
        //使用echarts第3步： 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 使用echarts第4步：准备数据和配置项
        var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
            ]
        };

        //使用echarts第5步 :展示数据,使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    methods:{}
}
</script>

<style lang="less" scoped>

</style>