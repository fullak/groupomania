<template>
    <div class="home-container">
      <img alt="Vue logo" src="../assets/images/logo.png" class="logo">
      <LoginModule class="login-module"/>
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

.home-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 8rem;
}

.logo {
  height: 350px;
  margin-right: 150px;
}

@media screen and (max-width: 768px)
{
  .home-container {
    display: flex;
    flex-direction: column;
    margin-top: -3rem;
  }

  .logo {
    width: 50%;
    height: 50%;
    margin: auto;
  }

  .login-module {
    margin: auto;
    margin-top: -2rem;
  }
}
</style>