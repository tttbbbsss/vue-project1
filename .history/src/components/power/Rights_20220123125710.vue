<template>
  <div>
      <!-- 面包屑导航区域 -->
     <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>权限管理</el-breadcrumb-item>
     <el-breadcrumb-item>权限列表</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图 -->
     <!-- :data=""为表格制定数据元 -->
     <!--type="index"为第一列索引列  -->
     <!-- border为表格添加框线 -->
     <!-- stripe增加斑马线 -->
     <el-card>
         <el-table :data="rightsList" border stripe>
             <el-table-column type="index"></el-table-column>
             <el-table-column type="权限名称" prop="authName"></el-table-column>
             <el-table-column type="路径" prop="path"></el-table-column>
             <el-table-column type="权限等级" prop="level"></el-table-column>
         </el-table>
     </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            // 权限列表
            rightsList:[]
        }
    },
    created(){
        // 获取所有的权限
        this.getRightList()
    },
    methods:{
        // 获取权限列表
        // const {data:res}为结构赋值方式
        async getRightList(){
            const {data:res}=await this.$http.get('rights/list')
            if(res.meta.status!==200){
                return this.$message.error('获取权限列表失败！')
            }
            
            this.rightsList=res.data
            console.log(this.rightsList)
        }
    }
}
</script>

<style lang="less" scoped>

</style>