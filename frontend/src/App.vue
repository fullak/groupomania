<template>
  <div id="app">
    <nav class="navbar is-primary" id="nav">
      <img
        alt="Groupomania logo"
        src="../src/assets/images/logo-nav.png"
        class="logo-nav"
      />
      <div class="block-link">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/signup">Inscription</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
