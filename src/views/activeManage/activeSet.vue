<template>
    <div class="activeset-wrapper">
        <!--主要设置区域-->
        <div :span="20" class="main-content">
          <!--<el-row>-->
            <!--<el-col :span="24" class="control-banner">-->
              <!--<el-button @click.native.prevent="save" type="primary" size="medium">保存</el-button>-->
              <!--<el-button @click.native.prevent="publish" type="primary" size="medium">发布</el-button>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <el-row>
            <router-view></router-view>
          </el-row>
        </div>
    </div>
</template>

<script>

  export default {
    data () {
      return {}
    },
    methods: {},
    components: { }
  }
</script>

<style lang="stylus" scoped>
</style>
