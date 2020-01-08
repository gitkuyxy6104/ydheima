<template>
  <div class="login-container">
    <!-- 导航 -->
    <van-nav-bar title="标题" />
    <!-- 登录表单 -->
    <van-cell-group>
      <van-field required clearable label="手机号" placeholder="请输入手机号" />
      <van-field label="验证码" placeholder="请输入验证码" required />
    </van-cell-group>
    <div>
      <van-button type="info">信息按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' >
</style>
