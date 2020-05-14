<template>
  <div class="hello">
    <h1 @click="successChange">successChange wangyanlilng</h1>
    <h1 @click="errorChange">errorChange wangyanlilng</h1>
    <h1 @click="loadingChange">loadingChange wangyanlilng</h1>
    <div>
      <Dia :showDialog='dialog.showDialog'
           :message='dialog.message'
           :success='dialog.success' />

    </div>
  </div>

</template>

<script>
import Dia from '../components/dialog/dia'
export default {
  name: 'HelloWorld',
  components: {
    Dia
  },
  data() {
    return {
      dialog: {
        showDialog: false,
        message: '',
        success: ''
      }
    }
  },
  methods: {
    successChange() {
      let self = this
      //   self.dialog.showDialog = true
      //   self.dialog.message = res.message
      //   self.dialog.success = res.success
      self.dialog.showDialog = !self.dialog.showDialog
      self.dialog.message = '成功啦'
      self.dialog.success = true
      setTimeout(function() {
        self.dialog.showDialog = false
      }, 3000)
    },
    errorChange() {
      let self = this
      self.dialog.showDialog = !self.dialog.showDialog
      self.dialog.message = '失败了啦'
      self.dialog.success = false
      setTimeout(function() {
        self.dialog.showDialog = false
      }, 3000)
    },
    loadingChange() {
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-dialog__wrapper {
  /* top: 50%;
  transform: translateY(-50%); */
}
</style>
