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

    </div>

    <span class="comment-date"> {{ date }}</span>
    
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "comment",
  data() {
    return {
      comments: [],
    };
  },
  methods: {},
  props: ["firstname", "message", "date", "profilePicture"],
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
</style>
