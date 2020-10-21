<template>
  <div class="Login box">
    <h2 class="title">Connexion</h2>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="e.g john@doe.com" v-model="user.email"/>
      </div>
    </div>

    <div class="field">
      <label class="label">Mot de passe</label>
      <div class="control">
        <input class="input" type="password" placeholder="e.g. P@sSw0rd8" v-model="user.password"/>
      </div>
    </div>

    <div class="control">
      <button class="button is-primary" @click="connectUser">Se connecter</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'connectUser',
  data() {
    return {
      user: {
        id: null,
        email: '',
        password: ''
      },
      submitted: false
    }
  },
  methods: {
    connectUser() {
      axios.get('http://localhost:3000/api/users', {
        email: this.user.email,
        password: this.user.password
      },
      {
        headers: {'Accept': 'application/json'}
      })
      .then(function (response){
        console.log(response);
      })
      .catch(function (error){
        console.log(error);
      })
  }
  }
};
</script>

<style lang="scss">

</style>