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
                    <el-row 
                        :class="['bdbottom',i1===0? 'bdtop':'','vcenter']" 
                        v-for="(item1,i1) in scope.row.children" 
                        :key="item1.id"
                    > 
                        <!-- 渲染一级权限 -->
                        <el-col class="" :span="5">
                            <el-tag 
                                closable
                                @close="removeRightById(scope.row,item1.id)"
                            >
                                {{item1.authName}}
                            </el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <!-- 渲染二级与三级权限 -->
                        <el-col :span="19">
                            <!-- 通过for循环嵌套渲染二级权限 -->
                            <el-row 
                                :class="[i2===0 ? '' : 'bdtop','vcenter']" 
                                v-for="(item2,i2) in item1.children" 
                                :key="item2.id"
                            >
                                <el-col :span="6">
                                    <el-tag 
                                        type="success" 
                                        closable
                                        @close="removeRightById(scope.row,item2.id)"
                                    >
                                        {{item2.authName}}
                                    </el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="18">
                                    <el-tag 
                                        type="warning" 
                                        v-for="(item3) in item2.children" 
                                        :key="item3.id" 
                                        closable
                                        @close="removeRightById(scope.row,item3.id)"
                                    >
                                        {{item3.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>

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
                    <el-button size="mini" type="warning" icon="el-icon-setting" 
                        @click="showSetRightDialog"
                    >
                        分配权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
     </el-card>

     <!-- 分配权限的对话框 -->
    <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%"
    >
        <!-- 树形控件 -->
        <el-tree :data="rightslist" :props="treeProps"></el-tree>

        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
    data(){
        return{
            // 定义所有角色列表数据
            rolelist:[],
            // 控制分配权限对话框的显示与隐藏
            setRightDialogVisible:false,
            //所有权限的数据
            rightslist:[],
            // 树形控件的属性绑定对象
            treeProps:{
                label:'authName',
                children:'children'
            }
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
        },
        // 根据id删除对应的权限
        async removeRightById(role,rightId){
            // 弹框提示用户是否要删除
            const confirmResult=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err=>err)

            if(confirmResult!=='confirm'){
                return this.$message.info('取消了删除！')
            }
            const {data:res}=await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            if(res.meta.status!==200){
                return this.$message.error('删除权限失败！')
            }

            // this.getRoleList()会删除之后重新渲染，导致页面按钮关闭
            role.children=res.data
        },
        // 展示分配权限的对话框
        async showSetRightDialog(){
            // 获取所有的权限数据
            const {data:res}=await this.$http.get('rights/tree')

            if(res.meta.status!==200){
                return this.$message.error('获取权限数据失败！')
            }

            // 把获取到的权限数据保存到data中
            this.rightslist=res.data
            console.log(this.rightslist)

            this.setRightDialogVisible=true
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

    .vcenter{
        display: flex;
        align-items: center;
    }
</style>