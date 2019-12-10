<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>

  * {
    box-sizing: border-box;
  }
  .container {
    max-width: 650px;
    margin: 0 auto;
  }

  .logo {
    display: block;
    margin: 20px auto;
    height: 75px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 24px;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
