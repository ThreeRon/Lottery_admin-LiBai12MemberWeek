<template>
    <div class="uploadBox">

        <el-upload action="http://upload-z2.qiniup.com/"
                   :show-file-list="false"
                   :data ="datas"
                   :before-upload="handleAvatarRule"
                   :on-success="handleAvatarSuccess"
                   :on-error="handleAvatarFail">
            <div class="upload-box">
                <img v-if="avatar" :src="avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div class="upload-msg">
                    <el-button size="small" type="primary">上传图片</el-button>
                    <p v-if="desc" class="desc">{{desc}}</p>
                </div>
            </div>
        </el-upload>



    </div>
</template>

<script>
    import {getUploadTokenAPI} from '@/api/api'
    export default {
        props: {
          desc: {
              type: String,
              default: '请上传5M以内，格式为jpg、bmp、png、gif的图片'
          },
          limit: {
              type: Number,
              default: 5
          }
        },
        data () {
            return {
                datas: {
                  key: '',
                  token: ''
                },
                downloadRUL: 'http://ouvjfhafx.bkt.clouddn.com/',
                avatar: '' // 预览图url
            }
        },
        methods: {
            // 图片上传成功事件
            handleAvatarSuccess(res, file) {
                // 显示图片
                console.log(res)
                this.avatar = this.downloadRUL + res.key
                this.$emit('updateimg', this.avatar)
            },
            // 图片上传失败事件
            handleAvatarFail(err, file, fileList) {
                this.$message.error(`图片上传失败：${err}`)

            },
            // 图片限制格式和大小
            handleAvatarRule (file) {
                if(!/.jpg$|.jpeg$|.png$/.test(file.type)) {
                  this.$message.error('图片类型必须是jpeg,jpg,png中的一种');
                  return false
                }
                const fileSizeFlag = file.size / 1024 / 1024 < this.limit;
                if (!fileSizeFlag) {
                    this.$message.error('上传图片大小不能超过 5MB!');
                    return false
                }

                return this.getUploadToken()
            },
            // 获取token和key
            getUploadToken () {
                getUploadTokenAPI().then(res => {
                    if (res.code === 0) {
                        this.datas.key = res.data.key
                        this.datas.token = res.data.upToken
                        return true
                    }
                    this.$message.error(`获取Token错误：${res.msg}`)
                        return false
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .upload-box
        display: flex;
        margin-bottom: 22px;
    .desc
        line-height: 28px;
        color: #666;
        font-weight: 100;
    .avatar
        width: 75px;
        height: 75px;
        display: block;
        float: left;
        border-radius: 4px;
    .avatar-uploader-icon
        font-size: 28px;
        color: #8c939d;
        width: 68px;
        height: 68px;
        line-height: 68px;
        text-align: center;
        border: 1px solid #8c939d;
        border-radius: 4px;
        margin-left: 5px;
    .upload-msg
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: space-around;
        text-align: left;
        margin-left: 22px;
    // 重写表单行高
    /*.el-form-item__content*/
        /*line-height: normal*/
</style>
