<template>
  <div class="webset-main">
    <div class="webset-title">关于我们版块(主页)</div>
    <div class="webset-form1">
      <el-form ref="form1" label-position="left" :model="form1" :rules="form1Rules" label-width="120px">
        <el-form-item label="关于我们描述" prop="desc">
          <el-input v-model="form1.desc" type="textarea" placeholder="请输入社联描述" :rows="8" />
        </el-form-item>
        <el-form-item label="关于我们照片">
          <img :src="form1src" class="webset-aboutus-img">
          <el-upload
            ref="upload1"
            class="upload-demo"
            action="123"
            accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG"
            list-type="picture-card"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
            :on-change="handleChange1"
            name="file"
            :auto-upload="false"
            :limit="1"
            :multiple="false"
            :http-request="updateForm1"
          >
            <el-button size="small" type="primary">点击上传新图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/gif文件，且不超过1MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-btn" :loading="loading1" :disabled="loading1" style="width: 100px;" type="primary" @click="submitSave1">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="webset-title">网站设置(页脚)</div>
    <div>
      <div class="webset-form2">
        <el-form ref="form2" label-position="left" :rules="form2Rules" :model="form2" label-width="120px">
          <el-form-item label="网站名称" prop="siteName">
            <el-input v-model="form2.siteName" placeholder="请输入网站名称" />
          </el-form-item>
          <el-form-item label="办公室地址" prop="address">
            <el-input v-model="form2.address" placeholder="请输入办公室地址" />
          </el-form-item>
          <el-form-item label="友情链接1名称" prop="link1Desc">
            <el-input v-model="form2.link1Desc" placeholder="请输入友情链接1名称" />
          </el-form-item>
          <el-form-item label="友情链接1地址" prop="link1">
            <el-input v-model="form2.link1" placeholder="请输入友情链接网址" />
          </el-form-item>
          <el-form-item label="友情链接2名称" prop="link2Desc">
            <el-input v-model="form2.link2Desc" placeholder="请输入友情链接2名称" />
          </el-form-item>
          <el-form-item label="友情链接2地址" prop="link2">
            <el-input v-model="form2.link2" placeholder="请输入友情链接网址" />
          </el-form-item>
          <el-form-item label="公众号二维码">
            <img :src="form2src" class="webset-wechat-code">
            <el-upload
              ref="upload2"
              class="upload-demo"
              action="123"
              accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG"
              list-type="picture-card"
              :on-exceed="handleExceed"
              :before-upload="beforeUpload"
              :on-change="handleChange2"
              name="file"
              :auto-upload="false"
              :limit="1"
              :multiple="false"
              :http-request="updateForm2"
            >
              <el-button size="small" type="primary">点击上传新图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/gif文件，且不超过1MB</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading2" :disabled="loading2" class="submit-btn" type="primary" @click="submitSave2">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style>
.submit-btn{
  width: 100px;
}
.webset-main{
  padding: 20px;
}
.webset-title{
    font-size: 24px;
    margin: 20px 0;
    color: #909399;
}
.webset-form2,
.webset-form1{
  margin: 60px auto;
  width: 800px;
}
.webset-aboutus-img{
  width: 300px;
  height: 169px;
}
.webset-wechat-code{
  width: 130px;
  height: 130px;
}
</style>
<script>
import { getWebsetInfo, updateAboutusInfo, updateFooterInfo } from '@/api/websetinfo'
import { getBaseUrl } from '@/api/baseUrl'
import store from '@/store'
export default {
  data() {
    return {
      loading1: false,
      loading2: false,
      form1: {
        desc: '',
        src: ''
      },
      form1Rules: {
        desc: [{ required: true, trigger: 'blur', message: '此项不能为空' }]
      },
      form1src: '',
      form2src: '',
      form2: {
        siteName: '',
        address: '',
        link1: '',
        link1Desc: '',
        link2: '',
        link2Desc: '',
        wechatCodeSrc: ''
      },
      form2Rules: {
        siteName: [{ required: true, trigger: 'blur', message: '网站名称不能为空' }],
        address: [{ required: true, trigger: 'blur', message: '办公室地址不能为空' }],
        link1Desc: [{ required: true, trigger: 'blur', message: '友情链接1描述不能为空' }],
        link1: [{ required: true, trigger: 'blur', message: '友情链接1不能为空' }],
        link2Desc: [{ required: true, trigger: 'blur', message: '友情链接2描述不能为空' }],
        link2: [{ required: true, trigger: 'blur', message: '友情链接2不能为空' }]
      }
    }
  },
  computed: {
    headers: function() {
      return { Authorization: store.getters.token }
    }
  },
  mounted() {
    this.upload1Address = getBaseUrl() + 'admin/info'
    this.getWebsetAllInfo()
  },
  methods: {
    handleExceed() {
      this.$message.warning('只能上传一个文件')
    },
    getWebsetAllInfo() {
      getWebsetInfo().then(res => {
        this.form1.desc = res.data.desc
        this.form1.src = res.data.src
        this.form1src = res.data.src + '?' + Date.parse(new Date())
        this.form2.siteName = res.data.name
        this.form2.address = res.data.address
        this.form2.link1 = res.data.link1
        this.form2.link1Desc = res.data.link1_desc
        this.form2.link2 = res.data.link2
        this.form2.link2Desc = res.data.link2_desc
        this.form2.wechatCodeSrc = res.data.wechat_img
        this.form2src = res.data.wechat_img + '?' + Date.parse(new Date())
      })
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg / png / jpeg / gif 格式 !')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt2M
    },
    handleChange1(file) {
      if (!this.beforeUpload(file.raw)) {
        this.$refs.upload1.clearFiles()// 清除文件
      }
    },
    handleChange2(file) {
      if (!this.beforeUpload(file.raw)) {
        this.$refs.upload2.clearFiles()// 清除文件
      }
    },
    submitSave1() {
      if (this.$refs.upload1.uploadFiles.length === 0) {
        this.updateForm1()
      } else {
        this.$refs.upload1.submit()
      }
    },
    submitSave2() {
      if (this.$refs.upload2.uploadFiles.length === 0) {
        this.updateForm2()
      } else {
        this.$refs.upload2.submit()
      }
    },
    updateForm1(param = null) {
      this.$refs.form1.validate(valid => {
        if (valid) {
          this.loading1 = true
          // eslint-disable-next-line prefer-const
          let formData = new FormData()
          if (param != null) {
            const fileObj = param.file
            formData.append('file', fileObj)
          }
          // 如果没有文件则为普通修改，只需传输desc和src两个字段即可
          formData.append('desc', this.form1.desc)
          formData.append('src', this.form1.src)
          updateAboutusInfo(formData).then(res => {
            if (res.code === 200) {
              this.$message({ message: res.msg, type: 'success' })
              this.getWebsetAllInfo()
              this.loading1 = false
              this.$refs.upload1.clearFiles()// 清除文件
            } else {
              this.$message({ message: res.msg, type: 'error' })
              this.loading1 = false
            }
          }).catch(() => {
            this.loading1 = false
          })
        }
      })
    },
    updateForm2(param = null) {
      this.$refs.form2.validate(valid => {
        if (valid) {
          this.loading2 = true
          // eslint-disable-next-line prefer-const
          let formData = new FormData()
          if (param != null) {
            const fileObj = param.file
            formData.append('file', fileObj)
          }
          // 如果没有文件则为普通修改，只需传输desc和src两个字段即可
          formData.append('siteName', this.form2.siteName)
          formData.append('address', this.form2.address)
          formData.append('link1', this.form2.link1)
          formData.append('link1Desc', this.form2.link1Desc)
          formData.append('link2', this.form2.link2)
          formData.append('link2Desc', this.form2.link2Desc)
          formData.append('wechatCodeSrc', this.form2.wechatCodeSrc)
          updateFooterInfo(formData).then(res => {
            if (res.code === 200) {
              this.$message({ message: res.msg, type: 'success' })
              this.getWebsetAllInfo()
              this.loading2 = false
              this.$refs.upload2.clearFiles()// 清除文件
            } else {
              this.$message({ message: res.msg, type: 'error' })
              this.loading2 = false
            }
          }).catch(() => {
            this.loading2 = false
          })
        }
      })
    }
  }
}
</script>
