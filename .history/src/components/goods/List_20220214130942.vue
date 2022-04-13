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
            <el-row class="cat_opt">
            <el-col>
                <span>选择商品分类：</span>

                <!-- 选择商品分类的级联选择器 -->
                <el-cascader
                    v-model="selectedCateKeys"
                    expand-trigger="hover"
                    :options="catelist"
                    :props="cateProps"
                    @change="handleChange">
                </el-cascader>

            </el-col>
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