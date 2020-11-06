<template>
  <div class="post-container">
    <template >
      <li class="box posts-liste">
        <div class="user-information">
          <img
            :src="post.image"
            alt="user profil picture"
            class="user-profil-picture"
          />
        </div>
        <div class="user-message">
          <span class="user-firstname">{{ post.firstname }}</span>
          <p>{{ post.message }}</p>
          <span class="date-of-post">{{ post.date }}</span>
        </div>
      </li>
    </template>
  </div>
</template>

<script>
export default {
  name: "post",
  computed: {
    userFirstname() {
      return this.$store.getters.userFirstname;
    },
  },
};
</script>

<style lang="scss"></style>
