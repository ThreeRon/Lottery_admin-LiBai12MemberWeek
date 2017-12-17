<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
html,body {
  height: 100%;
  overflow: hidden;
}
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  background: #e1e6ec;
}
#app {
  position: absolute;
  top:0;
  bottom:0;
  left: 0;
  right: 0;
  width:100%;
}
ul,li{
  margin: 0;
  padding: 0;
  list-style: none;
}
a {
  text-decoration: none;
  color: #666;
}
p,h1,h2,h3,h4,h5,h5 {
  margin: 0;
  padding: 0;
}
.row-icon {
  width: 40px;
  height:40px;
  margin: 6px 3px;
  border-radius: 5px;
  vertical-align: middle;
}
.fr {
  float: right;
}
.btn {
  padding: 2px 5px;
  color: #fff;
  background: dodgerblue;
  font-size: 14px;
  border-radius: 4px;
}
.btn:hover,.btn:active {
  background: royalblue;
}

// 重写 表格css
.el-table.el-table--fit
  border-right: 1px solid rgb(236, 229, 223);
.el-table td, .el-table th.is-leaf
  padding: 0;
// 重写Tab菜单
.el-menu
  background-color: transparent;
  border-bottom: 1px solid #d8d8d8;
.el-menu--horizontal .el-menu-item
  color: rgb(106, 90, 72);
.el-menu--horizontal .el-menu-item:hover
  border-bottom: 3px solid rgb(106, 90, 72) !important;
.el-menu--horizontal>.el-menu-item.is-active
  background: transparent;
  border-bottom: 3px solid #ff6b00;
  color: #ff6b00;
.el-menu--horizontal .el-menu-item.is-active:hover
  border-bottom: 3px solid #ff6b00 !important;
.el-menu--horizontal .el-menu-item:hover, .el-menu--horizontal .el-submenu__title:hover
  background: transparent;
// 重写分页css
.el-pagination__editor.el-input .el-input__inner
  margin-top: -10px;
.el-pagination
    float: right;    
</style>

