<template>
  <div class="login-container">
    <!-- 导航 -->
    <van-nav-bar title="标题" />
    <!-- 登录表单 -->
    <!--
      表单验证
      1、使用 ValidationObserver 组件把需要验证的整个表单包起来
      2、使用 ValidationProvider 组件把具体的表单元素包起来，例如 input
         name   配置字段的提示名称
         rules  配置校验规则
         v-slot="{ errors }" 获取校验失败的错误提示消息
         内置的规则：https://logaretm.github.io/vee-validate/guide/rules.html#rules
          自定义规则：
          单个验证规则：rules="required"
          多个验证规则：rules="required|length:4"
          errors[0] 获取错误消息
    -->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号" immediate  rules="required|mobile" v-slot="{ errors }">
        <van-field clearable label="手机号" placeholder="请输入手机号" v-model="user.mobile">
          <template slot="left-icon">
            <i class="icon icon-shouji1" style="font-size:25px"></i>
          </template>
        </van-field>
        <!-- <span>{{errors[0]}}</span> -->
      </ValidationProvider>
      <ValidationProvider name="验证码" immediate  rules="required|code" v-slot="{ errors }">
        <van-field label="验证码" placeholder="请输入验证码" v-model="user.code">
          <template slot="left-icon">
            <i class="icon icon-yanzhengma" style="font-size:20px;padding-right:5px"></i>
          </template>
          <van-button
            v-if="!isCountDownShow"
            slot="button"
            size="small"
            type="primary"
            round
            @click="onSendSmsCode"
          >发送验证码</van-button>
          <van-count-down
            v-else
            :time="60 * 1000"
            slot="button"
            format="ss 秒"
            @finish="isCountDownShow = false"
          />
        </van-field>
        <!-- <span>{{errors[0]}}</span> -->
      </ValidationProvider>
    </ValidationObserver>
    <div class="login-btn-wrap">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'
export default {
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  methods: {
    // 获取验证码
    async onSendSmsCode () {
      try {
        const { mobile } = this.user
        // 检验手机号是否有效
        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })
        if (!validateResult.valid) {
          this.$toast(validateResult.errors[0])
          return
        }
        // 请求发短信
        const res = await getSmsCode(mobile)
        console.log(res)
        // 显示时间
        this.isCountDownShow = true
      } catch (err) {
        console.log(err)
        this.isCountDownShow = false
        this.$toast('请勿频繁操作')
      }
    },
    // 登录请求
    async onLogin () {
      // 获取数据
      const user = this.user
      // 表单验证
      const success = await this.$refs.form.validate()
      if (!success) { // success 是验证成功为true 失败为false
        // 失败提示代码写这里
        // 如果你需要像以下这样在js中这样拿错误消息是拿不到得
        // 因为此验证条件为获得焦点并失去焦点才会去验证 而我们直接点击登录按钮并不会有焦点操作所以需要设置immediate
        // 这样一上来就会先自动校验一次
        // 必须给每一个 ValidationProvider 配置 immediate 它得意思就是立即得
        // console.log(this.$refs.form.errors)
        // 拿到错误信息
        const errors = this.$refs.form.errors
        // 因为拿到得是个对象 遍历对象 然后判断每一项有无长度
        // 如有长度 就把该长度得内容拿出来 然后轻提示
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            // 找到第1个有错误的消息，给出提示，停止遍历
            return
          }
        }
      } else {
        // 请求登录
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner'
        })
        try {
          const res = await login(user)
          console.log(res)
          this.$toast.success('登录成功')
        } catch {
          this.$toast.fail('登录失败')
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  .login-btn-wrap {
    padding: 27px 16px;
    .van-button {
      width: 100%;
      background: #6db4fb;
    }
  }
}
</style>
