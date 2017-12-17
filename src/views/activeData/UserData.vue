<template>
    <div class="user-data">
        <!--查询表单-->
        <div class="control-banner">
            <el-form ref="form" :model="searchFormData">
                <el-form-item>
                    <el-select v-model="searchFormData.searchType">
                        <el-option selected label="昵称" value="昵称"></el-option>
                        <el-option label="openid" value="openid"></el-option>
                    </el-select>
                    <el-input v-model="searchFormData.searchContent" :placeholder="searchContentPlaceholder" style="width: 240px;"></el-input>
                    <el-button type="primary" @click="searchAction">检索</el-button>
                    <el-button type="primary" @click="exportData" class="fr">导出名单</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--数据列表-->
        <el-table :data="userList" :loading="loading" style="width: 100%" max-height="250">
            <el-table-column type="selection" min-width="50"></el-table-column>
            <el-table-column label="头像" min-width="60">
                <template slot-scope="scope">
                    <img class="row-icon" :src="scope.row.headImgUrl" :alt="scope.row.nickName">
                </template>
            </el-table-column>
            <el-table-column prop="nickName" label="昵称" min-width="80"></el-table-column>
            <el-table-column prop="sex" label="性别" min-width="60"></el-table-column>
            <el-table-column prop="area" label="地区" min-width="80"></el-table-column>
            <el-table-column prop="prizeName" label="奖品名称" min-width="80"></el-table-column>
            <el-table-column prop="luckyTime" label="中奖时间" min-width="100"></el-table-column>
            <el-table-column prop="status" label="发放状态" min-width="100"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="80"></el-table-column>
            <el-table-column prop="mobile" label="联系电话" min-width="80"></el-table-column>
            <el-table-column prop="address" label="联系地址" min-width="80"></el-table-column>
        </el-table>

        <!-- 分页 -->
        <br>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page= "pageData.page"
            :page-sizes="[10]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.totalCount">
        </el-pagination>
    </div>
</template>

<script>
    import {getUserListAPI} from '@/api/api'
    export default {
        data: function () {
            return {
               loading: false,
                pageData: {
                  totalCount: 10,// 总记录数
                  page: 1,      // 当前页码
                  pageCount: 1 // 页数
                },
                searchFormData: {   // 查询区表单对象
                    searchContent: '',
                    searchType: '昵称'
                },
                userList: []
            }
        },
        computed: {
            searchContentPlaceholder () {
                if (this.searchFormData.searchType === '昵称') {
                    return '请输入活动名称'
                } else {
                    return '请输入用户openId'
                }
            }
        },
        methods: {
            // 检索按钮事件
            searchAction () {},
            // 导出名单按钮事件
            exportData () {},
            // 分页事件
            handleSizeChange(val) {
            },
            // 分页事件
            handleCurrentChange(val) {
                this.pageData.page = val;
                this.getUserList();
            },
            // 获取列表数据
            getUserList () {
                // ============== 待完善===================
                this.loading = true
                let nickName = ''
                let openid = ''
                if (this.searchFormData.searchType === '昵称')
                    nickName = this.searchFormData.searchContent
                else
                    openid = this.searchFormData.searchContent
                let params = {
                    id: this.$router.history.current.params.id,
                    page: this.pageData.page,
                    pageSize: 10,
                    nickName: nickName,
                    openid: openid
                }
                getUserListAPI(params).then((res) => {
                    this.loading = false
                    if(res.code !== 0){
                        this.$message.error(`获取列表数据失败：${res.msg}`)
                        return false
                    }
                    this.userList = res.data.list
                    this.pageData.totalCount = res.data.total
                    this.pageData.pageCount = this.pageData.totalCount / 10
                })
            }
        },
        mounted () {
         this.getUserList()
        }
    }
</script>

<style lang="stylus" scoped>
    .user-data {
        .control-banner {
            margin: 15px 0 0 0px;
        }
    }
</style>
