<template>
  <div class="admin-manage-main">
    <div class="admin-manage-title">用户管理</div>
    <div class="admin-manage-btn">
      <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">添加用户</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="deleteMoreUser">批量删除</el-button>
    </div>
    <el-table
      :data="userData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        prop="id"
        width="50"
        align="center"
        label="id"
      />
      <el-table-column
        prop="username"
        label="用户名"
        width="150"
        align="center"
      />
      <el-table-column
        prop="nickname"
        label="昵称"
        width="180"
        align="center"
      />
      <el-table-column
        label="角色"
        align="center"
        prop="role"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.role == 'admin'" type="primary" disable-transitions>超级管理员</el-tag>
          <el-tag v-else-if="scope.row.role == 'minister'" type="success" disable-transitions>部长</el-tag>
          <el-tag v-else-if="scope.row.role == 'secretary'" type="info" disable-transitions>干事</el-tag>
          <el-tag v-else type="warning" disable-transitions>未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="last_time_login"
        label="上一次登录时间"
        align="center"
      />
      <el-table-column
        prop="last_ip_login"
        label="上一次登录ip"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="禁用/启用"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch v-model="scope.row.is_use" active-value="1" inactive-value="0" @change="setUserIsUse($event, scope.row.id)" />
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="重置密码"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="openRepwdDialog(scope.row.id)">重置</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" @click="openEditDialog(scope.row)" />
          <el-popconfirm
            title="是否删除改用户"
            @onConfirm="deleteUser(scope.row.id)"
          >
            <el-button slot="reference" size="small" type="danger" icon="el-icon-delete" />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="admin-manage-page">
      <el-pagination
        background
        :page-size="8"
        :hide-on-single-page="true"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="refreshData"
      />
    </div>
    <el-dialog
      title="重置密码"
      :visible.sync="repwdDialogVisible"
      width="30%"
      :before-close="closeRepwdDialog"
    >
      <el-form ref="repwdForm" label-position="left" :model="repwdForm" status-icon :rules="repwdFormRules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="repwdForm.newPassword" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="rPassword">
          <el-input v-model="repwdForm.rPassword" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeRepwdDialog">取 消</el-button>
        <el-button type="primary" @click="repwd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="closeAddDialog"
    >
      <el-form ref="addForm" :model="addForm" status-icon :rules="addFormRules" label-position="left" label-width="100px" class="demo-ruleForm">
        <el-form-item label="帐号" prop="username">
          <el-input v-model="addForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="addForm.nickname" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="身份" prop="role">
          <el-select v-model="addForm.role" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="30%"
    >
      <el-form ref="editForm" :model="editForm" status-icon :rules="editFormRules" label-position="left" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="editForm.nickname" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="身份" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
.admin-manage-main {
  padding: 20px;
}
.admin-manage-title{
    font-size: 24px;
    margin: 20px 0;
    color: #909399;
}
.admin-manage-btn{
  margin-bottom: 20px;
  float: right;
}
.admin-manage-page{
  margin-top: 40px;
  text-align: center;
}
</style>
<script>
import { getUserList, setIsUse,
  delUser, updateUser, insertUser,
  resetUserPwd, delMoreUser } from '@/api/user'
import md5 from 'md5'
export default {
  data() {
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.repwdForm.rPassword !== '') {
          this.$refs.repwdForm.validateField('rPassword')
        }
        callback()
      }
    }
    var validateCheckPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.repwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      total: 0,
      userData: [],
      currPage: 1,
      editDialogVisible: false,
      addDialogVisible: false,
      repwdDialogVisible: false,
      editForm: {
        id: 0,
        nickname: '',
        role: ''
      },
      addForm: {
        username: '',
        nickname: '',
        password: '',
        role: 'secretary'
      },
      repwdForm: {
        id: 0,
        newPassword: '',
        rPassword: ''
      },
      editFormRules: {
        nickname: { required: true, message: '昵称不能为空', trigger: 'blur' },
        role: { required: true, message: '请选择身份', trigger: 'change' }
      },
      addFormRules: {
        username: { required: true, message: '帐号不能为空', trigger: 'blur' },
        nickname: { required: true, message: '昵称不能为空', trigger: 'blur' },
        password: { required: true, message: '密码不能为空', trigger: 'blur' },
        role: { required: true, message: '请选择身份', trigger: 'change' }
      },
      repwdFormRules: {
        newPassword: { required: true, validator: validatePwd, trigger: 'blur' },
        rPassword: { required: true, validator: validateCheckPwd, trigger: 'blur' }
      },
      options: [
        { value: 'admin', label: '超级管理员' },
        { value: 'minister', label: '部长' },
        { value: 'secretary', label: '干事' }
      ],
      multipleSelection: []
    }
  },
  mounted() {
    this.getUserListByPage(0)
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    openEditDialog(user) {
      this.editDialogVisible = true
      this.editForm.id = user.id
      this.editForm.nickname = user.nickname
      this.editForm.role = user.role
    },
    openRepwdDialog(id) {
      this.repwdDialogVisible = true
      this.repwdForm.id = id
    },
    closeEditDialog() {
      this.editDialogVisible = false
      this.editForm.nickname = ''
      this.editForm.role = ''
      this.editForm.id = 0
    },
    closeAddDialog() {
      this.addDialogVisible = false
      this.addForm = {
        username: '',
        nickname: '',
        password: '',
        role: 'secretary'
      }
    },
    closeRepwdDialog() {
      this.repwdDialogVisible = false
      this.repwdForm.newPassword = ''
      this.repwdForm.rPassword = ''
      this.repwdForm.id = 0
    },
    getUserListByPage(start) {
      getUserList(start).then(res => {
        this.total = res.data.total
        this.userData = res.data.data
      })
    },
    refreshData(index) {
      this.currPage = index
      this.getUserListByPage((index - 1) * 8)
    },
    setUserIsUse(isUse, id, index) {
      setIsUse({
        isUse: isUse, id: id
      }).then(res => {
        if (res.code === 200) {
          this.$message({ message: res.msg, type: 'success' })
        }
      })
    },
    deleteUser(id) {
      delUser(id).then(res => {
        this.$message({ message: res.msg, type: 'success' })
        this.getUserListByPage((this.currPage - 1) * 8)
      }).catch(() => {
        this.getUserListByPage((this.currPage - 1) * 8)
      })
    },
    deleteMoreUser() {
      if (this.multipleSelection.length === 0) {
        this.$message({ message: '请选择要删除的数据', type: 'warning' })
      } else {
        this.$confirm('此操作将批量删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // eslint-disable-next-line prefer-const
          let data = []
          this.multipleSelection.forEach(item => {
            data.push(item.id)
          })
          if (data) {
            delMoreUser({ ids: data }).then(res => {
              this.$message({ message: res.msg, type: 'success' })
              this.getUserListByPage((this.currPage - 1) * 8)
            })
          }
        })
      }
    },
    editUser() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          updateUser({
            nickname: this.editForm.nickname,
            role: this.editForm.role
          }, this.editForm.id).then(res => {
            this.$message({ message: res.msg, type: 'success' })
            this.closeEditDialog()
            this.getUserListByPage((this.currPage - 1) * 8)
          })
        }
      })
    },
    addUser() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          insertUser({
            username: this.addForm.username,
            nickname: this.addForm.nickname,
            role: this.addForm.role,
            password: md5(this.addForm.password)
          }).then(res => {
            this.$message({ message: res.msg, type: 'success' })
            this.closeAddDialog()
            this.getUserListByPage((this.currPage - 1) * 8)
          })
        }
      })
    },
    repwd() {
      this.$refs.repwdForm.validate((valid) => {
        if (valid) {
          resetUserPwd({ password: md5(this.repwdForm.newPassword) }, this.repwdForm.id).then(res => {
            this.$message({ message: res.msg, type: 'success' })
            this.closeRepwdDialog()
          })
        }
      })
    }
  }
}
</script>
