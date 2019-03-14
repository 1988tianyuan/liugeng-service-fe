<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="router-links">
      <router-link to="/login">登陆</router-link>
      <router-link to="/user">查看用户</router-link>
      <router-link to="/hello">hello</router-link>
    </div>
    <router-view v-if="!needReload"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      needReload: false
    }
  },
  methods: {
    reload () {
      this.needReload = true
      this.$nextTick(function () {
        this.needReload = false
      })
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
  margin: 60px;
}

.router-links {
  text-align: center;
}
</style>
