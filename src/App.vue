<template>
  <div id="app"
       class="textarealist">

    <router-view/>
  </div>
</template>

<script>
import md5 from './../config/md5.js'
export default {
  name: 'App',
  data () {
    return {
      a: { 'type': 'runoob', 'value': 10000, 'name': 'runoob', 'age': 'www.runoob.com', 'zhang': 'runoob', 'params': 'www.runoob.com' },
      c: { 'type': [{
        beta: 'aini',
        deactivated: 'wang',
        app: '2332',
        children: 'leng'
      }],
      'value': 10000,
      'name': 'runoob',
      'age': 'www.runoob.com',
      'zhang': 'runoob',
      'params': 'www.runoob.com' },

      d: { 'type': [{
        beta: 'aini',
        deactivated: 'wang',
        app: '2332',
        children: 'leng'
      }, {
        eta: 'aini',
        heactivated: 'wang',
        gpp: '2332',
        children: 'leng'
      }, {
        ieta: 'aini',
        deactivated: 'wang',
        gpp: '2332',
        zhildren: 'leng'
      }],
      'value': 10000,
      'name': 'runoob',
      'age': 'www.runoob.com',
      'zhang': 'runoob',
      'params': 'www.runoob.com' }
    }
  },
  mounted () {
    // this.ismd5encrypt(this.a)
    // this.ismd5encrypt(this.c)
    this.ismd5encrypt(this.d)
  },
  methods: {
    ismd5encrypt: function (params) {
      // console.time('loadImg') 开始时间
      console.log('params', params)
      let keys = []
      // 排序
      for (let k in params) {
        if (params.hasOwnProperty(k)) {
          keys.push(k)
        }
      }
      keys.sort()
      console.log('leys', keys)
      let newParams = {}
      for (let i = 0; i < keys.length; i++) {
        let k = keys[i]
        newParams[k] = params[k]

        if (typeof (params[k]) === 'object') {
          this.ismd5encrypt(params[k])
        }
      }
      console.log('排序后---', newParams)
      newParams = md5(newParams.toString())
      console.log('md5后', newParams)
      // console.timeEnd('loadImg') 结束时间
      return newParams
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
