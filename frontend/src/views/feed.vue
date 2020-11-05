<template>
  <div class="container">
    <h2 class="container-title">Poster un message :</h2>
    <div class="message-container">
      <textarea
        type="text"
        class="textarea message-input is-primary"
        placeholder="e.g. Hello world"
        v-model="message"
      ></textarea>
      <input
                type="file"
                id="image"
                ref="file"
                accept="image/*"
                class="form-input"
              />
      <div class="action-button">
        <button
          class="button is-info upload-image"
          @click.prevent="uploadImage"
        >
          Upload image
        </button>
        <button class="button send-message is-primary" @click="postAMessage">
          Send
        </button>
      </div>
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
      // image: "",
      message: "",
      feedbackMessagePicture: "",
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
        image: this.$refs.file.files[0],
        message: this.message,
      };

      axios
        .post("http://localhost:3000/user/posts/", post)
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

.action-button {
  display: flex;
  flex-direction: row;
}

.upload-image {
  width: 150px;
  margin: 1rem auto 0;
}

.send-message {
  width: 150px;
  margin: 1rem auto;
}
</style>
