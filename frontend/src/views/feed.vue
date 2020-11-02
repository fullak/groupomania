<template>
  <div class="test">
    <div class="message-container">
      <input type="text" class="message-input" v-model="message" />
      <button class="send-message" @click="postAMessage">Send</button>
    </div>

    <AllPosts />
  </div>
</template>

<script>
import axios from "axios";
import AllPosts from "../components/feedPosts";

export default {
  name: "feed",
  components: {
    AllPosts,
  },
  data() {
    return {
      currentLogged: localStorage.getItem("userId"),
      authorId: "",
      image: "",
      message: "",
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
    postAMessage() {
      let post = {
        authorId: this.$store.state.userId,
        image: this.image,
        message: this.message,
      };
      console.log(post);
      axios
        .post("http://localhost:3000/user/posts", post)
        .then((response) => {
          localStorage.userId = response.data.userId;
          localStorage.token = response.data.token;
          this.$store.state.userToken = response.data.token;
          this.$store.state.userId = response.data.userId;
          this.$store.state.isLogged = true;
          setTimeout(() => {
            this.$router.push({ path: "/feed" });
          }, 3500);
          console.log(
            "Post ajouté à la base de donnée, status : ",
            response.status
          );
        })
        .catch((error) => {
          console.log("An error is appeared : ", error.response.data);
        });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

.message-container {
  display: flex;
  flex-direction: column;
}

.message-input {
  margin: 1rem;
  height: 200px;
  width: 450px;
}

.send-message {
  width: 50px;
  margin: auto;
}
</style>
