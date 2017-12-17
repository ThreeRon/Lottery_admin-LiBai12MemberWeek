<template>
    <div class="prizeDialog">
        <el-dialog title="添加奖品项" :visible.sync="prizeDialogVisible"
                   append-to-body :close-on-click-modal="false">
            <!--共有基础信息-->
            <el-form :model="baseForm" label-width="90px" :rules="baseRules" ref="baseForm">
                <el-form-item label="奖品名称" prop="prizeName">
                    <el-input v-model="baseForm.prizeName"></el-input>
                </el-form-item>
                <upload-box @updateimg="updateImg"></upload-box>
                <el-form-item label="奖品类型" prop="prizeType">
                    <el-select v-model="baseForm.prizeType" @change="prizeTypeChange" placeholder="请选择">
                        <el-option label="微信红包（定额）" :value="1"></el-option>
                        <el-option label="微信红包（随机）" :value="2"></el-option>
                        <el-option label="线上优惠券" :value="4"></el-option>
                        <el-option label="实物" :value="3"></el-option>
                        <el-option label="积分" :value="5"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <!--微信红包(定额) begin-->
            <div v-show="baseForm.prizeType===1">
                <el-form :model="type1Form" label-width="90px" :rules="type1Rules" ref="type1Form">
                    <el-form-item label="金额" prop="bounsAmount">
                        <el-input v-model.number="type1Form.bounsAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="红包数量" prop="prizeCount">
                        <el-input v-model.number="type1Form.prizeCount"><template slot="append">已消耗0个</template></el-input>
                    </el-form-item>
                    <el-form-item label="中奖概率" prop="luckyPR">
                        <el-input v-model.number="type1Form.luckyPR"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="发放人" prop="bounsGrantName">
                        <el-input v-model="type1Form.bounsGrantName"></el-input>
                    </el-form-item>
                    <el-form-item label="祝福语" prop="bounsBlessings">
                        <el-input type="textarea" v-model="type1Form.bounsBlessings"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <!--微信红包(随机) begin-->
            <div v-show="baseForm.prizeType===2">
                <el-form :model="type2Form" label-width="90px" :rules="type2Rules" ref="type2Form">
                    <el-form-item label="金额范围" required :show-message="false">
                        <el-col :span="11">
                            <el-form-item prop="bounsRangeMin">
                                <el-input v-model.number="type2Form.bounsRangeMin"><template slot="append">元</template></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center">~</el-col>
                        <el-col :span="11">
                            <el-form-item prop="bounsRangeMax">
                                <el-input v-model.number="type2Form.bounsRangeMax"><template slot="append">元</template></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="红包数量" prop="prizeCount">
                        <el-input v-model.number="type2Form.prizeCount"><template slot="append">已消耗0个</template></el-input>
                    </el-form-item>
                    <el-form-item label="中奖概率" prop="luckyPR">
                        <el-input v-model.number="type2Form.luckyPR"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="发放人" prop="bounsGrantName">
                        <el-input v-model="type2Form.bounsGrantName"></el-input>
                    </el-form-item>
                    <el-form-item label="祝福语" prop="bounsBlessings">
                        <el-input type="textarea" v-model="type2Form.bounsBlessings"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <!--实物 begin-->
            <div v-show="baseForm.prizeType===3">
                <el-form :model="type3Form" label-width="90px" :rules="type3Rules" ref="type3Form">
                    <el-form-item label="奖品数量" prop="prizeCount">
                        <el-input v-model.number="type3Form.prizeCount"><template slot="append">已消耗0个</template></el-input>
                    </el-form-item>
                    <el-form-item label="中奖概率" prop="luckyPR">
                        <el-input v-model.number="type3Form.luckyPR"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="领奖信息">
                        <el-checkbox-group v-model="type3Form.formFieldsCpt">
                            <el-checkbox label="1" >姓名</el-checkbox>
                            <el-checkbox label="2">电话</el-checkbox>
                            <el-checkbox label="3">地址</el-checkbox>
                            <el-checkbox label="4">身份证</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </div>

            <!--线上优惠 begin-->
            <div v-show="baseForm.prizeType===4">
                <el-form :model="type4Form" label-width="90px" :rules="type4Rules" ref="type4Form">
                    <el-form-item label="奖品数量" prop="prizeCount">
                        <el-input v-model.number="type4Form.prizeCount"><template slot="append">已消耗0个</template></el-input>
                    </el-form-item>
                    <el-form-item label="中奖概率" prop="luckyPR">
                        <el-input v-model.number="type4Form.luckyPR"><template slot="append">%</template></el-input>
                    </el-form-item>
                    <el-form-item label="兑换链接" prop="exchangeLink">
                        <el-input v-model="type4Form.exchangeLink" placeholder="请输入兑换链接"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券号" prop="exchangeCode">
                        <el-radio v-model="type4Form.exchangeCode" label="无需券号">无需券号</el-radio>
                        <el-radio v-model="type4Form.exchangeCode" label="本地上传">本地上传</el-radio>
                    </el-form-item>
                    <el-upload drag  :action="uploadCodeAction" multiple style="text-align: center">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">请按照我们的标准模板填写信息 <a href="#">下载模板</a></div>
                    </el-upload>
                </el-form>
            </div>

            <!--积分 begin-->
            <div v-show="baseForm.prizeType===5">
                <el-form :model="type5Form" label-width="90px" :rules="type5Rules" ref="type5Form">
                    <el-form-item label="积分" prop="point">
                        <el-input v-model.number="type5Form.point"></el-input>
                    </el-form-item>
                    <el-form-item label="奖品数量" prop="prizeCount">
                        <el-input v-model.number="type5Form.prizeCount"><template slot="append">已消耗0个</template></el-input>
                    </el-form-item>
                    <el-form-item label="中奖概率" prop="luckyPR">
                        <el-input v-model.number="type5Form.luckyPR"><template slot="append">%</template></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addPrizeItem">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import UploadBox from '@/components/uploadBox'

    export default {
        data () {
            let checkFormFieldsCpt = (rule, value, callback) => {
                if (value && value.length > 3) {
                    callback(new Error('领奖信息最多可勾选3项'))
                } else callback()
            }
            let checkNumRange = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入金额范围1~200'));
                } else if (!Number.isInteger(value)) {
                    callback(new Error('金额必需是数值'));
                } else if (value < 1 || value > 200) {
                    callback(new Error('最小金额不小于1，最大金额不超过200'));
                } else {
                    callback()
                }
            }
            return {
                prizeIndex: -1,   // 当前修改或新增的奖品的下标（默认-1表示新增）
                uploadCodeAction: window.location.origin + '/upload/code',
                prizeDialogVisible: false,
                baseForm: {
                    prizeName: '',
                    prizeType: '',
                    prizeImg: ''
                },
                baseRules: {
                    prizeName: [{required: true, message: '请输入奖品名称', trigger: 'blur'}],
                    prizeType: [{required: true, message: '请选择奖品类型', trigger: 'blur'}]
                },
                type1Form: {
                    prizeCount: '',
                    luckyPR: '',
                    bounsAmount: '',
                    bounsGrantName: '',
                    bounsBlessings: ''
                },
                type1Rules: {
                    bounsAmount: [
                        {required: true, message: '请设置红包金额', trigger: 'blur'},
                        {type: 'number', message: '金额必需是数值', trigger: 'blur'}
                    ],
                    prizeCount: [
                        {required: true, message: '请设置红包数量', trigger: 'blur'},
                        {type: 'number', message: '红包数量必需是数值', trigger: 'blur'}
                    ],
                    luckyPR: [
                        {required: true, message: '请设置中奖概率', trigger: 'blur'},
                        {type: 'number', message: '中奖概率必需是数值', trigger: 'blur'}
                    ]
                },
                type2Form: {
                    prizeCount: '',
                    luckyPR: '',
                    bounsGrantName: '',
                    bounsBlessings: '',
                    bounsRangeMin: '',
                    bounsRangeMax: ''
                },
                type2Rules: {
                    bounsRangeMin: [
                        {validator: checkNumRange, trigger: 'blur'}
                    ],
                    bounsRangeMax: [
                        {validator: checkNumRange, trigger: 'blur'}
                    ],
                    prizeCount: [
                        {required: true, message: '请设置红包数量', trigger: 'blur'},
                        {type: 'number', message: '红包数量必需是数值', trigger: 'blur'}
                    ],
                    luckyPR: [
                        {required: true, message: '请设置中奖概率', trigger: 'blur'},
                        {type: 'number', message: '中奖概率必需是数值', trigger: 'blur'}
                    ]
                },
                type3Form: {
                    prizeCount: '',
                    luckyPR: '',
                    formFieldsCpt: ['1','2','3']
                },
                type3Rules: {
                    prizeCount: [
                        {required: true, message: '请设置奖品数量', trigger: 'blur'},
                        {type: 'number', message: '奖品数量必需是数值', trigger: 'blur'}
                    ],
                    luckyPR: [
                        {required: true, message: '请设置中奖概率', trigger: 'blur'},
                        {type: 'number', message: '中奖概率必需是数值', trigger: 'blur'}
                    ],
                    formFieldsCpt: [
                        {type: 'array', message: '', trigger: 'blur'},
                        {validator: checkFormFieldsCpt, trigger: 'blur'}
                    ]
                },
                type4Form: {
                    exchangeCode: '本地上传',
                    exchangeLink: '',
                    prizeCount: '',
                    luckyPR: ''
                },
                type4Rules: {
                    prizeCount: [
                        {required: true, message: '请设置奖品数量', trigger: 'blur'},
                        {type: 'number', message: '奖品数量必需是数值', trigger: 'blur'}
                    ],
                    luckyPR: [
                        {required: true, message: '请设置中奖概率', trigger: 'blur'},
                        {type: 'number', message: '中奖概率必需是数值', trigger: 'blur'}
                    ],
                    exchangeLink: [{required: true, message: '请设置兑换链接', trigger: 'blur'}],
                    exchangeCode: [{required: true, message: '请设置优惠券号', trigger: 'blur'}]
                },
                type5Form: {
                    prizeCount: '',
                    luckyPR: '',
                    point: ''
                },
                type5Rules: {
                    prizeCount: [
                        {required: true, message: '请设置奖品数量', trigger: 'blur'},
                        {type: 'number', message: '奖品数量必需是数值', trigger: 'blur'}
                    ],
                    luckyPR: [
                        {required: true, message: '请设置中奖概率', trigger: 'blur'},
                        {type: 'number', message: '中奖概率必需是数值', trigger: 'blur'}
                    ],
                    point: [
                        {required: true, message: '请设置积分数量', trigger: 'blur'},
                        {type: 'number', message: '积分数量必需是数值', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            prizeTypeChange (val) {
                // 修改奖品类型后重置表单
                if (this.$refs.type1Form) this.$refs.type1Form.resetFields()
                if (this.$refs.type2Form) this.$refs.type2Form.resetFields()
                if (this.$refs.type3Form) this.$refs.type3Form.resetFields()
                if (this.$refs.type4Form) this.$refs.type4Form.resetFields()
                if (this.$refs.type5Form) this.$refs.type5Form.resetFields()
            },
            // 保存奖品弹框的奖品信息
            addPrizeItem () {
                this.$refs.baseForm.validate((valid) => {
                    if (valid) {
                        let prizeForm = {}
                        switch (this.baseForm.prizeType) {
                            case 1 :
                                this.$refs.type1Form.validate((vd) => {
                                    if (vd) {
                                        prizeForm = Object.assign({}, this.baseForm, this.type1Form)
                                        this.$emit('addprizeitem', {prizeItem: prizeForm, index: this.prizeIndex})
                                        this.closeDialog()
                                    } else {
                                        return false
                                    }
                                })
                                break
                            case 2 :
                                this.$refs.type2Form.validate((vd) => {
                                    if (vd) {
                                        prizeForm = Object.assign({}, this.baseForm, this.type2Form)
                                        this.$emit('addprizeitem', {prizeItem: prizeForm, index: this.prizeIndex})
                                        this.closeDialog()
                                    } else {
                                        return false
                                    }
                                })
                                break
                            case 3 :
                                this.$refs.type3Form.validate((vd) => {
                                    if (vd) {
                                        prizeForm = Object.assign({}, this.baseForm, this.type3Form)
                                        this.$emit('addprizeitem', {prizeItem: prizeForm, index: this.prizeIndex})
                                        this.closeDialog()
                                    } else {
                                        return false
                                    }
                                })
                                break
                            case 4 :
                                this.$refs.type4Form.validate((vd) => {
                                    if (vd) {
                                        prizeForm = Object.assign({}, this.baseForm, this.type4Form)
                                        this.$emit('addprizeitem', {prizeItem: prizeForm, index: this.prizeIndex})
                                        this.closeDialog()
                                    } else {
                                        return false
                                    }
                                })
                                break
                            case 5 :
                                this.$refs.type5Form.validate((vd) => {
                                    if (vd) {
                                        prizeForm = Object.assign({}, this.baseForm, this.type5Form)
                                        this.$emit('addprizeitem', {prizeItem: prizeForm, index: this.prizeIndex})
                                        this.closeDialog()
                                    } else {
                                        return false
                                    }
                                })
                                break
                        }
                    } else {
                        return false;
                    }
                })
            },
            // 关闭弹窗
            closeDialog () {
                this.prizeDialogVisible = false
                this.$refs.baseForm.resetFields()
                this.$refs.type1Form.resetFields()
                this.$refs.type2Form.resetFields()
                this.$refs.type3Form.resetFields()
                this.$refs.type4Form.resetFields()
                this.$refs.type5Form.resetFields()
            },
            // 打开弹窗
            openDialog (obj, index) {
                if (obj) {
                    this.prizeIndex = index
                    for (let key of Object.keys(obj)) {
                        if (key === 'prizeName' || key === 'prizeImg' || key === 'prizeType') {
                            this.baseForm[key] = obj[key]
                        } else if (key !== 'prizeType' && obj.prizeType === 1) {
                            this.type1Form[key] = obj[key]
                        } else if (key !== 'prizeType' && obj.prizeType === 2) {
                            this.type2Form[key] = obj[key]
                        } else if (key !== 'prizeType' && obj.prizeType === 3) {
                            this.type3Form[key] = obj[key]
                        } else if (key !== 'prizeType' && obj.prizeType === 4) {
                            this.type4Form[key] = obj[key]
                        } else if (key !== 'prizeType' && obj.prizeType === 5) {
                            this.type5Form[key] = obj[key]
                        }
                    }
                }
              this.prizeDialogVisible = true
            },
            // 上传组件回传的预览图url
            updateImg (val) {
              this.baseForm.prizeImg = val
            }
        },
        components: {
            uploadBox: UploadBox
        }
    }
</script>

<style lang="stylus" scoped>
</style>
