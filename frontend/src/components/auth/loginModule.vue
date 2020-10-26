<template>
  <div class="Login box">
    <h2 class="title">Connexion</h2>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="ex: john@doe.com" v-model="email"/>
      </div>
    </div>

    <div class="field">
      <label class="label">Mot de passe</label>
      <div class="control">
        <input class="input" type="password" placeholder="ex: P@sSw0rd8" v-model="password"/>
      </div>
    </div>

    <div class="control">
      <button class="button is-primary connect-btn" @click="login">Se connecter</button>
      <button class="button is-secondary" @click="$router.push('signup') ">S'inscrire</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'loginModule',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {

  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password
      }
      console.log(user);
      axios.post('http://localhost:3000/user/login', user)
        .then((response) => {
          console.log(response);
          this.errorMessage = response.data.message;
          this.$ls.set('token', response.data.token);
          this.$ls.set('userId', response.data.userId);
          this.$store.state.tokenToCheck = response.data.token;
          this.$store.state.userId = response.data.userId;
          this.isAlert = false;
          this.$store.dispatch('getInfos');
          this.$router.push('filactualite');
        })
        .catch(error => { 
          this.errorMessage = error.response.data.message;
          this.isAlert = true;  
          });
    },
  }
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