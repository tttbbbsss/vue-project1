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
                 <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
             </el-col>
         </el-row>

        <!-- 表格 -->
        <tree-table
            class="treeTable"
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
        <!--@size-change是页码值大小变化  -->
        <!-- @current-change是当前页码值变化 -->
        <!-- current-page当前所渲染的页码 -->
        <!-- page-size表示当前每页绑定多少数据 -->
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="querInfo.pagenum"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="querInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

     </el-card>

     <!-- 添加分类的对话框 -->
     <!-- :visible.sync="addCateDialogVisible"控制对话框的显示与隐藏 -->
     <el-dialog
        title="添加分类"
        :visible.sync="addCateDialogVisible"
        width="50%"
    >
        <el-form 
            :model="addCateForm" 
            :rules="addCateFormRules" 
            ref="addCateFormRef" 
            label-width="100px" 
        >
            <el-form-item label="分类名称" prop="cate_name">
                <el-input v-model="addCateForm.cate_name"></el-input>
            </el-form-item>
        </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="addCateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCateDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>

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
            ],

            // 控制添加分类对话框的显示与隐藏
            addCateDialogVisible:false,

            // 添加分类的表单数据对象
            addCateForm:{
                // 将要添加的分类的名称
                cat_name:'',
                // 父级分类的id
                cat_pid:0,
                // 当前分类的等级，默认要添加的是1级分类
                cat_level:0
            },

            // 添加分类表单的验证规则对象
            addCateFormRules:{
                cate_name:[
                    {required:true,message:'请输入分类名称',trigger:'blur'},
                ]
            }
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
        },

        //监听pagenum改变 
        handleCurrentChange(newPage){
            this.querInfo.pagenum=newPage
            this.getCateList()
        },

        // 点击按钮，展示添加分类的对话框
        showAddCateDialog(){
            this.addCateDialogVisible=true
        }
    }
}
</script>

<style lang="less" scoped>
    .treeTable{
        margin-top: 15px;
    }
</style>