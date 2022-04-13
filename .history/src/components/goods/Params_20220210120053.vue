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

        <!-- tab页签区域 -->
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <!-- 添加动态参数的面板 -->
            <el-tab-pane label="动态参数" name="many">
                <!-- 添加参数的按钮 -->
                <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
                <!-- 动态参数表格 -->
                <el-table :data="manyTableData" border stripe>
                    <!-- 索引列 -->
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template >
                            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>    
            <!-- 添加静态属性的面板 -->
            <el-tab-pane label="静态属性" name="only">
                <!-- 添加属性的按钮 -->
                <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
            </el-tab-pane>
        </el-tabs>

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
            selectedCateKeys:[],
            // 被激活的页签的名称
            activeName:'many',
            // 动态参数的数据
            manyTableData:[],
            // 静态参数的数据
            onlyTableData:[]

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

        },

        // 级联选择框选中项变化，会触发这个函数
        handleChange(){
            this.getParamsData()
        },

        // tab页签点击事件的处理函数
        handleTabClick(){
            console.log(this.activeName)
            this.getParamsData
        },

        // 获取参数的列表数据
        async getParamsData(){
            if(this.selectedCateKeys.length!==3){
                this.selectedCateKeys=[]
                return
            }

            // 证明选中的是三级分类
            // 根据所选分类的Id，和当前所处的面板，获取对应的参数
            const {data:res}=await this.$http.get(`categories/${this.cateId}/attributes`,
            {params:{sel:this.activeName}})

            if(res.meta.status!==200){
                return this.$message.error('获取参数列表失败！')
            }

            console.log(res.data)
            if(this.activeName==='many'){
                this.manyTableData=res.data
            }
            else {
                this.onlyTableData=res.data
            }
        }
    },
    computed:{
        // 如果按钮需要被禁用，则返回true，否则返回false
        isBtnDisabled(){
            if(this.selectedCateKeys.length!==3){
                return true
            }
            return false
        },

        // 当前选中的三级分类的ID
        cateId(){
            if(this.selectedCateKeys.length===3){
                return this.selectedCateKeys[2]
            }
            return null
        }
    }
}
</script>

<style lang="less" scoped>
    .cat_opt{
        margin: 15px 0;
    }
</style>