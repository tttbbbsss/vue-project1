<template>
  <el-container class="home-container">

    <!-- 头部区域 -->
    <el-header>

        <div>
            <img src="../assets/" alt="">
            <span>电商后台管理系统</span>
        </div>

        <!-- type="info会渲染成一个灰色按钮 -->
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!--页面主体区域  -->
    <el-container>

        <!-- 侧边栏 -->
        <el-aside width="200px">Aside</el-aside>
        <!-- 右侧内容主体 -->
        <el-main>Main</el-main>
    </el-container>

  </el-container>

</template>

<script>
export default {
    methods:{
        logout(){
            window.sessionStorage.clear();
            this.$router.push("/login");
        }
    }

}
</script>

<style lang='less' scoped>
.el-header{
    background-color: #373D41;
}

.el-aside{
    background-color: #333744;
}

.el-main {
    background-color: #EAEDF1;
}

.home-container{
    height: 100%;
}
</style>