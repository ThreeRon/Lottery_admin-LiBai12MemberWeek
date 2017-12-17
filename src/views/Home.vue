<template>
  <div class="home">

      <!--头部Header-->
      <div class="main-header">
        <div class="logo-wrapper" @click="logoLinkTo">
          <img class="logo" :src="require(`@/assets/logo_libai.png`)" alt="立白">
        </div>
      </div>

      <div class="main-body">
        <!--侧边主菜单-->
        <div class="main-body-nav">
          <el-menu default-active="/activemanage" class="el-menu-vertical-demo" router text-color="#878d99" active-text-color="#fff">
            <el-menu-item index="/activemanage">
              <i class="el-icon-menu"></i>
              <span slot="title">活动列表</span>
            </el-menu-item>
            <el-menu-item index="/activedata">
              <i class="el-icon-setting"></i>
              <span slot="title">活动数据</span>
            </el-menu-item>
          </el-menu>
        </div>

        <!--右边主要内容区-->
        <div class="main-body-content">
          <h2 class="main-body-title">{{$route.name}}</h2>
          <router-view></router-view>
        </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    logoLinkTo () {
      console.log(this.$route)
      this.$router.push({path: '/activemanage'})
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/var.styl"

  .main-header
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: $header-h;
    background: $menu-bg;
    .logo-wrapper
      width: 180px;
      .logo
        width:88%;
        margin: 10px;

  .main-body
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin-top: $header-h;
    background: $main-bg;
    .main-body-nav
      position: absolute;
      overflow: hidden;
      width: $menu-w;
      height: 100%;
      background: $menu-bg;
    .main-body-content
      position: absolute;
      left: $menu-w;
      right:0;
      top: 0;
      bottom: 0;
      padding: 0 20px 10px 20px;
      overflow-y: auto;
      overflow-x: hidden;
      .main-body-title
        font-size: 1.4rem;
        padding: 5px 0;
        margin: 10px 0;
        color: #475669;
        border-bottom: 1px solid #d8d8d8;

  // 重写css
  .el-menu
    border-right: none;
    height: 100%;
    background-color: transparent;
    margin-top: 20px;
    .el-menu-item
      color: #fff;
      border-left: 3px solid transparent;
    .el-menu-item:hover
      background-color: transparent;
      border-color: currentColor;
    .el-menu-item.is-active
      color: #fff;
      background-color: #032236;
      border-left: 3px solid $color-primary;
</style>
