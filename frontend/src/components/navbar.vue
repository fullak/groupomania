<template>
  <div class="navigation">
    <nav class="navbar is-primary" id="nav">
      <img
        alt="Groupomania logo"
        src="../assets/images/logo-nav.png"
        class="logo-nav"
      />
      <div class="block-link">
        <router-link to="/" class="link" v-if="!this.$store.state.isLogged"
          >Accueil</router-link
        >
        <router-link
          to="/signup"
          v-if="!this.$store.state.isLogged"
          class="link"
        >
          Inscription</router-link
        >
        <router-link to="/feed" class="link" v-if="this.$store.state.isLogged"
          >Fil d'actualité</router-link
        >
        <div class="container-profile">
          <router-link
            to="/profile"
            v-if="this.$store.state.isLogged"
            class="link"
          >
            Profile
            <img :src="this.$store.state.userPicture" class="userPicture" />
          </router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style lang="scss">
.navigation {
  display: flex;
  flex-direction: row;
}

.navbar {
  padding: 7px;
  display: flex;
  flex-direction: column;
  width: 200px;

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
  flex-direction: column;
}

.link,
.user {
  margin: 5px auto;
}

.container-profile {
  width: auto;
  display: flex;
  flex-direction: row;
}

.logo-nav {
  height: 35px;
  width: 35px;
  margin: 5px auto 10px;
}

.userPicture {
  border: #000000 solid 1px;
  border-radius: 30px;
  width: 40px;
  height: 40px;
}
</style>
