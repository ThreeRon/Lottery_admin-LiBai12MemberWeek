<template>
  <div class="activedata-wrapper">
    <div class="control-banner">
      <el-form ref="form" :model="searchFormData">
        <el-form-item>
          <el-input v-model="searchFormData.activityTitle" placeholder="请输入活动名称" style="width: 240px;"></el-input>
          <el-button type="primary" @click="onSubmit" size="medium">检  索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="dataList" :loading="loading" style="width: 100%">
      <el-table-column prop="name" label="活动">
        <template slot-scope="scope">
          <img class="row-icon" :src="scope.row.imgUrl" :alt="scope.row.title">
          <span class="row-title">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" label="发布时间"></el-table-column>
      <el-table-column prop="cyNum" label="参与人数"></el-table-column>
      <el-table-column prop="zjNum" label="中奖人数"></el-table-column>
      <el-table-column prop="cjNum" label="抽奖次数"></el-table-column>
      <el-table-column prop="xhNum" label="奖品消耗量"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click.native.prevent="showDetail(scope.$index, dataList)" size="small" type="primary">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <!-- 分页 -->
    <br>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page= "pageData.page"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.totalCount">
    </el-pagination>

  </div>
</template>

<script>
  import {getActiveDataAPI} from '@/api/api'
  export default {
    data () {
      return {
        loading: false,
        pageData: {
          totalCount: 10,// 总记录数
          page: 1,       // 当前页码
          pageCount: 1   // 页数
        },
        searchFormData: {activityTitle: ''},
        dataList: []
      }
    },
    methods: {
      // 详情按钮点击事件
      showDetail (index, rowsData) {
        let id = rowsData[index].id
        this.$router.push({path: `/datadetail/overview/${id}`})
      },
      // 检索事件
      onSubmit () {
        return false
      },
      // 分页事件
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      // 分页事件
      handleCurrentChange(val) {
        this.pageData.page = val;
        this.getDataList()
      },
      // 获取列表数据
      getDataList () {
        this.loading = true
        let params = {
          page: this.pageData.page,
          pageSize: 10,
          title: this.searchFormData.activityTitle
        }
        getActiveDataAPI(params).then((res) => {
          this.loading = false
          if(res.code !== 0){
            this.$message.error(`获取活动数据失败：${res.msg}`)
            return false
          }
          this.dataList = res.data.list
          this.pageData.totalCount = res.data.total
          this.pageData.pageCount = this.pageData.totalCount / 10
        })
      }
    },
    mounted () {
      this.getDataList()
    },
    components: {}
  }
</script>

<style lang="stylus" scoped>
</style>
