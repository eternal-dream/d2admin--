<template>
    <div>
        <el-dialog :title='title' :visible.sync="visible" width="70%" :before-close="close" :close-on-click-modal="false" :inline="true">
            <el-form ref="adminUserForm" :model="adminUser" :rules="rules">
                <el-col :span="12">
                    <el-form-item label="登录名称" prop="loginName" label-width="150px">
                        <el-input v-model="adminUser.loginName" placeholder="登陆名最少6位，包含数字和字母" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="登录密码" prop="loginPassword" label-width="150px">
                        <el-input type="password" v-model="adminUser.loginPassword"
                        :placeholder="title==='新增馆员' ? '密码最少6位，必须包含大写字母、小写字母和数字':'不填表示不修改'" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="真实姓名" prop="realName" label-width="150px">
                        <el-input v-model="adminUser.realName" placeholder="请输入真实姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱" prop="email" label-width="150px">
                        <el-input v-model="adminUser.email" placeholder="请输入邮箱" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号码" prop="phoneNumber" label-width="150px">
                        <el-input v-model="adminUser.phoneNumber" placeholder="请输入手机号码" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="显示顺序" prop="sort" label-width="150px">
                        <el-input-number :step="1" v-model="adminUser.sort" placeholder="请输入显示顺序" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="工号" prop="number" label-width="150px"
                      :rules="{ max:30, message: '最多30个字符'}">
                        <el-input v-model="adminUser.number" placeholder="请输入工号" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="状态" label-width="150px">
                        <el-switch
                            v-model="status"
                            active-text="启用"
                            inactive-text="禁用">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理员角色" prop="roleId" label-width="150px">
                      <el-select v-model="selectedRoleId" @change="selectRole()" placeholder="请选择角色">
                            <el-option v-for="role in totalRoles"
                            :key="role.id"
                            :value="role.id"
                            :label="role.name" />
                        </el-select>
                      <el-col :span="12" :key="role.id"
                          v-for="role in roles">
                        <el-tag
                            closable
                            :disable-transitions="false"
                            @close="handleClose(role)">
                            {{role.name}}
                        </el-tag>
                      </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="上传头像" prop="avatar" label-width="150px">
                        <el-upload
                          action=""
                          class="avatar-uploader"
                          :show-file-list="false"
                          accept="image/*"
                          :on-change="fileChange"
                          :http-request="uploadAvatar"
                          :before-upload="beforeAvatarUpload">
                            <img v-if="adminUser.avatar" :src="api+adminUser.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark" label-width="150px">
                        <el-input type="textarea" v-model="adminUser.remark" placeholder="请输入备注信息" />
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
import axios from 'axios'
import { validPassWord, validUsername, validEmail } from '@/utils/validate'
const sm2 = require('sm-crypto').sm2
const publicKey = require('@api/service').publicKey
export default {
  props: [
    'totalRoles',
    'searchAdminUser'
  ],
  data () {
    var validatePassword = (rule, value, callback) => {
      if (this.title !== '新增馆员' && !value) {
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
      adminUser: {},
      status: true,
      api: process.env.VUE_APP_API,
      selectedRoleId: [], // 当前选中的角色
      roles: [],
      rules: {
        loginName: [
          { required: true, message: '登录名不能为空!', trigger: 'blur' },
          { validator: validateLoginName, trigger: 'blur' }
        ],
        loginPassword: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '姓名不能为空!', trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show (adminUser) {
      this.adminUser = JSON.parse(JSON.stringify(adminUser))
      if (adminUser && adminUser.id) {
        this.title = '修改馆员信息'
        this.getAdminRoles()
      } else {
        this.title = '新增馆员'
        this.roles = []
      }
      this.visible = true
    },
    close () {
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
        this.adminUser.avatar = res.data.path
        this.adminUser = JSON.parse(JSON.stringify(this.adminUser))
      })
    },
    getAdminRoles () {
      this.$axiosRequest('/system/armRole/getAdminRoles', { id: this.adminUser.id }, this.$axiosOptions('get'))
        .then(res => {
          this.roles = res.roles || []
        })
    },
    handleClose (role) {
      this.roles = this.roles.filter(item => {
        return item.id !== role.id
      })
    },
    selectRole () {
      let role = null
      this.totalRoles.forEach(item => {
        if (item.id === this.selectedRoleId) {
          role = item
        }
      })
      this.roles = this.roles.filter(item => {
        return item.id !== role.id
      })
      this.roles.push(role)
    },
    submit () {
      if (this.status) {
        this.adminUser.loginStatus = 'ENABLE'
      } else {
        this.adminUser.loginStatus = 'DISABLE'
      }
      this.$refs.adminUserForm.validate(valid => {
        if (valid) {
          const adminUser = JSON.parse(JSON.stringify(this.adminUser))
          adminUser.loginPassword = '04' + sm2.doEncrypt(adminUser.loginPassword, publicKey, 1)
          adminUser.roleIds = []
          this.roles.forEach(role => {
            adminUser.roleIds += role.id + ','
          })
          this.$axiosRequest('/system/armAdminUser/addOrModifyAdminUser', adminUser, this.$axiosOptions('post', null, null, true))
            .then(res => {
              if (!res.success) {
                this.$message.error(res.msg)
                return
              }
              this.$message.success('操作成功!')
              this.visible = false
              this.searchAdminUser()
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
