<template>
  <div>
     <!-- 面包屑导航区域 -->
     <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>权限管理</el-breadcrumb-item>
     <el-breadcrumb-item>角色列表</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图 -->
     <el-card>
         <!-- 添加角色按钮区域 -->
         <el-row>
             <el-col>
                 <el-button type="primary">添加角色</el-button>
             </el-col>
         </el-row>

         <!-- 角色列表区域 -->
        <el-table :data="rolelist" border stripe>
            <!-- 展开列 -->
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row class="['bdbottom']" v-for="(item1) in scope.row.children" :key="item1.id"> 
                        <!-- 渲染一级权限 -->
                        <el-col :span="5">
                            <el-tag>{{item1.authName}}</el-tag>
                        </el-col>
                        <!-- 渲染二级与三级权限 -->
                        <el-col :span="19"></el-col>
                    </el-row>
                    <pre>{{scope.row}}</pre>
                </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" width="300px">
                <template>
                    <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                    <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
     </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            // 定义所有角色列表数据
            rolelist:[]
        }
    },
    created(){
        this.getRoleList()
    },
    methods:{
        // 获取所有的角色的列表
        async getRoleList(){
            const {data:res}=await this.$http.get('roles')

            if(res.meta.status!==200){
                return this.$message.error('获取角色列表失败！')
            }

            this.rolelist=res.data
        }
    }
}
</script>

<style lang='less' scoped>
    .el-tag{
        margin: 7px;
    }

    .bdtop{
        border-top: 1px solid #eee;
    }

    .bdbottom{
        border-bottom: 1px solid #eee;
    }
</style>