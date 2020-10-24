<template>
  <div class="register box register-block">
    <RegisterModal />
    <h2 class="title">Inscription</h2>

    <div class="field" :class="{ invalid: $v.email.$error }">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          type="email"
          placeholder="ex: john@doe.com"
          v-model="email"
        />
        <small
          v-if="!$v.email.email"
          id="emailHelp"
          class="form-text has-text-danger"
          >L'adresse email fournie est invalide.</small
        >
      </div>
    </div>

    <div class="field" :class="{ invalid: $v.password.$error }">
      <label class="label">Mot de passe</label>
      <div class="control">
        <input
          class="input"
          type="password"
          placeholder="ex: P@sSw0rd8"
          v-model="password"
        />
        <small
          v-if="!$v.password.minLength"
          id="emailHelp"
          class="form-text has-text-danger"
          >Le mot de passe doit contenir au moins 6 caractères</small
        >
        <small
          v-if="!$v.password.syntaxe && password != ''"
          id="nomHelp"
          class="form-text has-text-danger"
          >Le mot de passe contient des caractères non autorisés</small
        >
      </div>
    </div>

    <div class="field" :class="{ invalid: $v.confirmationPassword.$error }">
      <label class="label">Confirmer votre mot de passe</label>
      <div class="control">
        <input
          class="input"
          type="password"
          placeholder="ex: P@sSw0rd8"
          v-model="confirmationPassword"
        />
        <small
          v-if="
            !$v.confirmationPassword.sameAsPassword &&
              confirmationPassword != ''
          "
          id="nomHelp"
          class="form-text has-text-danger"
          >Ce mot de passe n'est pas identique au précédent
          {{ $v.confirmationPassword.syntaxe }}</small
        >
      </div>
    </div>

    <div class="field" :class="{ invalid: $v.name.$error }">
      <label class="label">Nom</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="ex: Doe"
          v-model="name"
        />
        <small
          v-if="!$v.name.minLength"
          id="emailHelp"
          class="form-text has-text-danger"
          >Le nom doit contenir au moins 2 caractères</small
        >
        <small
          v-if="!$v.name.syntaxe && name != ''"
          id="nomHelp"
          class="form-text has-text-danger"
          >Le nom contient des caractères non autorisés</small
        >
      </div>
    </div>

    <div class="field" :class="{ invalid: $v.firstname.$error }">
      <label class="label">Prénom</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="ex: John"
          v-model="firstname"

        />
        <small
          v-if="!$v.firstname.minLength"
          id="emailHelp"
          class="form-text has-text-danger"
          >Le nom doit contenir au moins 2 caractères</small
        >
        <small
          v-if="!$v.firstname.syntaxe && firstname != ''"
          id="nomHelp"
          class="form-text has-text-danger"
          >Le nom contient des caractères non autorisés</small
        >
      </div>
    </div>

    <div class="control">
      <button class="button is-primary" @click.prevent="signUp">
        S'inscrire
      </button>
      <button class="button is-secondary back-home" @click="$router.push('/')">
        Revenir à l'accueil
      </button>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
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
      if (this.password != this.confirmationPassword) {
        return;
      } else {
        let user = {
        name: this.name,
        firstname: this.firstname,
        email: this.email,
        password: this.password,
      };
      axios
        .post("http://localhost:3000/user/signup", user)
        .then((response) => {
          console.log(response.data.message);
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 3500);
          document.querySelector("#modalTest").classList.add("is-active");
        })
        .catch((error) => {
          console.log(error.response.data.error);
          this.errorMessage = error.response.data.error;
        });
      }
    },
  },
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

.alert {
  font-weight: 500;
  margin-bottom: 1rem;
}
</style>
