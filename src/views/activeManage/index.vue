<template>
  <div class="activemanage-wrapper">

    <!--活动数据表格-->
    <el-table
        :loading = "loading"
        :data="activeList"
        :default-sort="{prop:'status', order:'ascending'}"
        style="width: 100%">
      <el-table-column label="活动" >
        <template slot-scope="scope">
          <img class="row-icon" :src="scope.row.imgUrl" :alt="scope.row.title">
          <span class="row-title">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" ></el-table-column>
      <el-table-column label="活动时间">
        <template slot-scope="scope">
          {{scope.row.startTime}}<br>{{scope.row.endTime}}
        </template>
      </el-table-column>
      <el-table-column label="活动状态" sortable >
        <template slot-scope="scope">{{scope.row.status | statusConvert}}</template>
      </el-table-column>

      <!--操作列-->
      <el-table-column fixed="right" label="操作" width="360">
        <template slot-scope="scope">
          <!--二维码Pop框 begin-->
          <el-popover
                  ref="qriously"
                  placement="bottom"
                  width="200"
                  trigger="click">
            <div class="qriouslyBox">
              <qriously :value="activeList[0].qrcodeUrl" :size="100" class="qriously"/>
              <a href="#">下载</a>
              <div class="copy">
                <el-input size="mini" :value="scope.row.imgUrl" @click.native.prevent="copyText(scope.$index, activeList, $event)"></el-input>
                <el-button size="small" type="primary">复制</el-button>
              </div>
            </div>
          </el-popover>
          <!--二维码Pop框 end-->
          <el-button v-if="scope.row.status===0" @click.native.prevent="publishActive(scope.$index, activeList)" size="small" type="primary">发布</el-button>
          <el-button v-if="scope.row.status===1 || scope.row.status===2" @click.native.prevent="endActive(scope.$index, activeList)" size="small" type="danger">结束</el-button>
          <el-button v-popover:qriously size="small" type="success">二维码</el-button>
          <el-button @click.native.prevent="editActive(scope.$index, activeList)" size="small" type="success">编辑</el-button>
          &nbsp;
          <!--更多下拉内容 begin-->
          <el-dropdown  @command="handleCommand" >
            <el-button size="small">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{act:'data',index:scope.$index, list:activeList}">数据</el-dropdown-item>
                <el-dropdown-item :command="{act:'delete',index:scope.$index, list:activeList}">删除</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          <!--更多下拉内容 end-->
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 分页 -->
    <br>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page= "pageData.page"
        :page-sizes="[10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.totalCount">
    </el-pagination>

  </div>
</template>

<script>
  import {getActiveListAPI, publishActiveAPI, endActiveAPI} from '@/api/api'
  export default {
    data () {
      return {
        loading: false,
        pageData: {
          totalCount: 10,// 总记录数
          page: 1,      // 当前页码
          pageCount: 1 // 页数
        },
        activeList: []
      }
    },
    methods: {
      // 编辑按钮事件
      editActive (index, list) {
        let id = list[index].id
        this.$router.push({path: `/activeset/info/${id}`})   // 跳转到详细新页面(传入活动ID)
      },
      // 发布按钮事件
      publishActive (index, list) {
        let isClear = false
        this.$confirm('活动发布后，是否要删除测试数据？', {confirmButtonText:'删除', cancelButtonText: '不删除'}).then(_ => {
          isClear = true
        }).catch(_ => {
          isClear = false
        })

        let params = {
          id: list[index].id,
          isClear : isClear
        }
        publishActiveAPI(params).then((res) => {
          if(res.code !== 0){
            this.$message.error(`发布活动失败：${res.msg}`)
            return false
          }
          this.$message({message: '活动已发布'})
        })
      },
      // 结束按钮事件
      endActive (index, list) {
        let params = {
          id: list[index].id
        }
        endActiveAPI(params).then((res) => {
          if(res.code !== 0){
            this.$message.error(`结束活动失败：${res.msg}`)
            return false
          }
          this.$message({message: '活动已结束'})
        })
      },
      // 复制按钮事件
      copyText (index, list, $event) {
        $event.target.select()
        document.execCommand('Copy')
      },
      // 分页事件
      handleSizeChange(val) {
      },
      // 分页事件
      handleCurrentChange(val) {
        this.pageData.page = val;
        this.getActiveList();
      },
      // 显示数据
      showData (index, list) {
        this.$router.push({path: `/datadetail/overview/${list[index].id}`})
      },
      // 更多按钮点击事件
      handleCommand(command) {
        if (command.act === 'delete')
          this.deleteActive(command.index, command.list)
        if (command.act === 'data')
          this.showData(command.index, command.list)
      },
      // 获取列表数据
      getActiveList () {
        this.loading = true
        let params = {
          page: this.pageData.page,
          pageSize: 10
        }
        getActiveListAPI(params).then((res) => {
          this.loading = false
          if(res.code !== 0){
            this.$message.error(`获取活动列表失败：${res.msg}`)
            return false
          }
          this.activeList = res.data.list
          this.pageData.totalCount = res.data.total
          this.pageData.pageCount = this.pageData.totalCount / 10
        })
      }
    },
    mounted () {
      this.getActiveList()
    },
    filters: {
      statusConvert (val) {
        if (val === 0) return '未发布'
        if (val === 1) return '未开始'
        if (val === 2) return '进行中'
        if (val === 3) return '已结束'
      }
    },
    components: {}
  }
</script>

<style lang="stylus" scoped>
  .control-banner {
    margin-bottom: 15px;
    text-align: right;
  }
  .el-table {
    th {
      background: #ccc;
    }
  }
  .qriouslyBox {
    padding: 10px 0;
    font-size: 14px;
    text-align: center;
    background: #fff;
    .copy > *{
      display: inline-block;
    }
    .copy .el-input {
      width: 60%;
      margin-top: 5px;
    }
    .copy > .el-input > .el-input__inner {
      height: 30px;
    }
  }

</style>
