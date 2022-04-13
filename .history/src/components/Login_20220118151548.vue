<template>
  <div class="login_container">
      <div class="login_box">

          <!-- 头像区域 -->
          <div class="avatar_box">
              <img src="../assets/logo.png" alt="">
          </div>

          <!--登录表单区域,绑定数据对象：:model="loginForm"  -->
          <!-- :rules="loginFormRules" 增加输入验证规则 -->
          <!--  ref="loginFormRef"是表单的实例对象 -->
          <el-form  ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">

              <!-- 用户名 -->
              <!-- v-model="loginForm.username" 表示对username进行动态绑定 -->
              <!-- 加上prop="username"使验证规则生效 -->
             <el-form-item prop="username">
               <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
             </el-form-item>

            <!-- 密码 -->
            <!--type="password"表示输入显示星号  -->
            <!-- v-model="loginForm.password" 表示对password进行动态绑定 -->
            <!-- 加上prop="password"使验证规则生效 -->
             <el-form-item prop="password"> 
               <el-input 
                v-model="loginForm.password" 
                prefix-icon="el-icon-lock"
                type="password"
                >
               </el-input>
             </el-form-item>

             <!-- 按钮区域 -->
             <!-- @click="resetLoginForm"为重置按钮提供单击事件 -->
             <el-form-item class="btns">
               <el-button type="primary" @click="login">登录</el-button>
               <el-button type="info" @click="resetLoginForm">重置</el-button>
             </el-form-item>

          </el-form>
      </div>
  </div>
</template>

<script>
export default {

    data(){
        return{
            // 定义登陆表单绑定的:model="loginForm"数据对象
            loginForm:{
                username:'zs',
                password:'123'
            },

            // 这是表单的验证规则对象
            loginFormRules:{
                // 验证username的合法性
                // trigger: 'blur'代表鼠标失去焦点时触发验证
                username:[
                     { required: true, message: '请输入登录名称', trigger: 'blur' },
                     { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],

                // 验证密码是否合法
                password:[
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 点击重置按钮，重置登录表单
        // this.$refs.loginFormRef是调用引用对象，validate为方法，接受一个回调函数，第一个形参是布尔值，显示验证是否通过
        resetLoginForm(){
            // console.log(this)
            this.$refs.loginFormRef.resetFields();
        },
        login(){
            this.$refs.loginFormRef.validate((valid)=>{
                if(!valid) return;
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .login_container{
        background-color: #2b4b6b;
        height: 100%;
    }

// 登录盒子
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }

// 登录框的上图标
    .avatar_box{
        height: 130px;
        width: 130px;
        border:1px solid #eee;
        border-radius: 50%;
        padding:10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left:50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        // 图片的样式
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }

    .btns{
        display: flex;
        justify-content: flex-end;
    }

    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing:border-box;
    }
</style>
