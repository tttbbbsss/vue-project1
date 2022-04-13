<template>
  <div>
     <!-- 面包屑导航区域 -->
     <el-breadcrumb separator="/">
     <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>权限管理</el-breadcrumb-item>
     <el-breadcrumb-item>角色列表</el-breadcrumb-item>
     </el-breadcrumb>

     <!-- 卡片视图 -->
     <!-- :data=""为表格制定数据元 -->
     <!--type="index"为第一列索引列  -->
     <!-- border为表格添加框线 -->
     <!-- stripe增加斑马线 -->
     <el-card>
         <el-table :data="rightsList" border stripe>
             <el-table-column type="index"></el-table-column>
             <el-table-column label="权限名称" prop="authName"></el-table-column>
             <el-table-column label="路径" prop="path"></el-table-column>
             <el-table-column label="权限等级" prop="level">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.level==='0'">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
                </template>
             </el-table-column>
         </el-table>
     </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>

</style>