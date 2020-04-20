<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="usernumber">
      <el-input placeholder="用户名手机" v-model="form.usernumber"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="username">
      <el-input placeholder="你的名字" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 确认密码输入框失去焦点时触发的验证函数
    // rule：表示当前的规则
    // value:是输入框的值
    // callback:是必须要调用，可以传入Error对象，实现报错
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        // 正常通过
        callback();
      }
    };

    return {
      // 表单数据
      form: {
        usernumber: "", //用户名手机
        captcha: "", //验证码
        username: "", //用户名
        password: "", //密码
        checkPassword: "" //确认密码
      },

      // 表单规则
      rules: {
        usernumber: [
          { required: true, message: "请输入用户名手机", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // validator自定义验证，validatePassword是验证的函数
        checkPassword: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      // 判断用户手机号是否为空，若为空，则停止执行代码
      if (this.form.usernumber === "") {

        // validateField是指主动的触发表单某个属性字段的校验，并且会主动发生错误提示
        this.$refs.form.validateField("usernumber")

        return;
      }

      this.$store.dispatch("user/sendCaptcha",this.form.usernumber).then((res)=>{
        this.$message.success(`你的验证码为:`+res)
      })
    },

    // 注册
    handleRegSubmit() {
      console.log(this.form);
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