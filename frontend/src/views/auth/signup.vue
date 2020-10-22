<template>
  <div class="signup">
    <RegisterModule />

  </div>
</template>

<script>
// @ is an alias to /src
import RegisterModule from '@/components/auth/registerModule.vue'

export default {
  name: 'Register',
  components: {
    RegisterModule
  }
};
</script>

<style lang="scss">

</style>