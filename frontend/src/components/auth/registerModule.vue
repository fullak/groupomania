<template>
  <div class="register box register-block">
    <Modal />
    <h2 class="title">Inscription</h2>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="e.g john@doe.com" v-model="email"/>
      </div>
    </div>

    <div class="field">
      <label class="label">Mot de passe</label>
      <div class="control">
        <input class="input" type="password" placeholder="e.g. P@sSw0rd8" v-model="password"/>
      </div>
    </div>

    <div class="field">
      <label class="label">Nom</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g Doe" v-model="name"/>
      </div>
    </div>

    <div class="field">
      <label class="label">Prénom</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g John" v-model="firstname"/>
      </div>
    </div>

    <div class="control">
      <button class="button is-primary" @click.prevent="signUpUser" @click="showModal">S'inscrire</button>
      <button class="button is-secondary back-home" @click="$router.push('/') ">Revenir à l'accueil</button>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/signUpValidate.vue'
import axios from 'axios'

export default {
  name: 'registerModule',
  components: {
    Modal
  },
  data() {
    return {
      email: '',
      name: '',
      firstname:'',
      password: '',
    }
  },
  methods: {
    signUpUser() {
        let user = {
        name: this.name,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
      }
      axios.post('http://localhost:3000/user/signup', user)
        .then((response) => {
          this.errorMessage = response.data.message;
          this.isAlert = false;
          setTimeout(() => {
            this.$router.push({ path: '/' })  
          }, 2500)
        })
        .catch(error => { 
          this.errorMessage = error.response.data.message;
          this.isAlert = true;  
          });
    },
    showModal() {
      document.querySelector('#modalTest').classList.add('is-active');
    }
  },
  mounted() {
    console.log(this.user);
  }
};
</script>

<style lang="scss">
.register-block {
  margin: 4rem auto;
  width: 500px;
}

.title {
  font-size: 30px;
}

.back-home {
  margin-top: 0.5rem;
}
</style>