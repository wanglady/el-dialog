<template>
  <el-dialog :visible.sync="dialogVisible"
             width="30%"
             :show-close='false'
             :modal='false'
             :close-on-press-escape='false'
             :close-on-click-modal='false'>
    <i v-if='iconType === "success"'
       class="icon iconfont  iconDia icon-chenggong"></i>
    <i v-if='iconType === "fail"'
       class="icon iconfont  iconDia icon-warning-circle1"></i>
    <img v-if='iconType === "loading"'
         src="../../assets/img/loading.gif"
         style="width:40px;height:40px">

    <span>{{message}}</span>
  </el-dialog>
</template>

<script>
export default {
  name: 'dia',
  data () {
    return {
      dialogVisible: false
    }
  },
  props: {
    showDialog: { // 是否打开弹窗
      type: Boolean,
      default: false
    },
    message: { // 提示信息
      type: String,
      default: ''
    },
    iconType: { // 成功失败的图标显示
      type: String,
      default: ''
    }
  },
  created () {
    this.dialogVisible = this.showDialog
  },
  watch: {
    showDialog: { // 监控传过来的是否打开
      handler (val) {
        this.dialogVisible = val
      }
    },
    deep: true
  }
}
</script>

<style>
</style>
