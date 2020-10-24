<template>
  <div class="Login box">
    <h2 class="title">Connexion</h2>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="ex: john@doe.com" v-model="user.email"/>
      </div>
    </div>

    <div class="field">
      <label class="label">Mot de passe</label>
      <div class="control">
        <input class="input" type="password" placeholder="ex: P@sSw0rd8" v-model="user.password"/>
      </div>
    </div>

    <div class="control">
      <button class="button is-primary connect-btn" @click="connectUser">Se connecter</button>
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