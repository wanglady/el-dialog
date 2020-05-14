import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'

import First from '@/views/First'
import Second from '@/views/Second'
// import userList from '@/views/userList'



Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        }, {
            path: '/first',
            name: 'First',
            component: First
        }, {
            path: '/second',
            name: 'Second',
            component: Second
        // }, {
        //     path: '/userList',
        //     name: 'userList',
        //     component: userList
        }
    ]
})
