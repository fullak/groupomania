<template>
  <div class="Login box">

      
    <LoginModal />
    <h2 class="box-title">Connexion</h2>

    <!-- Email input -->
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email" v-model="email" />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right"> </span>
      </p>
    </div>

    <!-- Password input -->
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password" v-model="password" />
        <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
      </p>
    </div>

    <!-- Button Block -->
    <div class="control">
      <button class="button is-primary connect-btn" @click="login">
        Se connecter
      </button>
      <button class="button is-secondary" @click="$router.push('signup')">
        S'inscrire
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoginModal from "@/components/messages/loginValidate.vue";

export default {
  name: "loginModule",
  components: {
    LoginModal,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      token: "",
      isAlert: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLogged;
    },
    userToken() {
      return this.$store.state.userToken;
    },
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/user/login/", user)
        .then((response) => {
          this.errorMessage = response.data.message;
          localStorage.clear();
          localStorage.userId = response.data.userId;
          localStorage.token = response.data.token;
          this.$store.state.userToken = response.data.token;
          this.$store.state.userId = response.data.userId;
          this.isAlert = false;
          this.$store.state.isLogged = true;
          this.$store.dispatch("getOneUser");
          setTimeout(() => {
            this.$router.push({ path: "/feed" });
          }, 3500);
          document.querySelector("#loginModal").classList.add("is-active");
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.isAlert = true;
        });
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 350px;
}

.control {
  display: flex;
  flex-direction: column;
}

.connect-btn {
  margin-bottom: 0.5rem;
}
</style>
