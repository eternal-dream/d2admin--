<template>
    <div>
        <el-dialog title='授权' :visible.sync="visible" width="30%" :close-on-click-modal="false" :inline="true">
            <el-form ref="authorizeForm"  >
                <el-select v-model="roleId">
                    <el-option v-for="role in totalRoles"
                    :key="role.id"
                    :value="role.id"
                    :label="role.name" />
                </el-select>
            </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button  el-button type="primary"  @click="authorize(user,roleId);visible=false">确定</el-button>
                </span>

        </el-dialog>
    </div>
</template>

<script>

export default {
  props: [
    'totalRoles',
    'authorize'
  ],
  data () {
    return {
      visible: false,
      roleId: null,
      user: null
    }
  },
  methods: {
    show (user) {
      this.user = user
      this.visible = true
    }
  }
}

</script>
