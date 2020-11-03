<template>
  <div>
    <h2 class="feed-title">Fil d'actualités : </h2>
    <ul :class="displayAllPosts()">
      <template v-for="post in posts">
        <li class="box message-liste" :key="post.id">
          <span> authorId : {{ post.authorId }} </span>
          <span> Message : {{ post.message }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "allPosts",
  data() {
    return {
      currentLogged: localStorage.getItem("userId"),
      posts: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLogged;
    },
    userToken() {
      return this.$store.state.userToken;
    },
  },
  methods: {
    displayAllPosts() {
      axios
        .get("http://localhost:3000/user/posts", {
          headers: {
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          if (this.posts.length != response.data.length){
          this.posts = response.data;
          console.log(response);
          } else {
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
.feed-title{
  font-size: 25px;
  font-weight: bold;
  text-align: left;
}

.message-liste {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  width: 75%;
}
</style>
