<template>
  <div>
     <!-- 面包屑导航区域 -->
     <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>商品管理</el-breadcrumb-item>
     <el-breadcrumb-item>参数列表</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图区域 -->
     <el-card>
         <!-- 警告区域 -->
         <el-alert
            title="注意：只允许为第三级分类设置相关参数!"
            type="warning"
            show-icon
        >
        </el-alert>
        <!-- 选择商品分类区域 -->
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
        return {
            // 商品分类列表
            catelist:[],

            // 级联选择框的配置对象
            cateProps:{
                // value为鼠标选中的值
                value:'cat_id',
                // label为选择中看到的值
                label:'cat_name',
                // children指定父子节点的嵌套属性
                children:'children'
            },

            // 级联选择框双向绑定到的数组
            selectedCateKeys:[]
        }
    },
    created(){
        // 获取所有的商品分类列表
        this.getCateList()
    },
    methods:{
        // 获取所有的商品分类列表
        async getCateList(){
            const {data:res}=await this.$http.get('categories')
            if(res.meta.status!==200){
                return this.$message.error('获取分类商品失败！')
            }

        this.catelist=res.data

        console.log(this.catelist)
        },

        // 级联选择框选中项变化，会触发这个函数
        handleChange(){
            if(this.selectedCateKeys.length!==3){
                this.selectedCateKeys=[]
                return
            }

            // 证明选中的是三级分类
            console.log(this.selectedCateKeys)
        }
    }
}
</script>

<style lang="less" scoped>
    .cat_opt{
        margin: 15px 0;
    }
</style>