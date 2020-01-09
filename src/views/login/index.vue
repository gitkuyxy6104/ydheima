<template>
  <div class="login-container">
    <!-- 导航 -->
    <van-nav-bar title="标题" />
    <!-- 登录表单 -->
    <van-cell-group>
      <van-field  clearable label="手机号"  placeholder="请输入手机号" v-model="user.mobile">
          <template slot="left-icon">
             <i class="icon icon-shouji1" style="font-size:25px"></i>
        </template>
      </van-field>
      <van-field label="验证码" placeholder="请输入验证码" v-model="user.code">
        <template slot="left-icon" >
          <i class="icon icon-yanzhengma" style="font-size:20px;padding-right:5px"></i>
        </template>
         <van-button
          slot="button"
          size="small"
          type="primary"
          round
        >发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn-wrap">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  methods: {
    async onLogin () {
      // 获取数据
      const user = this.user
      // 表单验证
      // 请求登录
      const res = await request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data: user
      })
      console.log(res)
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
