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
            <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">添加商品</el-button>
            </el-col>
        </el-row>

        </el-card>

        <!-- table表格区域 -->
        <el-table :data="goodslist" border stripe>
            <el-table-column type="index">

            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // 查询参数对象
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:10
            },
            // 商品列表
            goodslist:[],
            // 总数据条数
            total:0
        }
    },
    // 生命周期函数
    created(){
        this.getGoodsList()
    },
    methods:{
        // 根据分页获取对应的商品列表
        async getGoodsList(){
            const {data:res}=await this.$http.get('goods',{params:this.queryInfo})

            if(res.meta.status!==200){
                return this.$message.error('获取商品列表失败！')
            }
            console.log(res.data)
            // goods保存在商品列表中
            this.goodslist=res.data.goods
            this.total=res.data.total
        }
    }
}
</script>

<style lang="less" scoped>

</style>