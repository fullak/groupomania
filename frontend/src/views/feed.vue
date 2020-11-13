<template>
  <div class="container">

    <div class="title box">
        <h2 class="board-title">Fil d'actualité</h2>
    </div>

    <span class="container-title">Poster un message :</span>
    
    <section class="message-container">
      <textarea type="text" class="textarea message-input is-primary" placeholder="e.g. Hello world" v-model="message"></textarea>
      <input type="file" id="image" ref="fileInput" @input="pickFile" accept="image/*" class="form-input" v-if="seen"/>

      <div v-if="previewImage" class="image-to-display imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage"></div>
      <div class="action-button">
        <button v-if="!seen" @click="seen = true" class="button is-info upload-image">Add a GIF</button>
        <button class="button send-message is-primary" @click="postAMessage()">Send</button>
      </div>
    </section>

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
      previewImage: null,
      feedbackMessagePicture: "",
      seen: false,
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
      let file = this.$refs.fileInput.files[0];
      let formData = new FormData();

      formData.append("image", file);
      formData.append("authorId", this.$store.state.userId);
      formData.append("message", this.message);

      axios
        .post("http://localhost:3000/posts/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          this.feedbackMessagePicture = response.data.message;
          this.$store.dispatch("getOneUser");
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

.title {
  width: 250px;
  margin: -1rem auto;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
  background-color: #012A42;
  -webkit-box-shadow: 1px 5px 4px 0px rgba(0,0,0,0.35); 
  box-shadow: 1px 5px 4px 0px rgba(0,0,0,0.35);
}

.board-title {
  font-size: 25px;
  font-weight: bold;
  color: aliceblue;
  margin: 0.25rem;
}

.container {
  display: flex;
  flex-direction: columns;
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

.image-to-display {
  width: 200px;
  height: 180px;
}

.upload-image {
  width: 150px;
  margin: 1rem auto 0;
}

.send-message {
  width: 150px;
  margin: 1rem auto;
}

.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 1rem auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>
