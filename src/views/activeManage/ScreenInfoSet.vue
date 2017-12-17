<template>
  <!--
  活动基本信息设置：
    基础信息，
    奖项信息，
    分享信息
  -->
<div>

  <!--屏幕主控制按钮  -->
  <el-row>
    <el-col :span="24" class="control-banner">
      <el-button @click.native.prevent="saveActive" type="primary" size="medium">保存</el-button>
      <el-button @click.native.prevent="publishActive" type="primary" size="medium">发布</el-button>
    </el-col>
  </el-row>

  <div class="content-wrapper">

    <!--信息输入区域 begin-->
    <div class="tab-wrapper">
      <el-form :model="infoForm" :rules="infoFormRules" ref="infoForm" label-width="110px" label-position="left">
        <el-tabs v-model="activeTab" @tab-click="tabChange">

          <!-------------------------基础设置Tab begin--------------------------->
          <el-tab-pane label="基础设置" name="baseInfoTab">
            <el-form-item label="活动标题" prop="activityTitle">
              <el-input v-model="infoForm.activityTitle"></el-input>
            </el-form-item>
            <el-form-item label="活动时间" prop="dateTimeRange">
              <el-date-picker type="datetimerange" placeholder="选择日期时间" v-model="infoForm.dateTimeRange" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="强制关注" prop="forceAttention">
              <el-radio :label="0" v-model="infoForm.forceAttention">开启</el-radio>
              <el-radio :label="1" v-model="infoForm.forceAttention">关闭</el-radio>
            </el-form-item>
            <el-form-item label="活动说明" prop="activityDesc">
              <el-input type="textarea" v-model="infoForm.activityDesc"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!--基础设置Tab end-->

          <!---------------------------奖项设置Tab begin--------------------------->
          <el-tab-pane label="奖项设置" name="prizeInfoTab">
            <el-form-item label="默认抽奖次数" prop="defaultChance">
              <el-input v-model.number="infoForm.defaultChance" style="width:100px;"><template slot="append">次</template></el-input>
            </el-form-item>
            <el-form-item label="每人最多抽中" prop="maxLuckyChance">
              <el-col :span="6">
                <el-radio :label="0" v-model="infoForm.maxLuckyChanceCpt">不限</el-radio>
                <el-radio :label="1" v-model="infoForm.maxLuckyChanceCpt">限制</el-radio>
              </el-col>
              <el-col :span="18" v-show="infoForm.maxLuckyChanceCpt===1">
                <el-input v-model.number="infoForm.maxLuckyChance" style="width:220px;"><template slot="prepend">每人最多可中奖</template><template slot="append">次</template></el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="分享激励" prop="shareRewar">
              <el-col :span="6">
                <el-radio :label="0" v-model="infoForm.shareRewarCpt">关闭</el-radio>
                <el-radio :label="1" v-model="infoForm.shareRewarCpt">开启</el-radio>
              </el-col>
              <el-col :span="18" v-show="infoForm.shareRewarCpt===1">
                <el-input v-model.number="infoForm.shareRewar" style="width:180px;"><template slot="prepend">分享增加</template><template slot="append">次</template></el-input>
              </el-col>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click.native="openPrizeFormDialog" class="fr">添加奖项</el-button>
            </el-form-item>

            <!--奖品表格-->
            <el-table :data="prizeList">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="奖品名称" >
                <template slot-scope="scope">
                  <img class="row-icon" :src="scope.row.prizeImg" :alt="scope.row.name">
                  <span class="row-title">{{scope.row.prizeName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="奖品类型">
                <template slot-scope="scope">{{scope.row.prizeType | convertPrizeType}}</template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" @click.native="editPrizeFormDialog(scope.$index, prizeList)">修改</el-button>
                  <el-button size="small" @click.native="deletePrizeFormDialog(scope.$index, prizeList)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-tab-pane>
          <!--奖项设置Tab end-->

          <!---------------------------分享设置Tab begin--------------------------->
          <el-tab-pane label="分享设置" name="shareInfoTab">
            <el-form-item label="分享活动" prop="enableShare">
              <el-radio :label="0" v-model="infoForm.enableShare">允许分享</el-radio>
              <el-radio :label="1" v-model="infoForm.enableShare">禁止分享</el-radio>
            </el-form-item>
            <el-form-item v-if="infoForm.enableShare===0" label="分享封面" prop="shareImg">
              <upload-box @updateimg="updateImg" style="margin-bottom: -22px;"></upload-box>
            </el-form-item>
            <el-form-item v-if="infoForm.enableShare===0" label="分享标题" prop="shareTitle">
              <el-input v-model="infoForm.shareTitle"></el-input>
            </el-form-item>
            <el-form-item v-if="infoForm.enableShare===0" label="分享摘要" prop="shareDesc">
              <el-input type="textarea" v-model="infoForm.shareDesc"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!--分享设置Tab end-->

        </el-tabs>
      </el-form>
    </div>
    <!--信息输入区域 end-->

    <!---------------------------添加奖品弹窗 begin--------------------------->
    <prize-form-dialog ref="prizeFormDialog" @addprizeitem="addPrizeItem"></prize-form-dialog>
    <!--添加奖品弹窗 end-->
 </div>
</div>
</template>

<script>
  import {getActivityAPI, updateActiveAPI} from '@/api/api'
  import PrizeFormDialog from '@/components/prizeForm'
  import UploadBox from '@/components/uploadBox'
  export default {
    data () {
      let checkMaxLuckyChange = (rule, value, callback) => {
        if (this.infoForm.maxLuckyChanceCpt === 1 && !Number.isInteger(value)) {
          callback(new Error('每人最多可中奖次数必需是数值'));
        } else {
          callback()
        }
      }
      return {
        activeTab: 'baseInfoTab', // 默认活动Tab标签
        prizeList: [],
        infoForm: {
          // base info
          activityTitle: '会员周',
          activityDesc: '另外提供',
          status: 0,
          activityId: 0,
          forceAttention: 0,
          dateTimeRange: ['', ''],
          startTime: '',
          endTime: '',
          // share info
          shareTitle: '',
          shareDesc: '',
          enableShare: 0,
          shareImg: '',
          // prize info
          defaultChance: 1,
          maxLuckyChance: '',
          shareRewar: '',
          maxLuckyChanceCpt: 0,   // 每人最多抽中：若值为0不限，则maxLuckyChance值为-1
          shareRewarCpt: 1,       // 分享激励：若值为0关闭，则shareRewar值为0
        },
        infoFormRules: {
          // base info
          activityTitle: [
            {required: true, message: '请输入活动标题', trigger: 'blur'},
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
          ],
          dateTimeRange: [{required: true, message: '请选择活动时间', trigger: 'blur'}],
          activityDesc: [{required: true, message: '请输入活动规则', trigger: 'blur'}],
          forceAttention: [{required: true, message: '请选择强制关注', trigger: 'blur'}],
          // prize info
          defaultChance: [{type: 'number', message: '默认抽奖次数必需是数值', trigger: 'blur'}],
          maxLuckyChance: [{validator: checkMaxLuckyChange, trigger: 'blur'}],
          // share info
          enableShare: [{required: true, message: '请设置是否允许分享', trigger: 'blur'}],
          shareImg: [{required: true, message: '请选择分享封面', trigger: 'blur'}],
          shareTitle: [{required: true, message: '请输入分享标题', trigger: 'blur'}]
        }
      }
    },
    computed: {
      // 是否有带ID
      activeId () {
        return this.$router.history.current.params.id
      }
    },
    mounted: function () {
      // 若有活动ID，则从数据库后台中获取活动数据对象
      if (this.activeId !== '0') {
        let params = { activityId: this.activityId }
        getActivityAPI(params).then((res) => {
          this.infoForm = res
          // 每人最多可抽中radio
          if (this.infoForm.maxLuckyChance === -1) {
            this.infoForm.maxLuckyChanceCpt = 0
          } else {
            this.maxLuckyChanceCpt = 1
          }
          // 分享激励radio
          if (this.infoForm.shareRewar === 0) {
            this.infoForm.shareRewarCpt = 0
          } else {
            this.infoForm.shareRewarCpt = 1
          }
          // 活动时间
          this.infoForm.dateTimeRange = [this.infoForm.startTime, this.infoForm.endTime]
          // 奖品列表
          this.prizeList = this.infoForm.activityPrizes
        })
      }
    },
    methods: {
      // Tab菜单点击事件
      tabChange (tab, event) {
        this.activeTab = tab.name
      },
      // 新增打开添加奖品项弹窗
      openPrizeFormDialog () {
        if (this.prizeList.length < 8) {
          this.$refs.prizeFormDialog.openDialog()
        } else {
          this.$message({message: '最多只能添加8个奖品', type:'warning'})
        }
      },
      // 修改打开添加奖品项弹窗
      editPrizeFormDialog (index, list) {
        let obj = list[index]
        this.$refs.prizeFormDialog.openDialog(obj, index)
      },
      // 删除奖品项
      deletePrizeFormDialog (index, list) {
        this.prizeList.splice(index, 1)
      },
      // 接收奖品项弹窗回传的数据
      addPrizeItem ({prizeItem, index}) {
        if (index >= 0) {
          this.prizeList.splice(index, 1, prizeItem)
        } else {
          this.prizeList.push(prizeItem)
        }
      },
      // 分享封面预览图url
      updateImg (val) {
        this.infoForm.shareImg = val
      },
      // 保存活动表单信息
      saveActive () {
        this.$refs.infoForm.validate((valid) => {
          if (valid) {
            if (this.infoForm.maxLuckyChanceCpt === 0) {
              this.infoForm.maxLuckyChance = -1
            }
            if (this.infoForm.shareRewarCpt === 0) {
              this.infoForm.shareRewar = 0
            }
            this.infoForm.startTime = this.infoForm.dateTimeRange[0]
            this.infoForm.endTime = this.infoForm.dateTimeRange[1]
            this.infoForm.activityPrizes = this.prizeList

            console.log(this.infoForm)

            updateActiveAPI(this.infoForm).then(res => {
              if (res.code !== 0) {
                this.$message.error(`更新活动信息失败：${res.msg}`)
              }
            })
          } else {
            this.$message({message: '请完善活动设置信息', type: 'warning'})
          }
        })
      },
      // 发布活动表单信息
      publishActive () {
        this.$refs.infoForm.validate((valid) => {
          if (valid) {
            if (this.infoForm.maxLuckyChanceCpt === 0) {
              this.infoForm.maxLuckyChance = -1
            }
            if (this.infoForm.shareRewarCpt === 0) {
              this.infoForm.shareRewar = 0
            }
            this.infoForm.startTime = this.infoForm.dateTimeRange[0]
            this.infoForm.endTime = this.infoForm.dateTimeRange[1]
            this.infoForm.activityPrizes = this.prizeList
            this.infoForm.status = 1

            console.log(this.infoForm)

            updateActiveAPI(this.infoForm).then(res => {
              if (res.code !== 0) {
                this.$message.error(`更新活动信息失败：${res.msg}`)
              }
            })
          } else {
            this.$message({message: '请完善活动设置信息', type: 'warning'})
          }
        })
      }
    },
    filters: {
      convertPrizeType (val) {
        if (val === 1) return '微信红包（定额）'
        if (val === 2) return '微信红包（随机）'
        if (val === 3) return '实物'
        if (val === 4) return '线上优惠'
        if (val === 5) return '积分'
      }
    },
    components: {
      uploadBox: UploadBox,
      prizeFormDialog: PrizeFormDialog
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/var.styl"
  .control-banner
    text-align: right;
    padding: 0 10px 10px 0;
  .content-wrapper
     display: flex;
    .tab-wrapper
      flex: 1;
      margin: 0 10px 0 5px;
      padding: 10px;
      background: #fff;
      .title
        font-size: 20px;
      .tip
        font-size: 14px;
        color: #888;
        font-weight: 100;
      .goods-box
        display: flex;
        justify-content: center;
        margin: 40px 10px;
</style>
