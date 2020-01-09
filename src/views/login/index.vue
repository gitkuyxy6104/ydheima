<template>
  <div class="login-container">
    <!-- 导航 -->
    <van-nav-bar title="标题" />
    <!-- 登录表单 -->
    <van-cell-group>
      <van-field clearable label="手机号" placeholder="请输入手机号" v-model="user.mobile">
        <template slot="left-icon">
          <i class="icon icon-shouji1" style="font-size:25px"></i>
        </template>
      </van-field>
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
         >发送验证码
        </van-button>
        <van-count-down
          v-else
         :time="60 * 1000"
         slot="button"
         format="ss 秒"
         @finish="isCountDownShow = false"
         />
      </van-field>
    </van-cell-group>
    <div class="login-btn-wrap">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
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
