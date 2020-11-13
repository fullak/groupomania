<template>
  <div class="navigation">
    <nav class="navbar" id="nav">
      <img alt="Groupomania logo" src="../assets/images/logo-nav.png" class="logo-nav"/>
      <div class="block-link">
        
        <router-link to="/" class="link" v-if="!this.$store.state.isLogged">Accueil</router-link>
        <router-link to="/signup" v-if="!this.$store.state.isLogged" class="link">Inscription</router-link>
        <router-link to="/feed" class="link" v-if="this.$store.state.isLogged">Fil d'actualité</router-link>
        <router-link to="/profile" v-if="this.$store.state.isLogged" class="link">Profile</router-link>
        <router-link to="/adminBoard" v-if="this.$store.state.isLogged && this.$store.state.userRole == 'admin'" class="link">Dashboard</router-link>

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
.navbar {
  padding: 15px;
  display: flex;
  flex-direction: row;
  border-bottom-right-radius: 80px;
  border-bottom-left-radius: 80px;
  background: #001B2B;
  background: -moz-linear-gradient(45deg, #001B2B 0%, #003A5C 76%, #005587 100%);
  background: -webkit-linear-gradient(45deg, #001B2B 0%, #003A5C 76%, #005587 100%);
  background: linear-gradient(45deg, #001B2B 0%, #003A5C 76%, #005587 100%);
  -webkit-box-shadow: 1px 5px 4px 0px rgba(0,0,0,0.35); 
  box-shadow: 1px 5px 4px 0px rgba(0,0,0,0.35);
  width: 1000px;
  margin: auto;

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #00A1FF;
    }
  }
}

.block-link {
  margin: 5px 25px 5px auto;
  display: flex;
  flex-direction: row;
  text-indent: 1rem;
  text-shadow: 0.5px 1px 0.5px #d4a9bb31;
}

.logo-nav {
  height: 35px;
  width: 35px;
  margin-left: 5rem;
}

.userPicture {
  border: #000000 solid 1px;
  border-radius: 30px;
  width: 40px;
  height: 40px;
}
</style>
