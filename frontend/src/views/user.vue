<template>
  <div class="profile">
    <div class="title box">
        <h2 class="lastPostsTitle">Profile</h2>
        </div>
    <div class="main-profile">

      <div class="information box">

        <form>
          <div class="form-group profile-picture-form">
            <img :src="this.$store.state.userPicture" alt="Preview profile picture" class="profilePicture" />
            <div class="update-profile-picture" v-if="seen">
              <input type="file" id="avatar" ref="file" accept="image/*" class="form-input" />
              <button class="button is-danger active" @click.prevent="uploadProfilPicture()" > Mettre à jour la photo de profil</button>
            </div>

            <button class="button is-primary change-button" v-if="!seen" @click="seen = true" > Changer de photo de profil
            </button>
          </div>
        </form>

        <div class="userInformation">
          <span>Nom : {{ this.$store.state.userName }}</span>
          <span>Prénom : {{ this.$store.state.userFirstname }}</span>
          <span>Age: {{ getAge(birthday) }} ans</span>
          <span>Rang : {{ this.$store.state.userRole }}</span>
        </div>

        <button class="button disconnect-btn is-danger" v-if="loggedIn" @click="logout">Déconnexion </button>
      </div>

      <div class="userPost-container">

        <ul :class="getUserPosts()" class="post-container">
          <template v-for="(post, postIndex) in posts" :index="postIndex">
            <li class="posts-liste" :key="postIndex">
              <Post class="post-content" :id="post.id" :authorId="post.authorId" :message="post.message" :image="post.image" :profilePicture="post.profile_picture" :date="post.date" :firstname="post.firstname" />
            </li>
          </template>
        </ul>

      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import Post from "../components/post";

export default {
  name: "userProfile",
  components: {
    Post,
  },
  data() {
    return {
      currentLogged: localStorage.getItem("userId"),
      birthday: this.$store.state.userBirthday,
      feedbackMessageAvatar: "",
      test: this.$store.state.userFirstname,
      seen: false,
      posts: [],
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
    uploadProfilPicture() {
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
          .get("http://localhost:3000/posts/" + this.$store.state.userId, {
            headers: {
              Authorization: `token ${this.$store.state.userToken}`,
            },
          })
          .then((response) => {
            if (this.posts.length != response.data.length) {
              this.posts = response.data;
              console.log(this.posts);
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
    deleteAPost(post) {
      axios
          .delete("http://localhost:3000/posts/", post, {
            headers: {
              Authorization: `token ${this.$store.state.userToken}`,
            },
          })
          .then((response) => {
            if (this.myPosts.length != response.data.length) {
              this.myPosts = response.data;
              console.log(response.data);
              console.log("AAAAA");
              console.log(this.myPosts);
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
.profile {
  display: flex;
  flex-direction: column;
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

.lastPostsTitle {
  font-size: 25px;
  font-weight: bold;
  color: aliceblue;
  margin: 0.25rem;
}

.main-profile {
  display: flex;
  flex-direction: row;
  width: 1200px;
  height: auto;
  margin: 2rem auto;
  justify-content: space-between;
}

.userPost-container {
  width: 750px;
}

.posts-liste {
  margin: 0 0 2rem;
}

.information {
  display: flex;
  flex-direction: column;
  height: 475px;
  border-top-left-radius: 25%;
  border-top-right-radius: 6%;
  border-bottom-right-radius: 25%;
  border-bottom-left-radius: 6%;
  -webkit-box-shadow: 1px 5px 4px 0px rgba(0,0,0,0.35); 
  box-shadow: 1px 5px 4px 0px rgba(0,0,0,0.35);
}

.profilePicture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 1rem 0;
}

.userInformation {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.disconnect-btn  {
  width: 50%;
  margin: 1rem auto 0; 
}
</style>
