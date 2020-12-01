<template>
  <div class="register box register-block">
    <RegisterModal/>
    <h2 class="box-title">Inscription</h2>

    <div class="alert has-text-danger" v-if="errorMessage != ''">{{ errorMessage }}
    </div>

    <!-- Email Input -->
    <div class="field" :class="{ invalid: $v.email.$error }">
      <label class="label">Email</label>
      <div class="control">
        <label>
          <input class="input" type="email" placeholder="ex: john@doe.com" required v-model="email"/>
        </label>
        <small v-if="!$v.email.email" id="emailHelp" class="form-text has-text-danger">L'adresse email fournie est invalide.</small>
      </div>
    </div>

    <!-- Password Input -->
    <div class="field" :class="{ invalid: $v.password.$error }">
      <label class="label">Mot de passe</label>
      <div class="control">
        <label>
          <input class="input" type="password" placeholder="ex: P@sSw0rd8" required v-model="password"/>
        </label>
        <small v-if="!$v.password.minLength" id="passwordHelp" class="form-text has-text-danger">Le mot de passe doit contenir au moins 6 caractères</small>
        <small v-if="!$v.password.syntaxe && password != ''" id="secondPasswordHelp" class="form-text has-text-danger">Le mot de passe contient des caractères non autorisés</small>
      </div>
    </div>

    <!-- Confirmation Password input -->
    <div class="field" :class="{ invalid: $v.confirmationPassword.$error }">
      <label class="label">Confirmer votre mot de passe</label>
      <div class="control">
        <label>
          <input class="input" type="password" placeholder="ex: P@sSw0rd8" required v-model="confirmationPassword"/>
        </label>
        <small v-if="!$v.confirmationPassword.sameAsPassword && confirmationPassword != ''" id="verifyPasswordHelp" class="form-text has-text-danger">Ce mot de passe n'est pas identique au précédent {{ $v.confirmationPassword.syntaxe }}</small>
      </div>
    </div>

    <!-- Name input -->
    <div class="field" :class="{ invalid: $v.name.$error }">
      <label class="label">Nom</label>
      <div class="control">
        <label>
          <input class="input" type="text" placeholder="ex: Doe" required v-model="name"/>
        </label>
        <small v-if="!$v.name.minLength" id="namelHelp" class="form-text has-text-danger">Le nom doit contenir au moins 2 caractères</small>
        <small v-if="!$v.name.syntaxe && name != ''" id="verifyNameHelp" class="form-text has-text-danger">Le nom contient des caractères non autorisés</small>
      </div>
    </div>

    <!-- Firstname input -->
    <div class="field" :class="{ invalid: $v.firstname.$error }">
      <label class="label">Prénom</label>
      <div class="control">
        <label>
          <input class="input" type="text" placeholder="ex: John" required v-model="firstname" />
        </label>
        <small v-if="!$v.firstname.minLength" id="firstnameHelp" class="form-text has-text-danger">Le nom doit contenir au moins 2 caractères</small>
        <small v-if="!$v.firstname.syntaxe && firstname != ''" id="nomHelp" class="form-text has-text-danger">Le nom contient des caractères non autorisés</small>
      </div>

      <!-- Date of birth Input -->
      <div class="field">
        <label class="label birthday">Date de naissance</label>
        <div class="control">
          <label>
            <input class="input" type="date" v-model="birthday" required/>
          </label>
        </div>
      </div>

      <!-- Button Block -->
      <div class="control">
        <button class="button is-primary" @click.prevent="signUp">S'inscrire</button>
        <button class="button is-secondary back-home" @click="$router.push('/')">Revenir à l'accueil</button>
      </div>

    </div>
  </div>
</template>

<script>
import {required, email, minLength, sameAs} from "vuelidate/lib/validators";
import RegisterModal from "@/components/messages/signUpValidate.vue";
import axios from "axios";

export default {
  name: "register-modal",
  components: {
    RegisterModal,
  },
  data() {
    return {
      email: "",
      name: "",
      firstname: "",
      password: "",
      confirmationPassword: "",
      birthday: "",
      errorMessage: "",
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6),
      syntaxe: (value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
            value
        );
      }
    },
    confirmationPassword: {
      required,
      sameAsPassword: sameAs("password")
    },
    name: {
      required,
      minLength: minLength(2),
      syntaxe: (value) => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(
            value
        );
      },
    },
    firstname: {
      required,
      minLength: minLength(2),
      syntaxe: (value) => {
        return /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{1,}$/.test(
            value
        );
      },
    },
  },
  methods: {
    signUp() {
      if (this.password !== this.confirmationPassword || this.email === "" || this.password === "" || this.name === "" || this.confirmationPassword === "" || this.firstname === "") {
        console.log("Le formulaire n'est pas correctement remplis !");
        this.errorMessage = "Le formulaire n'est pas correctement remplis !";
        return;
      } else {
        let user = {
          name: this.name,
          firstname: this.firstname,
          email: this.email,
          password: this.password,
          birthday: this.birthday,
        };
        axios
            .post("http://localhost:3000/user/signup", user)
            .then((response) => {
              console.log('Utilisateur ajouté à la base de donnée, status : ', response.status);
              setTimeout(() => {
                this.$router.push({path: "/"});
              }, 3500);
              document.querySelector("#registerModal").classList.add("is-active");
            })
            .catch((error) => {
              console.log('An error is appeared : ', error.response.data);
            });
      }
    },
  },
};
</script>

<style lang="scss">
.register-block {
  margin: 1rem auto;
  width: 500px;
}

.box-title {
  font-size: 30px;
}

.birthday {
  margin-top: 0.5rem;
}

.back-home {
  margin-top: 0.5rem;
}

.alert {
  font-weight: 500;
  margin-bottom: 1rem;
}

.upload-container {
  margin: 0.5rem 0 0.5rem;
}

.upload-btn {
  margin: auto;
}
</style>
