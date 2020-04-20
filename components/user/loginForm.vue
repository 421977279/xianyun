<template>
  <!-- model:声明表单的数据对象(这个表单最终的数据存放在data的form对象里面) -->
  <!-- ref:获取dom元素 -->
  <!-- rules:表单验证规则 -->
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <!-- 用户名输入框 -->
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <!-- 密码输入框 -->
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "13800138000", //用户名
        password: "123456" //密码
      },
      // 表单规则,里面的输入必须和form统一
      rules: {
        // 用户名的校验规则
        username: [
          // required为true指必填,message：错误的提示信息；trigger：触发时机
          { required: true, message: "请输入用户名/手机", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        // 密码的校验规则
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      // 判断element-ui表单验证是否通过
      // element的表单都有一个validate这个方法

      // 第一种写法：promise  .then
      this.$refs.form.validate(valid => {
        // valid如果值是true代表验证通过
        if (valid) {
          // 请求登录接口
          // this.$axios({
          //   url:"/accounts/login",
          //   method:"POST",
          //   data:this.form
          // }).then(res=>{
          //   const {data} = res;
          //   // console.log(data);

          //   // 调用mutations的方法，调用才存储数据
          //   this.$store.commit("user/setUserInfo",data)
          // })

          // actions这个方法需要dispatch来调用，由于data的值需要在loginForm组件中获取，因此需要进行传参
          this.$store.dispatch("user/login", this.form).then(() => {
            // 弹窗提示
            this.$message.success("登录成功");

            // 跳转到首页
            this.$router.push("/")
          });
        }
      });

      // 第二种写法 async await
      // this.$refs.form.validate(async valid => {
      //   // valid如果值是true代表验证通过
      //   if (valid) {

      //     // actions这个方法需要dispatch来调用，由于data的值需要在loginForm组件中获取，因此需要进行传参
      //     this.$store.dispatch("user/login", this.form);

      //     // 弹窗提示
      //     this.$message.success("登录成功");

      //     // 跳转到首页
      //     this.$router.push("/");
      //   }
      // });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>