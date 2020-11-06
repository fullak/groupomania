<template>
  <div>
    <h2 class="feed-title">Fil d'actualités : </h2>
    <ul :class="displayAllPosts()">
      
      <template v-for="post in posts">
        <li class="box posts-liste" :key="post.message">
          <div class="user-information">
            <img :src="post.image" alt="user profil picture" class="user-profil-picture">
          </div>
          <div class="user-message">
            <span class="user-firstname">{{ post.firstname }}</span> 
            <p>{{ post.message }}</p>
            <div class="icons-container">
              <span class="date-of-post">{{ post.date }}</span>
              <a href="#"><i class="fas fa-comment-dots comment-icon"></i></a>
              <a href="#" @click="LikedAPost(92)"><i class="fas fa-heart heart-icon"></i></a>
            </div>
          </div>
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
    LikedAPost(id) {
      console.log(this.posts[0].message);
      axios
        .put("http://localhost:3000/posts/", id, {
          headers: {
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          this.posts.isLiked ++;
          console.log(this.posts.isLiked);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
};
</script>

<style lang="scss">
.feed-title{
  font-size: 25px;
  font-weight: bold;
  text-align: left;
}

.posts-liste {
  margin: 3rem auto;
  display: flex;
  flex-direction: row;
  width: 75%;
}

.user-information {
  width: 10%;
}

.user-profil-picture {
  width: 50px;
  height: 50px;
  border-radius: 25px;
}

.user-message {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 25px;
  text-align: left;
}

.user-firstname {
  font-weight: bold;
  text-align: left;
}

.date-of-post {
  font-size: 12px;
  padding-top: 15px;
}

.heart-icon {
  float: right;
  :hover {
    color: red;
  }
}

.comment-icon {
  float: right;
  margin-left: 10px;
  :hover {
    color: rgb(115, 164, 255);
  }
}
</style>
