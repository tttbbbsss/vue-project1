<template>
  <div>
     <!-- 面包屑导航区域 -->
     <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>商品管理</el-breadcrumb-item>
     <el-breadcrumb-item>商品分类</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图区域 -->
     <el-card>
         <!-- 按钮区域 -->
         <el-row>
             <el-col>
                 <el-button type="primary">添加分类</el-button>
             </el-col>
         </el-row>

        <!-- 表格 -->

        <!-- 分页区域 -->
     </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            // 查询条件
            querInfo:{
                type:3,
                pagenum:1,
                pagesize:5
            },
            // 商品分类的数据列表，默认为空
            catelist:[],

            // 总数据条数
            total:0
        }
    },
    created(){
        this.getCateList()
    },
    methods:{
        // 获取商品分类的数据
        // get(路径，参数{params:查询条件})
        async getCateList(){
            const {data:res}=await this.$http.get('categories',{params:this.querInfo})

            if(res.meta.status!==200){
                return this.message.error('获取商品分类失败！')
            }

            // 把数据列表赋值给catelist
            this.catelist=res.data.result
            // 为总数据条数赋值
            this.total=res.data.total
        }
    }
}
</script>

<style lang="less" scoped>

</style>