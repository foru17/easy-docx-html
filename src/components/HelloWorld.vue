<template>
  <div class="hello">
    <el-container>
      <el-aside width="400px">
        <el-upload class="upload-demo" drag action="/api/upload" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" multiple :on-success="uploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">拖动docx文件到这里上传 </div>
          <div class="el-upload__tip" slot="tip">文件大小限制 2048kb</div>
        </el-upload>

      </el-aside>
      <el-container>
        <el-header>转换HTML</el-header>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="downloadHTML">下载HTML</el-button>
              </div>
            </el-col>
          </el-row>
          <div v-html="htmlSourceCode"></div>
        </el-main>
      </el-container>
    </el-container>
    <!--     <button type="button" name="button" v-on:click="getmsg">get</button>
    <button type="button" name="button" v-on:click="postmsg">post</button> -->
  </div>
</template>
<script>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'easy docx html',
      fileList: [],
      htmlSourceCode: '<pre class="language-html"><code ><html></html></code></pre>',
      htmlTemplateStart: '<pre class="language-html"><code >',
      htmlTemplateEnd: '</code></pre>',
      downloadUrl: '',
    }
  },
  mounted() {
    window.vueHello = this;
  },
  methods: {
    uploadSuccess(data) {
      console.log('[uploadSuccess]')
      const { fileName, html } = data
      this.downloadUrl = fileName
      this.htmlSourceCode = this.htmlTemplateStart + Prism.highlight(html, Prism.languages.html, 'html') + this.htmlTemplateEnd;
      console.log(this.htmlSourceCode)
      // console.log(data)
    },
    downloadHTML() {
      console.log('[downloadHTML]', this.downloadUrl)
      window.open('/api/download/' + this.downloadUrl + '.html')
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

</style>
