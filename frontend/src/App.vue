<template>
  <div id="app">
    <Navbar />
  </div>
</template>

<script>
import Navbar from './components/navbar'
export default {
  components: {
    Navbar
  }
  
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
