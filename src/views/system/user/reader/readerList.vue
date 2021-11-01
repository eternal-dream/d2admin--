<template>
  <d2-container type="full">
    <template slot="header">
      <h4 >用户搜索</h4>
      <el-form :model="queryParams" ref="form" :inline="true">
        <el-col :span=8>
        <el-form-item label="专家申请" prop="showWriter" label-width="100px">
            <el-select v-model="queryParams.showWriter" placeholder="请选择" @keyup.enter.native="handleQuery">
              <el-option
                v-for="item in param.writerStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span=8>
        <el-form-item label="读者类型" prop="readerType" label-width="100px">
            <el-select v-model="queryParams.readerType" placeholder="请选择" @keyup.enter.native="handleQuery">
              <el-option
                v-for="item in readerType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span=8>
        <el-form-item label="借书证状态" prop="cardStatus" label-width="100px">
            <el-select v-model="queryParams.cardStatus" placeholder="请选择" @keyup.enter.native="handleQuery">
              <el-option
                v-for="item in param.cardStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span=8>
        <el-form-item label="账号状态" prop="reviewStatus" label-width="100px">
            <el-select v-model="queryParams.reviewStatus" placeholder="请选择" @keyup.enter.native="handleQuery">
              <el-option
                v-for="item in param.reviewStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span=8>
        <el-form-item label="读者单位" prop="readerUnit" label-width="100px">
            <el-select v-model="queryParams.readerUnit" placeholder="请选择" @keyup.enter.native="handleQuery">
              <el-option
                v-for="item in readerUnit"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span=8>
        <el-form-item label="读者来源" prop="readerSrc" label-width="100px">
            <el-select v-model="queryParams.readerSrc" placeholder="请选择" @keyup.enter.native="handleQuery">
              <el-option
                v-for="item in param.readerSrc"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span=7>
        <el-form-item label="检索字段" prop="searchField" label-width="100px">
            <el-select v-model="searchField" placeholder="请选择" @keyup.enter.native="handleQuery">
              <el-option
                v-for="item in fields"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span=5>
        <el-form-item label="" prop="searchField" label-width="100px">
            <el-input v-model="searchContent" placeholder="请输入检索内容"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span=4>
        <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
        </el-form-item>
        </el-col>
        <el-col :span=8>
          <el-form-item label="用户审核" label-width="100px">
            <el-switch
              active-text="开启"
              inactive-text="关闭">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col>
          <el-button type="success"  size="small" @click="handleEdit({})"><d2-icon name="plus" />新增</el-button>
          <el-button type="warning"  size="small" @click="handleExport()"><d2-icon name="print" />导出</el-button>
          <el-button type="primary"  size="small"><d2-icon name="exchange" />手动同步</el-button>
          <el-button type="danger"  size="small" @click="delAllSelection()"><d2-icon name="trash" />删除</el-button>
        </el-col>
      </el-form>

    </template>
    <template slot="default">
      <el-table :data="userInfoList" size="mini" empty-text="未查询到用户信息" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" fixed />
        <el-table-column prop="readerId" label="借书证号" :show-overflow-tooltip="true" fixed align="center"/>
        <el-table-column prop="readerName" label="姓名" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="readerType" label="读者类型" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="readerUnit" label="单位" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="readerSrc" label="读者来源" :show-overflow-tooltip="true" align="center" >
          <template slot-scope="scope">
            <span v-for="item in param.readerSrc"
              v-show="item.value === scope.row.readerSrc" :key="item.value">{{item.label}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardStatus" label="借书证状态" :show-overflow-tooltip="true" align="center" >
          <template slot-scope="scope">
            <span v-for="item in param.cardStatus"
              v-show="item.value === scope.row.cardStatus" :key="item.value">{{item.label}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reviewStatus" label="账号状态" :show-overflow-tooltip="true" align="center" >
          <template slot-scope="scope">
            <span v-for="item in param.reviewStatus"
              v-show="item.value === scope.row.reviewStatus" :key="item.value">{{item.label}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deadlineTime" label="截止日期" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="recentTime" label="最近登录" :show-overflow-tooltip="true" align="center" />
        <el-table-column label="操作" width="310px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-show="!scope.row.adminUserId"
              type="primary"
              icon="el-icon-edit"
              size="small"
              style="padding:5px;margin:0;"
              @click="handleAuthorize(scope.row)"
            >授权</el-button>
            <el-button
              v-show="scope.row.adminUserId"
              type="danger"
              icon="el-icon-edit"
              size="small"
              style="padding:5px;margin:0;"
              @click="authorize(scope.row)"
            >取消授权</el-button>
            <el-button
              type="success"
              icon="el-icon-edit"
              size="small"
              style="padding:5px"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="small"
              style="padding:5px"
              @click="handleEdit(scope.row)"
            >兴趣画像</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              class="red"
              size="small"
              style="padding:5px"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

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

    <authorize-form :totalRoles="roles" :authorize="authorize" ref="authorizeForm"></authorize-form>
    <user-info-form ref="userInfoForm" :searchUser="searchUser"></user-info-form>
  </d2-container>
</template>

<script>
import { commonEnums } from '@/api/common/param'
import authorizeForm from './authorizeForm.vue'
import userInfoForm from './userInfoForm.vue'
import axios from 'axios'
import { downloadFile } from '@/utils/zipdownload'
export default {
  name: 'ReaderList',
  components: {
    authorizeForm,
    userInfoForm
  },
  data () {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      param: commonEnums,
      multipleSelection: [], // 多选框选中项
      ids: [], // 选中项的id
      readerUnit: [],
      readerType: [],
      fields: [
        { label: '登录账号', value: 'loginName' },
        { label: '借书证号(金盘条码)', value: 'readerId' },
        { label: '姓名', value: 'readerName' },
        { label: '手机号', value: 'phoneNumber' }
      ],
      searchField: '',
      searchContent: '',
      userInfoList: [],
      total: 0,
      roles: []// 角色用以授权

    }
  },
  watch: {
    searchContent () {
      if (this.searchField) {
        this.$set(this.queryParams, this.searchField, this.searchContent)
      }
    },
    searchField (newVal, oldVal) { // 检索字段发生变化时，将之前的属性置空
      this.$set(this.queryParams, oldVal, null)
      if (this.searchContent) {
        this.$set(this.queryParams, this.searchField, this.searchContent)
      }
    }
  },
  methods: {
    searchUser () {
      this.$axiosRequest('/system/armUserInfo/getUserInfoPage', this.queryParams, this.$axiosOptions('get'))
        .then((res) => {
          this.userInfoList = res.userInfoPage.records
          this.total = res.userInfoPage.total
        })
    },
    handleQuery () {
      this.queryParams.pageNum = 1
      this.searchUser()
    },
    getRoles () {
      this.$axiosRequest('system/armRole/getTotalRoles', {}, this.$axiosOptions('get'))
        .then(res => {
          this.roles = res.totalRoles
        })
    },
    handleAuthorize (user) {
      this.$refs.authorizeForm.show(user)
    },
    authorize (user, roleId) {
      this.$axiosRequest('system/armUserInfo/userAuthorize', { userId: user.id, roleId: roleId }, this.$axiosOptions('post'))
        .then((res) => {
          this.$message.success(res.msg)
          this.searchUser()
        })
    },
    handlePageChange (val) {
      this.queryParams.pageNum = val
      this.searchUser()
    },
    handleEdit (user) {
      this.$refs.userInfoForm.show(user)
    },
    deleteUser () {
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
          url: '/system/armUserInfo/deleteUser',
          data: this.ids
        }).then(res => {
          if (!res.data.success) {
            this.$message.error(res.data.msg)
            return
          }
          this.$message.success('删除成功!')
          this.searchUser()
        })
        // this.$axiosRequest('/system/armUserInfo/deleteUser', JSON.stringify({ ids: this.ids }), this.$axiosOptions('post'))
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    delAllSelection () {
      this.ids = []
      if (this.multipleSelection.length <= 0) {
        this.$message.error('请选择需要删除的数据！')
        return
      }
      this.multipleSelection.forEach((item) => {
        this.ids.push(item.id)
      })
      this.deleteUser()
    },
    handleDelete (row) {
      this.ids = [row.id]
      this.deleteUser()
    },
    handleExport () {
      this.$axiosRequest('/system/armUserInfo/export', this.queryParams, this.$axiosOptions('get', null, 'blob'))
        .then(res => {
          downloadFile(res)
        })
      // const columns = [
      //   { label: '借书证号', prop: 'readerId' },
      //   { label: '姓名', prop: 'readerName' },
      //   { label: '读者类型', prop: 'readerType' },
      //   { label: '单位', prop: 'readerUnit' },
      //   { label: '读者来源', prop: 'readerSrc' },
      //   { label: '借书证状态', prop: 'cardStatus' },
      //   { label: '账号状态', prop: 'reviewStatus' },
      //   { label: '截止日期', prop: 'deadlineTime' },
      //   { label: '最近登录', prop: 'recentTime' }
      // ]
      // const data = JSON.parse(JSON.stringify(this.userInfoList))
      // data.forEach(item => {
      //   item.readerSrc = this.getLabel(this.param.readerSrc, item.readerSrc)
      //   item.cardStatus = this.getLabel(this.param.cardStatus, item.cardStatus)
      //   item.reviewStatus = this.getLabel(this.param.reviewStatus, item.reviewStatus)
      // })
      // this.$export.excel({
      //   columns,
      //   data,
      //   title: '读者列表'
      // })
    },
    getLabel (param, value) {
      let label = ''
      param.forEach(item => {
        if (item.value === value) {
          label = item.label
        }
      })
      return label
    }

  },
  created () {
    this.getRoles()
    this.searchUser()
  }
}
</script>
