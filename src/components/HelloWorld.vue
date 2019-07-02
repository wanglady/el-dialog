<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1 @click="successChange">successChange wangyanlilng</h1>
    <h1 @click="errorChange">errorChange wangyanlilng</h1>
    <h1 @click="loadingChange">loadingChange wangyanlilng</h1>
    <Dia :showDialog='dialog.showDialog'
         :message='dialog.message'
         :success='dialog.success' />
  </div>
</template>

<script>
import Dia from './dia.vue'

export default {
  name: 'HelloWorld',
  components: {
    Dia
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dialog: {
        showDialog: false,
        message: '',
        success: ''
      }
    }
  },
  methods: {
    successChange () {
      let self = this
      self.dialog.showDialog = !self.dialog.showDialog
      self.dialog.message = '成功啦'
      self.dialog.success = true
    },
    errorChange () {
      let self = this
      self.dialog.showDialog = !self.dialog.showDialog
      self.dialog.message = '失败了啦'
      self.dialog.success = false
    },
    loadingChange () {
      let self = this
      self.dialog.showDialog = !self.dialog.showDialog
      self.dialog.message = '正在拼命加载中。。。'
      self.dialog.success = 'loading'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
