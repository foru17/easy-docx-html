<template>
  <div class="hello">
    <el-row>
      <el-container>
        <el-col :span="8">
          <el-col :span="24">
                  <el-col :span="20">
            <div class="demo-input-suffix">
              自定义标题:<el-switch v-model="isCustomTitle" active-text="开启" inactive-text="">
              </el-switch>
            </div>
            <el-input width:="200px" v-model="customTitle" placeholder="请输入内容" :disabled="!isCustomTitle"></el-input>
          </el-col>    
            <el-col :span="24">
              <el-upload class="upload-demo" drag action="/api/upload" :data="uploadData" :before-upload="beforeUpload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" multiple :on-success="uploadSuccess">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">拖动docx文件到这里上传 </div>
                <div class="el-upload__tip" slot="tip">文件大小限制 2048kb</div>
              </el-upload>
            </el-col>
          </el-col>

          <el-col :span="20">
            <div class="demo-input-suffix">
              文件重命名:<el-switch v-model="isCustomFileName" active-text="开启" inactive-text="">
              </el-switch>
            </div>
            <el-input width:="200px" v-model="customFileName" placeholder="请输入内容" :disabled="!isCustomFileName"></el-input>
          </el-col>
        </el-col>
        <el-col :span="10" :offset="1">
          <el-container>
            <el-main>
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content">
                    <el-button type="primary" @click="downloadHTML" :disabled="!isHTMLReady">{{isHTMLReady ? '下载HTML' : '请先上传文件'}}</el-button>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <el-button type="success" @click="previewHTML" :disabled="!isHTMLReady">窗口预览 </el-button>
                  </div>
                </el-col>
              </el-row>
              <div v-html="htmlSourceCode"></div>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-container>
            <el-main>
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content">
                  </div>
                </el-col>
                <el-col :span="6">

                </el-col>
              </el-row>
                 <iframe id="frame-preview"  :src="previewHTMLUrl"></iframe>
            </el-main>
          </el-container>
        </el-col>
      </el-container>
    </el-row>
    <!--     <button type="button" name="button" v-on:click="getmsg">get</button>
    <button type="button" name="button" v-on:click="postmsg">post</button> -->
  </div>
</template>
<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
export default {
  name: 'Home',
  components: {  },
  data() {
    return {
      msg: 'easy docx html',
      fileList: [],
      htmlSourceCode: '<pre class="language-html"><code ><html></html></code></pre>',
      htmlTemplateStart: '<pre class="language-html"><code >',
      htmlTemplateEnd: '</code></pre>',
      downloadUrl: '',
      previewHTMLUrl:'',
      isCustomTitle: false,
      isHTMLReady: false,
      customTitle: '自定义网页标题',
      isCustomFileName: false,
      customFileName: 'easy.html',
      uploadData:{},
    }
  },
  mounted() {
    window.vueHello = this;
  },
  methods: {
    beforeUpload(file){
      let uploadData = {
        options:{
           customTitle: this.isCustomTitle ? encodeURIComponent(this.customTitle) : ''
        }
      }
    },
    uploadSuccess(data) {
      console.log('[uploadSuccess]')
      const { fileName, html } = data
      this.isHTMLReady = true
      this.downloadUrl = fileName
      this.htmlSourceCode = this.htmlTemplateStart + Prism.highlight(html, Prism.languages.html, 'html') + this.htmlTemplateEnd;
      this.previewHTMLUrl = location.protocol + '//' + location.host + '/api/preview/' + this.downloadUrl + '.html'
      console.log('[previewHTMLUrl]',this.previewHTMLUrl)
    },
    downloadHTML() {

      let options = {
        customTitle: this.isCustomTitle ? encodeURIComponent(this.customTitle) : '',
        customFileName: this.isCustomFileName ? encodeURIComponent(this.customFileName) : '',
      }
      let filterOptions = Object.entries(options).reduce((acc, [k, v]) => v ? { ...acc, [k]: v } : acc, {})
      let urlParams = Object.keys(filterOptions)
        .map(key => `${key}=${filterOptions[key]}`)
        .join('&');

      window.open('/api/download/' + this.downloadUrl + '.html' + '?' + urlParams)
    },
    previewHTML() {
      window.open('/api/preview/' + this.downloadUrl + '.html')
    },
    handlePreview() {

    },
    handleRemove() {

    },
    getmsg() {
      this.$axios.get('/api/personal?name=MUKI').then(function(res) {
        console.log('res=', res)
      })
    },
    postmsg() {
      this.$axios.post('/api/favorite', { name: 'money' }).then(res => {
        console.log('post res = ', res)
      })
    }
  }
}

</script>
<style scoped>
@import url("//unpkg.com/element-ui@2.15.8/lib/theme-chalk/index.css");

#frame-preview{
  display: block;
  border:1px solid #333;
  width: 360px;
  height: 720px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

</style>
