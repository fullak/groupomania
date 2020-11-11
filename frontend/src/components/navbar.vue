<template>
  <div class="navigation">
    <nav class="navbar is-primary" id="nav">
      <img alt="Groupomania logo" src="../assets/images/logo-nav.png" class="logo-nav"/>
      <div class="block-link">
        
        <router-link to="/" class="link" v-if="!this.$store.state.isLogged">Accueil</router-link>
        <router-link to="/signup" v-if="!this.$store.state.isLogged" class="link">Inscription</router-link>
        <router-link to="/feed" class="link" v-if="this.$store.state.isLogged">Fil d'actualité</router-link>
        <router-link to="/profile" v-if="this.$store.state.isLogged" class="link">Profile</router-link>
        <router-link to="/adminBoard" v-if="this.$store.state.isLogged && this.$store.state.userRole == 'admin'" class="link">adminBoard</router-link>

        <a href="#" class="disconnect-button" @click="logout" v-if="this.$store.state.isLogged"><i class="fas fa-sign-out-alt"></i>Deconnexion</a>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("LOGOUT");
      this.$store.commit("CLEAR_STATE");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.navigation {
  right: 0;
}

.navbar {
  padding: 7px;
  display: flex;
  flex-direction: row;

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #0d3b66;
    }
  }
}

.block-link {
  margin: 5px auto;
  display: flex;
  flex-direction: row;
  text-indent: 1rem;
}

.logo-nav {
  height: 35px;
  width: 35px;
  margin-left: 1rem;
}

.userPicture {
  border: #000000 solid 1px;
  border-radius: 30px;
  width: 40px;
  height: 40px;
}
</style>
