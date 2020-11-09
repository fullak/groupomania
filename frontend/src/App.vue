<template>
  <div id="app">
    <Navbar class="nav"/>
  </div>
</template>

<script>
import Navbar from "./components/navbar";

export default {
  components: {
    Navbar,
  },
  beforeUpdate() {
    //console.log('', this.$store.state.avatarUser);
    this.$store.state.userToken = localStorage.token;
    this.$store.state.userId = localStorage.userId;
    this.$store.commit("CHECK_TOKEN");
  },
  beforeCreate() {
    //console.log('', this.$store.state.avatarUser);
    this.$store.state.userToken = localStorage.token;
    this.$store.state.userId = localStorage.userId;
    this.$store.dispatch("getOneUser");
    this.$store.commit("CHECK_TOKEN");
  },
  beforeMount() {
    this.$store.dispatch("getOneUser");
  },
};
</script>

<style lang="scss">
html, body {
  height: 100%;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
