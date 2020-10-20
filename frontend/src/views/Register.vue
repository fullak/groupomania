<template>
  <div class="Register box">

    <h2 class="title">Inscription</h2>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="e.g john@doe.com" />
      </div>
    </div>

    <div class="field">
      <label class="label">Mot de passe</label>
      <div class="control">
        <input class="input" type="password" placeholder="e.g. P@sSw0rd8" />
      </div>
    </div>

    <div class="field">
      <label class="label">Nom</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g Doe" />
      </div>
    </div>

    <div class="field">
      <label class="label">Prénom</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g John" />
      </div>
    </div>

    <div class="control">
      <button class="button is-primary">S'inscrire</button>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
.box {
  margin: 5% 30%;
}

.title {
  font-size: 30px;
}
</style>