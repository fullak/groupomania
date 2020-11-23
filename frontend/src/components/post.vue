<template>
  <div class="container" :class="displayAllComments(id)">
    <div class="content">

      <div class="user-information">
        <img :src="profilePicture" alt="user profil picture" class="user-profile-picture"/>
        <span class="user-firstname"> {{ firstname }}</span>
      </div>

      <div class="user-message">
        <div class="message-content box">
          <a href="#" class="flag-a-post" @click="flagAPost(id)">Signaler</a>
          <p class="message is-primary">{{ message }}</p>
          <img :src="image" alt="" class="post-image"/>
          <div class="icons-container">
            <a href="#" @click="likeAPost(id)"><span>{{ this.likes }} </span><i class="fas fa-heart heart-icon"></i></a>
            <a @click="seen = !seen"><i class="fas fa-comment-dots comment-icon"></i><span> {{ this.comments.length }} comments</span></a>
            <a href="#" class="trash-icon" v-if="(this.$store.state.userId == authorId)" @click="deleteAPost(id)"><i class="fas fa-trash-alt"></i></a>
          </div>
        </div>

        <div class="post-a-comment" v-if="seen">
          <textarea v-if="seen" class="input-comment textarea is-primary" v-model="commentToPost"/>
          <button class="button is-primary send-comment" @click="postAComment()">send</button>
        </div>

        <div class="comment">
          <ul class="comment-container" v-if="seen">
            <template v-for="(comment, commentIndex) in comments" :index="commentIndex">
              <li class="comment-liste" :key="commentIndex">
                <Comment :firstname="comment.firstname" :message="comment.message" :date="comment.date" :profilePicture="comment.profile_picture" />
                <div class="comments-separation"></div>
              </li>
            </template>
          </ul>
        </div>

        <div class="informations">
          <span class="date-of-post"> {{ date }}
            <span v-if="this.$store.state.userRole == 'admin'">postId: {{ id }}</span>
          </span>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Comment from "../components/comment";

export default {
  name: "post",
  components: {
    Comment,
  },
  data() {
    return {
      seen: false,
      comments: [],
      likes: '',
      commentToPost: "",
      feedbackMessage: '',
    };
  },
  computed: {
    userFirstname() {
      return this.$store.getters.userFirstname;
    },
    userToken() {
      return this.$store.state.userToken;
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
    displayAllComments(id) {
      axios
          .get("http://localhost:3000/posts/comments/" + id, {
            headers: {
              Authorization: `token ${this.$store.state.userToken}`,
            },
          })
          .then((response) => {
            if (this.comments.length != response.data.length) {
              this.comments = response.data;
            } else {
              return;
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    postAComment() {
      let comment = {
        message: this.commentToPost,
        postId: this.id,
        authorId: this.$store.state.userId,
      };
      console.log(comment);
      axios
          .post("http://localhost:3000/posts/comments/", comment, {
            headers: {
              Authorization: `token ${this.$store.state.userToken}`,
            },
          })
          .then((response) => {
            console.log(response);
            location.reload();
          })
          .catch((error) => {
            console.log(this.commentToPost);
            console.log(error);
          });
    },
    likeAPost(id) {
      let data = {
        userId: this.$store.state.userId,
        like: this.likes +1,
      }
      axios
          .put("http://localhost:3000/posts/" + id + "/isLiked/", data, {
            headers: {
              Authorization: `token ${this.$store.state.userToken}`,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
    },
    deleteAPost(id) {
      console.log(id);
      axios
          .delete("http://localhost:3000/posts/" + id, {
            headers: {
              Authorization: `token ${this.$store.state.userToken}`,
            },
          })
          .then((response) => {
            console.log(response);
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          })
    },
    flagAPost(id) {
      console.log(id);
      axios
          .put('http://localhost:3000/posts/' + id + '/isFlagged/', {
            headers: {
              Authorization: `token ${this.$store.state.userToken}`,
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
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
  width: 100%;
  border-bottom: 1px solid rgba(168, 168, 168, 0.623);
}

.user-information {
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 20%;
}

.user-profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto;
}

.user-firstname {
  font-weight: bold;
}

.user-message {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
}

.message-content {
  margin-left: 25px;
  width: auto;
}

.post-image {
  width: 350px;
  padding-bottom: 1rem;
  display: block;
  margin: auto;
}

.message {
  text-align: center;
  width: 80%;
  margin: auto;
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

.heart-icon {
  margin-right: 10px;

  :hover {
    color: red;
  }
}

.comment-icon {
  :hover {
    color: royalblue;
  }
}

.trash-icon {
  float: right;
}

.comments-separation {
  border-bottom: gray 1px solid;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.comment-liste {
  list-style: none;
}

.post-a-comment {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-comment {
  height: 80px;
  margin: auto;
}

.send-comment {
  width: 25%;
  margin: auto;
  margin-top: 0.5rem;
}

.flag-a-post {
  color: lightcoral;
  float: right;
  font-size: 12px;
}
</style>
