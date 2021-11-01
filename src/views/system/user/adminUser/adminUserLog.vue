<template>
  <d2-container type="full">
    <template slot="header">
      <h4 >日志搜索</h4>
      <el-form :model="queryParams" ref="form" :inline="true">
        <el-col :span=7>
        <el-form-item label="操作人用户名" prop="operatName" label-width="100px">
            <el-input v-model="queryParams.operatName" placeholder="请输入操作人用户名"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span=7>
        <el-form-item label="用户名" prop="loginName" label-width="100px">
            <el-select v-model="queryParams.AdminUserLogType" placeholder="请选择">
                <el-option v-for="item in commonEnums.AdminUserLogType"
                :key="item.value"
                :value="item.value"
                :label="item.label" />
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span=3>
        <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
        </el-form-item>
        </el-col>
      </el-form>

    </template>
    <template slot="default">
      <el-table :data="adminUserLogList" size="mini" empty-text="未查询到用户信息" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" fixed />
        <el-table-column type="index" width="50" label="序号" align="center" />
        <el-table-column prop="title" label="操作信息" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="createTime" label="操作时间" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="ipAddress" label="IP" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="AdminUserLogType" label="操作类型" :show-overflow-tooltip="true" align="center" >
          <template slot-scope="scope">
            <span v-for="item in commonEnums.AdminUserLogType"
              v-show="item.value === scope.row.AdminUserLogType" :key="item.value">{{item.label}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operatName" label="操作人" :show-overflow-tooltip="true" align="center" />
      </el-table>

      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="queryParams.pageNum"
            :page-size="queryParams.pageSize"
            :total="total"
            @current-change="handlePageChange"
        ></el-pagination>
    </div>
    </template>
    <admin-user-form ref="adminUserForm" :totalRoles="roles" :searchAdminUser="searchAdminUser"></admin-user-form>
  </d2-container>
</template>

<script>
import { commonEnums } from '@/api/common/param'
import axios from 'axios'
import adminUserForm from './adminUserForm.vue'
export default {
  name: 'AdminUserLog',
  components: {
    adminUserForm
  },
  data () {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      commonEnums: commonEnums,
      multipleSelection: [], // 多选框选中项
      ids: [], // 选中项的id
      adminUserLogList: [],
      total: 0

    }
  },
  created () {
    this.getRoles()
    this.searchAdminUser()
  },
  methods: {
    searchAdminUser () {
      this.$axiosRequest('/system/armAdminUserLog/getLogPage', this.queryParams, { method: 'get' })
        .then((res) => {
          this.adminUserLogList = res.page.records
          this.total = res.page.total
        })
    },
    handleQuery () {
      this.queryParams.pageNum = 1
      this.searchAdminUser()
    },
    handleEdit (adminUser) {
      this.$refs.adminUserForm.show(adminUser)
    },
    handleDisableAdminUser (row) {
      this.ids = [row.id]
      this.disableAdminUser()
    },
    handlePageChange (val) {
      this.queryParams.pageNum = val
      this.searchAdminUser()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getRoles () {
      this.$axiosRequest('system/armRole/getTotalRoles', {}, this.$axiosOptions('get'))
        .then(res => {
          this.roles = res.totalRoles
        })
    },
    disableAllSelection () {
      this.ids = []
      if (this.multipleSelection.length <= 0) {
        this.$message.error('请选择需要禁用的用户！')
        return
      }
      this.multipleSelection.forEach((item) => {
        this.ids.push(item.id)
      })
      this.disableAdminUser()
    },
    handleDelete (row) {
      this.ids = [row.id]
      this.deleteAdminUser()
    },
    deleteAdminUser () {
      if (this.ids.length === 0) {
        this.$message.error('请选择要删除的用户!')
        return
      }
      this.$confirm('确定删除选中的用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'post',
          url: '/system/armAdminUser/deleteAdminUser',
          data: this.ids
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.msg)
            return
          }
          this.$message.success('删除成功!')
          this.searchAdminUser()
        })
        // this.$axiosRequest('/system/armUserInfo/deleteUser', JSON.stringify({ ids: this.ids }), this.$axiosOptions('post'))
      })
    },
    disableAdminUser () {
      if (this.ids.length === 0) {
        this.$message.error('请选择要禁用的用户!')
        return
      }
      axios({
        method: 'post',
        url: '/system/armAdminUser/disableAdminUser',
        data: this.ids
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.msg)
          return
        }
        this.$message.success('操作成功!')
        this.searchAdminUser()
      })
    },
    handleEnableAdminUser (row) {
      this.ids = [row.id]
      this.enableAdminUser()
    },
    enableAdminUser () {
      if (this.ids.length === 0) {
        this.$message.error('请选择要启用的用户!')
        return
      }
      axios({
        method: 'post',
        url: '/system/armAdminUser/enableAdminUser',
        data: this.ids
      }).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.msg)
          return
        }
        this.$message.success('操作成功!')
        this.searchAdminUser()
      })
    }
  }

}
</script>
