<template>
    <div>
        <el-dialog :title='title' :visible.sync="visible" width="70%" :before-close="close" :close-on-click-modal="false" :inline="true">
            <el-form ref="userInfoForm" :model="user" :rules="rules">
                <el-col :span="12">
                    <el-form-item label="借书证号(金盘条码)" prop="readerId" label-width="150px">
                        <el-input v-model="user.readerId" placeholder="请输入借书证号" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="读者姓名" prop="readerName" label-width="150px">
                        <el-input v-model="user.readerName" placeholder="请输入读者姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="登录账号" prop="loginName" label-width="150px">
                        <el-input v-model="user.loginName" placeholder="登陆账号最少6位，包含数字和字母" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="登录密码" prop="loginPassword" label-width="150px">
                        <el-input type="password" v-model="user.loginPassword"
                          :placeholder="title == '新增读者' ? '密码最少6位，必须包含大写字母、小写字母和数字' : '为空表示不修改'" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="金盘证号(一卡通ID)" prop="cardId" label-width="150px">
                        <el-input v-model="user.cardId" placeholder="请输入金盘证号" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="读者类型" prop="readerType" label-width="150px">
                        <el-select v-model="user.readerType" placeholder="请选择">
                            <el-option
                                v-for="item in param.readerType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="读者单位" prop="readerUnit" label-width="150px">
                        <el-select v-model="user.readerUnit" placeholder="请选择">
                            <el-option
                                v-for="item in readerUnit"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="读者来源" prop="readerSrc" label-width="150px">
                        <el-select v-model="user.readerSrc" placeholder="请选择">
                            <el-option
                                v-for="item in param.readerSrc"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="学位" prop="degree" label-width="150px">
                        <el-select v-model="user.degree" placeholder="请选择">
                            <el-option
                                v-for="item in param.degree"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别" prop="sex" label-width="150px">
                        <el-select v-model="user.sex" placeholder="请选择">
                            <el-option label="男" value="1" />
                            <el-option label="女" value="2" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="借书证状态" prop="cardStatus" label-width="150px">
                        <el-select v-model="user.cardStatus" placeholder="请选择">
                            <el-option
                                v-for="item in param.cardStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账号状态" prop="reviewStatus" label-width="150px">
                        <el-select v-model="user.reviewStatus" placeholder="请选择">
                            <el-option
                                v-for="item in param.reviewStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="专家申请" prop="showWriter" label-width="150px">
                        <el-select v-model="user.showWriter" placeholder="请选择">
                            <el-option
                                v-for="item in param.writerStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱" prop="email" label-width="150px">
                        <el-input v-model="user.email" placeholder="请输入邮箱" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址" prop="address" label-width="150px">
                        <el-input v-model="user.address" placeholder="请输入地址" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号" prop="phoneNumber" label-width="150px">
                        <el-input v-model="user.phoneNumber" placeholder="请输入手机号码" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="办公电话" prop="telephone" label-width="150px">
                        <el-input v-model="user.telephone" placeholder="请输入办公电话" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发证日期" prop="certificationTime" label-width="150px">
                        <el-date-picker
                            v-model="user.certificationTime"
                            type="date"
                            placeholder="选择发证日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="截至日期" prop="deadlineTime" label-width="150px">
                        <el-date-picker
                            v-model="user.deadlineTime"
                            type="date"
                            placeholder="选择截至日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密保问题" prop="ask" label-width="150px">
                        <el-input v-model="user.ask" placeholder="请输入密保问题" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密保答案" prop="answer" label-width="150px">
                        <el-input v-model="user.answer" placeholder="请输入密保答案" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="关联账号ID" prop="answer" label-width="150px">
                        <el-input v-model="user.answer" placeholder="请输入关联账号ID" />
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="头像上传" prop="avatar" label-width="150px">
                        <el-upload
                          action=""
                          class="avatar-uploader"
                          :show-file-list="false"
                          accept="image/*"
                          :http-request="uploadAvatar"
                          :on-change="fileChange"
                          :before-upload="beforeAvatarUpload">
                            <img v-if="user.avatar" :src="api+user.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="个人介绍" prop="present" label-width="150px">
                        <d2-quill
                            ref="quill"
                            style="min-height: 200px; margin-bottom: 20px;max-height:300px"
                            v-model="user.present" />
                    </el-form-item>
                </el-col>
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit();">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import { commonEnums } from '@/api/common/param'
import axios from 'axios'
import { validPassWord, validUsername, validEmail } from '@/utils/validate'
const sm2 = require('sm-crypto').sm2
const publicKey = require('@api/service').publicKey
export default {
  props: [
    'searchUser'
  ],
  data () {
    var validatePassword = (rule, value, callback) => {
      if (this.title !== '新增读者' && !value) {
        callback()
      }
      if (!value) {
        callback(new Error('密码不能为空!'))
      }
      if (!validPassWord(value)) {
        callback(new Error('密码最少6位，必须包含大写字母、小写字母和数字'))
      }
      callback()
    }
    var validateLoginName = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('登陆账号最少6位，包含数字和字母'))
      }
      callback()
    }
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback()
      }
      if (!validEmail(value)) {
        callback(new Error('邮箱格式不正确,请检查!'))
      }
      callback()
    }
    return {
      title: '',
      visible: false,
      user: {}, // 用户数据
      type: '',
      param: commonEnums,
      readerUnit: [],
      api: process.env.VUE_APP_API,
      rules: {
        readerName: [
          { required: true, message: '姓名不能为空!', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '登录账号不能为空!', trigger: 'blur' },
          { validator: validateLoginName, trigger: 'blur' }
        ],
        loginPassword: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        reviewStatus: [
          { required: true, message: '账号状态不能为空!', trigger: 'blur' }
        ],
        cardStatus: [
          { required: true, message: '借书证状态不能为空!', trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show (user) {
      this.visible = true
      this.user = JSON.parse(JSON.stringify(user))
      if (user && user.id) {
        this.title = '修改读者信息'
      } else {
        this.title = '新增读者'
      }
    },
    close () {
      this.$refs.quill.Quill.setContents({})
      this.visible = false
    },
    beforeAvatarUpload (file) {
    //   const isJPG = file.type === 'image/*'
      const isLt5M = file.size / 1024 / 1024 < 5

      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 图片 格式!')
      //   }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isLt5M
    },
    fileChange (file) {
      this.file = file.raw
    },
    uploadAvatar () {
      const param = new FormData()
      param.append('file', this.file)
      param.append('annexSrc', 'OTHER')
      axios({
        method: 'post',
        url: '/common/upload/',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: param
      }).then((res) => {
        this.user.avatar = res.data.path
        this.user = JSON.parse(JSON.stringify(this.user))
      })
    },
    submit () {
      this.$refs.userInfoForm.validate(valid => {
        if (valid) {
          const user = JSON.parse(JSON.stringify(this.user))
          user.loginPassword = '04' + sm2.doEncrypt(this.user.loginPassword, publicKey, 1)
          this.$axiosRequest('/system/armUserInfo/addOrModifyUserInfo', user, this.$axiosOptions('post', null, null, true))
            .then(res => {
              if (!res.success) {
                this.$message.error(res.msg)
                return
              }
              this.$message.success('操作成功!')
              this.visible = false
              this.searchUser()
            })
        }
      })
    }

  }
}

</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 118px;
    height: 118px;
    line-height: 118px;
    text-align: center;
  }
  .avatar {
    width: 118px;
    height: 118px;
    display: block;
  }
</style>
