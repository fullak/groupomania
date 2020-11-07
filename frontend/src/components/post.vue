<template>
  <div class="container">
    <div class="content">
      <div class="user-information">
        <img
          :src="profilePicture"
          alt="user profil picture"
          class="user-profile-picture"
        />
      </div>
      <div class="user-message">
        <span class="user-firstname"> {{ firstname }}</span>
        <p>{{ message }}</p>
        <img :src="image" alt="" class="post-image" />
        <div class="informations">
          <div class="icons-container">
            <a href="#" @click="likeAPost(id)"
              ><i class="fas fa-heart heart-icon"></i
            ></a>
            <a href="#"><i class="fas fa-comment-dots comment-icon"></i></a>
          </div>
          <span class="date-of-post"> {{ date }} | postId: {{ id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "post",
  computed: {
    userFirstname() {
      return this.$store.getters.userFirstname;
    },
  },
  props: [
    "authorId",
    "message",
    "index",
    "id",
    "date",
    "firstname",
    "image",
    "profilePicture",
  ],
  methods: {
    likeAPost(id) {
      console.log(id);
      axios
        .post("http://localhost:3000/posts/", id, {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("#####");
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content {
  display: flex;
  flex-direction: row;
}

.user-information {
  display: flex;
  flex-direction: row;
  width: 100px;
}

.user-profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.user-message {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}

.user-firstname {
  font-weight: bold;
}

.post-image {
  width: 300px;
  margin: auto;
  padding-bottom: 1rem;
}

.informations {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.date-of-post {
  width: 100%;
  font-size: 10px;
  text-align: right;
}

.icons-container {
  width: auto;
  width: 100px;
}

.heart-icon {
  margin-right: 10px;
  font-size: 20px;
  :hover {
    color: red;
  }
}

.comment-icon {
  font-size: 20px;
  :hover {
    color: royalblue;
  }
}
</style>
