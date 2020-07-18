<template>
  <div class="update-pwd-main">
    <div class="update-pwd-div">
      <el-form ref="ruleForm" label-position="left" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="ruleForm.oldPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="ruleForm.newPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" :disabled="loading" type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style>
.update-pwd-div{
    width: 500px;
    height: 400px;
    margin: 0 auto;
    margin-top: 100px;
  }
</style>
<script>
import md5 from 'md5'
import { updatePwd } from '@/api/user'
export default {
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      rules: {
        newPass: [
          { validator: validateNewPass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        oldPass: [
          { validator: validateOldPass, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updatePwd({
            'oldPassword': md5(this.ruleForm.oldPass),
            'newPassword': md5(this.ruleForm.newPass)
          }).then(res => {
            if (res.code === 200) {
              this.$message({ showClose: true, message: res.msg, type: 'success' })
              this.resetForm(formName)
            } else {
              this.$message({ showClose: true, message: res.msg, type: 'error' })
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
