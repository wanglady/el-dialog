<template>
  <div class="dealer-setting">
    <div class="panel1 clear search">
      <el-row :gutter="5">
        <el-col :span="8">
          <div class="field">
            <span class="key">
              手机号
            </span>
            <span class="value">
              <el-input v-model="searchForm.userPhone"></el-input>
            </span>
          </div>
          <div class="field">
            <span class="key">
            </span>
            <span class="value">
              <el-button style="width:240px;"
                         type="info"
                         class='searchBtn'
                         icon="el-icon-search"
                         size="mini"
                         plain
                         @click="handleSearch">搜索</el-button>
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="field">
            <span class="key">
              姓名
            </span>
            <span class="value">
              <el-input v-model="searchForm.name"></el-input>
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="field">
            <span class="key">
              状态
            </span>
            <span class="value">
              <el-select v-model="searchForm.status"
                         placeholder="全部">
                <el-option label="全部"
                           value="-1"></el-option>
                <el-option label="有效"
                           value="y"></el-option>
                <el-option label="关闭"
                           value="n"></el-option>
              </el-select>
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="panel1 clear">
      <div class="title clear">
        <div>操作员</div>
        <div class="btn-wrap">
          <el-button @click="newUser">
            <i class="icon iconfont icon-xinjian"></i>新建操作员</el-button>
        </div>
      </div>
      <div class="custom-table">
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column prop="userId"
                           label="账号ID">
          </el-table-column>
          <el-table-column label="姓名 | 手机号">
            <template slot-scope='scope'>
              <div>{{scope.row.name}}</div>
              <div>{{scope.row.userName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="角色">
            <template slot-scope='scope'>
              <div v-if="scope.row.roleName === 'admin'">管理员</div>
              <div v-if="scope.row.roleName === 'operator'">操作员</div>
            </template>

          </el-table-column>
          <el-table-column prop=""
                           label="是否设置权限">
            <template slot-scope='scope'>
              <div v-if="scope.row.isSetPerm === 'y'">是</div>
              <div v-if="scope.row.isSetPerm === 'n'">否</div>
            </template>
          </el-table-column>
          <el-table-column label="账号状态">
            <template slot-scope='scope'>
              <div v-if="scope.row.status ==='n'">关闭</div>
              <div v-if="scope.row.status ==='y'">启用</div>
              <div v-if="scope.row.status ==='s'">锁定</div>
            </template>
          </el-table-column>
          <el-table-column label="创建人|创建时间"
                           width="150">
            <template slot-scope='scope'>
              <div>{{scope.row.creater}}</div>
              <div>{{scope.row.createTime}}</div>
            </template>
          </el-table-column>
          <el-table-column label="最近修改人|修改时间 "
                           width="150">
            <template slot-scope='scope'>
              <div>{{scope.row.modifier}}</div>
              <div>{{scope.row.modifyTime}}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           label="操作"
                           width="80">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)"
                         type="text"
                         size="small"
                         style="margin-left:10px;">编辑</el-button>
              <el-button @click="handleJurisdic(scope.row)"
                         type="text"
                         size="small">权限</el-button>
              <el-button v-if="scope.row.roleName === 'operator'"
                         @click="handleDel(scope.row)"
                         type="text"
                         size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 40px;text-align: center;">
          <el-pagination background
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[5,10,20]"
                         :current-page="num"
                         :page-size="size"
                         layout="prev, pager, next, total, sizes"
                         :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="新建操作员"
               :visible.sync="dialogFormVisible"
               :modal="false"
               width='28%'>
      <el-form ref="numberValidateForm"
               :rules="rules"
               :model="form"
               :label-position="'left'">
        <el-form-item label="姓名"
                      :label-width="formLabelWidth"
                      prop="name">
          <el-input v-model="form.name"
                    autocomplete="off"
                    style="width:95%;"></el-input>
        </el-form-item>
        <el-form-item label="手机号码"
                      :label-width="formLabelWidth"
                      prop="phone">
          <el-input v-model="form.phone"
                    autocomplete="off"
                    style="width:95%;"></el-input>
        </el-form-item>
        <el-form-item label="设置状态"
                      :label-width="formLabelWidth"
                      prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="y">有效</el-radio>
            <el-radio label="n">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer"
           style=" text-align:left;">
        <el-button type="primary"
                   @click="confirmUser()"
                   class="userConfirm"> 确 定 </el-button>
      </div>
    </el-dialog>
    <el-dialog :show-close="diaClose"
               :visible.sync="centerRegale"
               width="20%"
               center>
      <i class="icon iconfont iconDiaRed icon-warning-circle1"></i>
      <br>
      <div style="color:#4a4a4a;padding: 3px;">确定删除联系人？</div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="confirmRegale"
                   style="width:120px"> 确 定 </el-button>
      </span>
    </el-dialog>
    <Dia :showDialog='dialog.showDialog'
         :message='dialog.message'
         :success='dialog.success' />
  </div>
</template>
<script>
import Dia from '../../components/dialog/dia.vue'
import store from '../../store/store.js'
export default {
  components: {
    Dia
  },
  data() {
    var validateTel = (rule, value, callback) => {
      // 验证电话号码正则表达式
      var regExp = /^1[0-9]{10}$/
      if (regExp.test(value) === false) {
        callback(new Error('请输入正确手机号码'))
      } else {
        callback()
      }
    }
    return {
      dialog: {
        showDialog: false,
        message: '',
        success: ''
      },
      diaClose: false,
      centerRegale: false,
      isEdit: '', // 0是编辑  1 是新增
      dealerId: store.state.dealerId,
      username: store.state.username,
      password: store.state.password,
      total: 0, // 默认数据总数
      num: 1, // 默认开始页面
      size: 10, // 每页的数据条数
      tableData: [],
      searchForm: {
        userPhone: '',
        name: '',
        status: '',
        timeStart: '',
        timeEnd: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '100px',
      form: {
        userId: '',
        name: '',
        phone: '',
        status: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择设置状态', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    handleEdit(row) {
      this.$refs.numberValidateForm.clearValidate() // 移除校验结果
      this.isEdit = 0
      this.dialogFormVisible = true
      this.form = {
        name: row.name,
        phone: row.userName,
        status: row.status,
        userId: row.userId
      }
    },
    handleJurisdic(row) {
      window.open(
        `${window.location.origin}/permission?userId=${row.userId}&name=${row.name}&userName=${row.userName}`,
        '_blank'
      )
    },
    handleDel(row) {
      this.userNameRow = row.userName
      this.userIdRow = row.userId
      this.centerRegale = true
    },
    confirmRegale() {
      let self = this
      self.ajax.post(
        '/api/user/del',
        {
          userName: self.userNameRow,
          userId: self.userIdRow
        },
        res => {
          if (res.success) {
            self.centerRegale = false
            self.getUserInfo()
          } else {
            self.dialog.showDialog = true
            self.dialog.message = res.message
            self.dialog.success = res.success
            setTimeout(function() {
              self.dialog.showDialog = false
            }, 3000)
          }
        }
      )
    },

    confirmUser() {
      let self = this
      self.$refs.numberValidateForm.validate(valid => {
        if (valid) {
          let url = ''
          let params = {
            userName: self.form.phone,
            name: self.form.name,
            status: self.form.status
          }
          if (self.isEdit) {
            url = '/api/user/add'
          } else {
            params.userId = self.form.userId
            url = '/api/user/edit'
          }
          self.ajax.post(url, params, res => {
            if (res.success) {
              self.dialogFormVisible = false
              self.getUserInfo()
              self.form = {}
            } else {
              self.dialog.showDialog = true
              self.dialog.message = res.message
              self.dialog.success = res.success
              setTimeout(function() {
                self.dialog.showDialog = false
              }, 3000)
            }
          })
        } else {
          return false
        }
      })
    },
    newUser() {
      this.dialogFormVisible = true
      this.isEdit = 1
      this.form = {}
      this.$refs.numberValidateForm.clearValidate() // 移除校验结果
    },
    getUserInfo() {
      let self = this
      let params = {
        userName: self.searchForm.userPhone,
        name: self.searchForm.name,
        status: self.searchForm.status === '-1' ? '' : self.searchForm.status,
        page: self.num,
        size: self.size
      }
      self.ajax.post('/api/user/list', params, res => {
        if (res.success) {
          self.tableData = res.result.list
          self.total = res.result.total
        } else {
          self.dialog.showDialog = true
          self.dialog.message = res.message
          self.dialog.success = res.success
          setTimeout(function() {
            self.dialog.showDialog = false
          }, 3000)
        }
      })
    },
    handleSearch() {
      this.getUserInfo()
    },
    handleSizeChange(val) {
      // 每页 ${val} 条
      this.size = val
      this.getUserInfo()
    },
    handleCurrentChange(val) {
      // 当前页: ${val}
      this.num = val
      this.getUserInfo()
    }
  }
}
</script>

<style scope>
.dealer-setting .panel1 {
  margin-top: 22px;
  padding: 25px;
  background: #fff;
  border: 1px solid #e7e7e7;
}

.dealer-setting .field {
  line-height: 100%;
  margin-bottom: 20px;
}

.dealer-setting .key,
.value {
  display: inline-block;
}
.dealer-setting .key {
  width: 60px;
  font-size: 14px;
  color: #4a4a4a;
}

.dealer-setting .value {
  width: 240px;
}
.dealer-setting .value .searchBtn {
  margin-left: 0px;
}
.dealer-setting .value .el-input {
  width: 100%;
}
.dealer-setting .value .el-date-editor {
  width: 110px !important;
}
.dealer-setting .title {
  line-height: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #e7e7e7;
}
.dealer-setting .title > div {
  float: left;
  line-height: 36px;
  font-size: 16px;
  color: #000000;
}
.dealer-setting .title .btn-wrap {
  float: right;
}
.yd-container .el-dialog__wrapper .el-dialog__header .el-dialog__title {
  margin: 20px 20px;
  display: block;
  font-size: 16px;
  color: #000000;
  border-bottom: 1px solid #e7e7e7;
  line-height: 36px;
}
.el-dialog__body {
  padding: 30px 40px;
}
.el-form-item--small .el-form-item__content,
.el-form-item--small .el-form-item__label {
  text-align: left;
}
.userConfirm {
  color: #4a4a4a;
  background: #f3f3f3;
  border: 1px solid #e7e7e7;
  width: 110px;
  margin-left: 25px;
}
</style>
