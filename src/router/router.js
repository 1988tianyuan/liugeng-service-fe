import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import HelloWorld from '../components/HelloWorld'
import User from '../components/userInfo'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
