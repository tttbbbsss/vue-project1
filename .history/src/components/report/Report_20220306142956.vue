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
import * as echarts from 'echarts';
import _ from 'lodash'

export default {
    data(){
        return{
            // 需要合并的数据
            options: {
                title: {
                    text: '用户来源'
                },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#E9EEF3'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
                },
            xAxis: [
                {
                    boundaryGap: false
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ]
        }
        }
    },
    created(){},
    // mouted是在DOM完成之后的生命周期，此时页面上的元素，已经被渲染完毕
    async mounted(){
        //使用echarts第3步： 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        const {data:res}=await this.$http.get('reports/type/1')
        if(res.meta.status!==200){
            return this.$message.error('获取折线图数据失败！')
        }

        // 使用echarts第4步：准备数据和配置项
        const result=_.merge(res.data,this.options)

        //使用echarts第5步 :展示数据,使用刚指定的配置项和数据显示图表。
        myChart.setOption(result);
    },
    methods:{}
}
</script>

<style lang="less" scoped>

</style>