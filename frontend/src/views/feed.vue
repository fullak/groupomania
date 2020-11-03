<template>
  <div class="container">
    <h2 class="container-title">Poster un message :</h2>
    <div class="message-container">
      <textarea type="text" class="textarea message-input is-primary" placeholder="e.g. Hello world" v-model="message"></textarea>
      <button class="button send-message is-primary" @click="postAMessage">Send</button>
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
          location.reload();
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

.container {
  width: 100%;
}

.container-title {
  font-size: 25px;
  font-weight: bold;
  margin-top: 1rem;
}

.message-container {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  width: 50%;
}

.send-message {
  width: 150px;
  margin: 1rem auto;
}
</style>
