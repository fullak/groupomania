<template>
  <div class="comment-container">
    <div class="comment-content">

      <div class="userInfo">
        <img :src="profilePicture" alt="user profile picture" class="userPP" />
        <span class="user-name">{{ firstname }}</span>
      </div>

      <div class="message-content message is-info">
        <span>{{ message }}</span>
      </div>

        <a href="#" class="flag-a-comment" @click="flagAComment(commentId)">Signaler</a>

    </div>

    <span class="comment-date"> {{ date }} commentId: {{ commentId }}</span>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "comment",
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    flagAComment(id) {
      console.log(id);
      axios
          .put('http://localhost:3000/posts/comments/' + id + '/isFlagged/', {
            headers: {
              Authorization: `token ${this.$store.state.userToken}`,
            },
          })
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          })
    },
  },
  props: ["firstname", "message", "date", "profilePicture", "commentId"],
};
</script>

<style lang="scss">
.userInfo {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.comment-container {
  display: flex;
  flex-direction: column;
}

.comment-content {
  display: flex;
  flex-direction: row;
}

.userPP {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-name {
  font-weight: bold;
}

.comment-date {
    font-size: 10px;
    text-align: right;
}

.flag-a-comment {
  color: lightcoral;
  float: right;
  font-size: 12px;
}
</style>
