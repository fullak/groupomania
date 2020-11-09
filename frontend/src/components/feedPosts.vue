<template>
  <div class="posts">
    <h2 class="feed-title">Fil d'actualités :</h2>
    <ul :class="displayAllPosts()">
      <template v-for="(post, postIndex) in posts" :index="postIndex">
        <li class="posts-liste" :key="postIndex">
          <Post
            :firstname="post.firstname"
            :id="post.id"
            :authorId="post.authorId"
            :message="post.message"
            :image="post.image"
            :date="post.date"
            :profilePicture="post.profile_picture"
          />
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Post from "../components/post";

export default {
  name: "allPosts",
  components: {
    Post,
  },
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
    userFirstname() {
      return this.$store.getters.userFirstname;
    },
    userToken() {
      return this.$store.state.userToken;
    },
  },
  methods: {
    displayAllPosts() {
      axios
        .get("http://localhost:3000/posts/allPosts", {
          headers: {
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          if (this.posts.length != response.data.length) {
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
.feed-title {
  font-size: 25px;
  font-weight: bold;
  text-align: left;
}

.posts-liste {
  margin: 3rem auto;
  width: 75%;
}
</style>
