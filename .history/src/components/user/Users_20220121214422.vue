<template>
  <div>
     <!-- 面包屑导航区域 -->
     <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>用户管理</el-breadcrumb-item>
     <el-breadcrumb-item>用户列表</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图区域 -->
     <el-card>

         <!-- 使用分栏间隔el-row -->
         <!-- v-model="queryInfo.query"为输入框双向绑定数据 -->
        <el-row :gutter="20">
            <el-col :span="9">
                <!-- 搜索区域 -->
                <el-input placeholder="请输入内容" v-model="queryInfo.query">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
            </el-col>

            <el-col :span="4">
                <!-- 添加按钮添加区域 -->
                <el-button type="primary">添加用户</el-button>
            </el-col>
        </el-row>

        <!-- 用户列表区域 
        :data=""为表格制定数据元-->
        <el-table :data="userlist" :border="true" :stripe="true">
            <!--type="index"为第一列索引列  -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="姓名" prop="username"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="电话" prop="mobile"></el-table-column>
            <el-table-column label="角色" prop="role_name"></el-table-column>
            <el-table-column label="状态" prop="mg_state">
                <template slot-scope="scope">
                    <el-switch  v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template >
                    <!-- 编辑按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    <!-- 分配角色按钮 (带鼠标停留注释文字)-->
                     <el-tooltip  effect="dark" content="分配角色" placement="top" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页区域 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

    </el-card>

  </div>
</template>

<script>
export default {
    data(){
        return{
            // 获取用户列表的参数对象
            queryInfo:{
                query:'',

                // 当前的页数
                pagenum:1,

                // 当前每页多少条数据
                pagesize:2
            },
            userlist:[

            ],
            // 总共有多少条数据
            total:0
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        async getUserList(){
            const {data:res}=await this.$http.get('users',{params:this.queryInfo})
            if(res.meta.status!==200){
                return this.$message.error('获取用户列表失败!')
            }
            this.userlist=res.data.users
            this.total=res.data.total
        },

        // 监听pagesize改变的事件
        handleSizeChange(newSize){
            // console.log(newSize)
            // 当用户选择当前页面显示几条，重新将条数返回给data,并重新从服务器渲染列表
            this.queryInfo.pagesize=newSize
            this.getUserList()
        },

        // 监听页码值改变的事件
        handleCurrentChange(newPage){
            // console.log(newPage)
            // 当用户选择当前页面，重新将当前页面返回给data,并重新从服务器渲染列表
            this.queryInfo.pagenum=newPage
            this.getUserList()
        },

        // 监听switch开关状态的改变
        async userStateChanged(userinfo){
            const {data:res} =await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
            if(res.meta.status!==200){
                userinfo.mg_state=!userinfo.mg_state
                return this.$message.error('更新用户状态失败')
            }
            this.$message.success('更新用户状态成功')
        }


    }
}
</script>

<style lang="less" scoped>

</style>