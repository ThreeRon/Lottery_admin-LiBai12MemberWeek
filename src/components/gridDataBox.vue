<template>

    <el-row class="grid-container" type="flex" justify="space-between">
        <el-col v-for="(item, index) in gridArr" :key="index">
            <div class="grid-part">
                <div class="grid-content">{{item.num}}</div>
                <div class="grid-tip">{{item.text}}</div>
            </div>
        </el-col>
    </el-row>

</template>

<script>
    export default {
        props: {
            gridArr: {
                type: Array,
                required: true,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .grid-container{
        background-color: #fff;
        margin: 20px 0;
        padding: 20px 0;
        .grid-part{
             text-align: center;
             border-right: 2px solid #E1E6EC;
             padding: 10px 0;
             font-weight: 700;
            .grid-content{
                font-size: 30px;
                text-shadow: 0 -1px 0 #858585,
                0 1px 4px rgba(0, 0, 0, .2),
                0 5px 4px rgba(0, 0, 0, .25);
            }
            .grid-tip{
                font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
                text-transform: uppercase;
                font-size: 20px;
                color: #555555;
                text-shadow: 0 2px 3px #c4b59d, 0px -1px 0.5px #fff;
                font-weight: bold;
                letter-spacing: -1px;
                text-align: center;
                margin-top: 10px;
            }
        }
        .el-col:last-child .grid-part{
            border-right-width: 0;
        }
    }
</style>
