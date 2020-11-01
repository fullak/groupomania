<template>
  <div class="navigation">
    <nav class="navbar is-primary" id="nav">
      <img
        alt="Groupomania logo"
        src="../assets/images/logo-nav.png"
        class="logo-nav"
      />
      <div class="block-link">
        <router-link to="/" class="link">Accueil</router-link>
        <router-link
          to="/signup"
          v-if="!this.$store.state.isLogged"
          class="link"
        >
          Inscription</router-link
        >
        <router-link
          to="/profile"
          v-if="this.$store.state.isLogged"
          class="link"
        >
          {{ this.$store.state.userFirstname }}</router-link
        >
        <div class="user" v-if="this.$store.state.isLogged">
          <img :src="this.$store.state.userPicture" class="userPicture" />
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
  flex-direction: column;
}

.navbar {
  padding: 7px;
  display: flex;

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #0D3B66;
    }
  }
}

.block-link {
  margin: 5px 0 0 2rem;
  display: flex;
  flex-direction: row;
}

.link,
.user {
  margin: 5px 0 0 5px;
}

.logo-nav {
  height: 35px;
  margin-top: 5px;
  margin-left: 10px;
}

.userPicture {
  border: #000000 solid 1px;
  margin-top: -7px;
  border-radius: 30px;
  width: 40px;
  height: 40px;
}
</style>
