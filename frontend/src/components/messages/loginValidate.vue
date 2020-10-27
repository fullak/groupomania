<template>
  <div class="modal" id="loginModal">
    <div class="modal-background"></div>
    <div class="modal-content box">
      <h2 class="signupValidate">
        Connecté en tant que 
        <div>
            {{ currentLogged }}
        </div>
        <i class="fas fa-user-check green-check"></i>
      </h2>
      <span class="signupRedirection">Vous allez être redirigé</span>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="hideModal"
    ></button>
  </div>
</template>

<script>
export default {
  name: "loginModal",
  data() {
    return {
        currentLogged: sessionStorage.getItem("currentUser"),
    };
  },
  methods: {
    hideModal() {
      document.querySelector("#loginModal").classList.remove("is-active");
    },
  },
};
</script>

<style lang="scss">
.modal {
  background-color: rgb(255, 255, 255);
}

.modal-content {
  background-color: rgba(255, 255, 255, 0.817);
}

.signupValidate {
  font-size: 25px;
  font-weight: bolder;
}

.signupRedirection {
  font-size: 20px;
}

.green-check {
  color: #40b982f7;
}
</style>
