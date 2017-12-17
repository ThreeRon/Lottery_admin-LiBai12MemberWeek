<template>
    <div class="dataDetail">
        <el-menu mode="horizontal" router :default-active="defaultIndex">
            <el-menu-item :index="`/datadetail/overview/${$route.params.id}`">数据概览</el-menu-item>
            <el-menu-item :index="`/datadetail/user/${$route.params.id}`">中奖用户</el-menu-item>
            <el-menu-item :index="`/datadetail/player/${$route.params.id}`">玩家列表</el-menu-item>
        </el-menu>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          defaultIndex: this.$route.path
        }
      }
    }
</script>

<style lang="stylus" scoped>
</style>
