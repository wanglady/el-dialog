<template>
  <el-dialog :visible.sync="dialogVisible"
             width="30%"
             :show-close='false'
             :modal='false'
             :close-on-press-escape='false'
             :close-on-click-modal='false'>
    <i v-if="success == true "
       class="icon iconfont  iconDia iconDiaGreen el-icon-success"></i>
    <i v-if="success == false"
       class="icon iconfont  iconDiaRed el-icon-error"></i>
    <img v-if="success === 'loading'"
         src="../../assets/loading.gif"
         style="width:40px;height:40px;vertical-align: middle;margin: 6px;">
    <span style="vertical-align: middle;">{{message}}</span>
  </el-dialog>
</template>

<script>
export default {
  name: 'dia',
  data() {
    return {
      dialogVisible: false
    }
  },
  props: {
    showDialog: {
      // 是否打开弹窗
      type: Boolean,
      default: false
    },
    message: {
      // 提示信息
      type: String,
      default: ''
    },
    success: {
      // 成功失败的图标显示
    }
  },
  created() {
    this.dialogVisible = this.showDialog
  },
  watch: {
    showDialog: {
      // 监控传过来的是否打开
      handler(val) {
        this.dialogVisible = val
      }
    },
    deep: true
  }
}
</script>

<style>
</style>
<style scope>
.iconDiaRed {
  color: #e93b39;
  font-size: 3rem;
  vertical-align: middle;
}
.iconDiaGreen {
  color: green;
  font-size: 3rem;
  vertical-align: middle;
}
.el-dialog__header {
  padding: 0;
}
.el-dialog--center {
  min-width: 390px;
  max-width: 700px;
}
</style>
