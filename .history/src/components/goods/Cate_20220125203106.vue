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
        <tree-table
            :data="catelist"
            :columns="columns"
            :selection-type="false"
            :expand-type="false"
            show-index
            border
        >

            <!-- 是否有效 -->
            <!-- slot-scope="scope"用于接收作用域插槽slot="isok"的数据 -->
            <template slot="isok" slot-scope="scope">
                <i 
                    class="el-icon-success" 
                    v-if="scope.row.cat_deleted===false"
                    style="color:lightgreen;"
                ></i>
                <i 
                    class="el-icon-error" 
                    v-else
                    style="color:red;"
                ></i>
            </template>

            <!-- 排序 -->
            <template slot="order" slot-scope="scope">
                <el-tag size="mini" v-if="scope.row.cat_level===0">一级</el-tag>
                <el-tag size="mini" type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
                <el-tag size="mini" type="warning" v-else>三级</el-tag>
            </template>

            <!-- 操作 -->
            <template slot="opt">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>

        </tree-table>

        <!-- 分页区域 -->
        <!--@size-change是  -->
        <!-- @current-change是当前页码值变化 -->
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>

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
            total:0,

            // 为table指定列的定义
            columns:[
                {
                    label:'分类名称',
                    prop:'cat_name'
                },
                {
                    label:'是否有效',
                    // 表示将当前列定义为模板列
                    type:'template',
                    // 表示当前这一列使用模板名称
                    template:'isok'
                },
                {
                    label:'排序',
                    // 表示将当前列定义为模板列
                    type:'template',
                    // 表示当前这一列使用模板名称
                    template:'order'
                },
                {
                    label:'操作',
                    // 表示将当前列定义为模板列
                    type:'template',
                    // 表示当前这一列使用模板名称
                    template:'opt'
                }
            ]
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
        },

        // 监听pagesize改变的事件
        handleSizeChange(newSize){
            this.querInfo.pagesize=newSize
            this.getCateList()
        }
    }
}
</script>

<style lang="less" scoped>

</style>