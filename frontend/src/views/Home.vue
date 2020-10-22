<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" class="logo">
    <LoginModule />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginModule from '@/components/auth/loginModule.vue'

export default {
  name: 'Home',
  components: {
    LoginModule
  }
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 8rem;
}

.logo {
  height: 350px;
  margin-right: 150px;
}
</style>