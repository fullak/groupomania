<template>
  <div class="profile">
    <div class="main-profile">
      <div class="userPost-container">
        <h2 class="lastPostsTitle">My last posts :</h2>

        <div class="posts box">
          <ul :class="getUserPosts()">
            <template v-for="post in myPosts">
              <li class="box message-liste" :key="post.id">
                <span> authorId : {{ post.authorId }} </span>
                <span> Message : {{ post.message }}</span>
              </li>
            </template>
          </ul>
        </div>
      </div>

      <div class="information box">
        <form>
          <div class="form-group profile-picture-form">
            <img
              :src="this.$store.state.userPicture"
              alt="Preview profile picture"
              class="profilePicture"
            />
            <div class="update-profile-picture" v-if="seen">
              <input
                type="file"
                id="avatar"
                ref="file"
                accept="image/*"
                class="form-input"
              />
              <button
                class="button is-primary active"
                @click.prevent="uploadImage"
              >
                Mettre à jour la photo de profil
              </button>
            </div>

            <button
              class="button is-primary testing"
              v-if="!seen"
              @click="seen = true"
            >
              Changer de photo de profil
            </button>
          </div>
        </form>

        <div class="userInformation">
          <span>Nom : {{ this.$store.state.userName }}</span>
          <span>Prénom : {{ this.$store.state.userFirstname }}</span>
          <span>Age: {{ getAge(birthday) }} ans</span>
          <span>Rang : {{ this.$store.state.userRole }}</span>
        </div>
        <button
          class="button disconnect-btn is-danger"
          v-if="loggedIn"
          @click="logout"
        >
          Déconnexion
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: changer les dimensions de l'image à l'upload

import axios from "axios";

export default {
  name: "userProfile",
  data() {
    return {
      currentLogged: localStorage.getItem("userId"),
      birthday: this.$store.state.userBirthday,
      feedbackMessageAvatar: "",
      seen: false,
      myPosts: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLogged;
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("LOGOUT");
      this.$store.commit("CLEAR_STATE");
      this.$router.push("/");
    },
    uploadImage() {
      let file = this.$refs.file.files[0];
      let formData = new FormData();

      formData.append("image", file);
      formData.append("userId", this.$store.state.userId);
      formData.append("currentImage", this.$store.state.userPicture);

      axios
        .put("http://localhost:3000/profile/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          this.feedbackMessageAvatar = response.data.message;
          this.$store.dispatch("getOneUser");
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAge(birthday) {
      let today = new Date();
      let birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    getUserPosts() {
      axios
        .get("http://localhost:3000/user/posts/" + this.$store.state.userId, {
          headers: {
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
         if (this.myPosts.length != response.data.length){
          this.myPosts = response.data;
          console.log(response.data);
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
html,
body {
  height: 100%;
}

.profile {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.main-profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.information {
  width: 300px;
  height: auto;
  margin: 1rem 0 0 2rem;
  display: flex;
  flex-direction: column;
}

.profile-picture-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.profilePicture {
  border: #757763 solid 1px;
  border-radius: 5rem;
  width: 150px;
  height: 150px;
  margin: 1rem auto;
}

.form-label,
.form-input {
  margin-bottom: 0.5rem;
}

.updateBtn {
  width: auto;
  margin: 1rem auto;
}

.userInformation {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: auto;
}

.disconnect-btn {
  width: 100px;
  margin: 2rem auto;
  padding: 0 4rem;
}

.userPost-container {
  width: 700px;
  height: auto;
  margin: 2rem 0 0 2rem;
}

.lastPostsTitle {
  font-size: 25px;
  font-weight: bolder;
}

.posts {
  width: 80%;
  height: auto;
  margin: 2rem auto 0;
}
</style>
