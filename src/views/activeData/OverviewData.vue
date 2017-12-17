<template>
    <div class="overview-data">
        <div class="block" style="text-align: right;margin-top:10px;">
            <el-date-picker
                    @change="dateChange"
                    v-model="dateRange"
                    type="daterange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" >
            </el-date-picker>
        </div>
        <!--数据纵列-->
        <div class="block" v-loading="loading">
            <h2 class="title">数据概况</h2>
            <grid-data-box :gridArr="gridArr"></grid-data-box>
        </div>

        <!--趋势图-->
        <div class="block" v-loading="loading">
            <h2 class="title">趋势图</h2>
            <el-row>
                <div ref="charts" id="charts"></div>
            </el-row>
        </div>

        <!--数据列表-->
        <div class="block" v-loading="loading">
            <el-button type="primary" class="fr loadBtn">下载数据详情</el-button>
            <el-table :data="dataList" style="width: 100%" max-height="250">
                <el-table-column prop="date" label="日期" min-width="80"></el-table-column>
                <el-table-column prop="cyNum" label="参与人数" min-width="60"></el-table-column>
                <el-table-column prop="zjNum" label="中奖人数" min-width="80"></el-table-column>
                <el-table-column prop="cjNum" label="抽奖次数" min-width="80"></el-table-column>
                <el-table-column prop="xhNum" label="奖品消耗量" min-width="100"></el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    import {getOverViewAPI} from '@/api/api'
    import Echarts from 'echarts'
    import {dateFormat} from '@/common/js/util'
    import GridDataBox from '@/components/gridDataBox'
    export default {
        data: function () {
            return {
                value2: new Date('2017','3','28'),
                loading: false,
                dateRange: [dateFormat(new Date(new Date()-24*60*60*1000*7)), dateFormat(new Date())] ,
                dataList: [],
                gridArr: [
                    {
                        num: 0,
                        text: '参与人数'
                    },
                    {
                        num: 0,
                        text: '中奖人数'
                    },
                    {
                        num: 0,
                        text: '抽奖人数'
                    },
                    {
                        num: 0,
                        text: '奖品消耗'
                    }
                ],
                option: {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['参与人数', '中奖人数', '抽奖次数', '奖品消耗量', '搜索引擎']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '参与人数',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: []
                        },
                        {
                            name: '中奖人数',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: []
                        },
                        {
                            name: '抽奖次数',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: []
                        },
                        {
                            name: '奖品消耗量',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data: []
                        }
                    ]
                }
            }
        },
        methods: {
            dateChange () {
                console.log(this.dateRange)
                this.getOverViewData()
            },
            getOverViewData () {
                let params = {
                    id: this.$router.history.current.params.id,
                    startDate: this.dateRange[0],
                    endDate: this.dateRange[1]
                }
                console.log('params:', params)
                this.loading = true
                getOverViewAPI(params).then((res) => {
                    this.loading = false
                if(res.code !== 0){
                    this.$message.error(`获取数据失败：${res.msg}`)
                    return false
                }
                let overViewData = res.data
                // 概览数据
                this.gridArr[0].num = overViewData.cyNumCount
                this.gridArr[1].num = overViewData.zjNumCount
                this.gridArr[2].num = overViewData.cjNumCount
                this.gridArr[3].num = overViewData.xhNumCount
                // 表格数据
                this.dataList = overViewData.detail
                // 趋势图数据
                this.dataList.forEach((item, index) => {
                    this.option.xAxis[0].data.push(item.date)
                    this.option.series[0].data.push(item.cyNum)
                    this.option.series[1].data.push(item.zjNum)
                    this.option.series[2].data.push(item.cjNum)
                    this.option.series[3].data.push(item.xhNum)
                })
                if (this.dataList.length > 0) {
                    let charts = Echarts.init(document.getElementById('charts'))
                    charts.setOption(this.option)
                }
            })
            }
        },
        mounted: function () {
            this.getOverViewData()
        },
        components: {
            gridDataBox: GridDataBox
        }
    }
</script>

<style lang="stylus" scoped>
    .overview-data {
    .title {
        font-size: 16px;
        padding: 0 10px 10px 10px;
    }
    .loadBtn {
        margin: 10px 0;
    }
    .block:nth-child(3) {
        background:#fff;
        margin: 5px 0;
        padding-bottom: 15px;
    }
    }
    #charts {
        width: 50%;
        margin: 0 auto;
        height: 300px;
    }
</style>
