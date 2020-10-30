<template>
  <div class="navigation">
    <nav class="navbar is-primary" id="nav">
      <img
        alt="Groupomania logo"
        src="../assets/images/logo-nav.png"
        class="logo-nav"
      />
      <div class="block-link">
        <router-link to="/">Accueil</router-link>
        <router-link to="/signup" v-if="!(this.$store.state.isLogged)"> | Inscription</router-link>
        <router-link to="/profile" v-if="this.$store.state.isLogged"> | Profile</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
    name: 'navbar'
}
</script>

<style lang="scss">
#nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #ED864A;
    }
  }
}

.block-link {
  margin: 1px 0 0 25px;
}

.logo-nav {
  height: 25px;
  margin-left: 10px;
}
</style>