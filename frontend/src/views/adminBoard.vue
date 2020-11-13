<template>
  <div class="container">

    <div class="title box">
        <h2 class="board-title">Dashboard</h2>
    </div>

    <div class="btn-line">
      <button class="button is-primary moderate-users-btn" @click="showUsers = !showUsers">Moderate Users</button>
      <button class="button is-primary moderate-posts-btn" @click="showPostsBtn = !showPostsBtn">Moderate Posts</button>
      <button class="button is-primary moderate-comments-btn" @click="showComments = !showComments">Moderate Comments</button>
    </div>

    <div v-if="showPostsBtn">
      <button class="button is-danger sort-btn" @click="showFlaggedPosts = !showFlaggedPosts" v-if="!showByDatePosts">Flagged Posts</button>
      <button class="button is-danger sort-btn" @click="showByDatePosts = !showByDatePosts" v-if="!showFlaggedPosts">Sort By Date Posts</button>
    </div>

    <UsersArray v-if="showUsers" />

    <FlaggedPosts v-if="showFlaggedPosts"/>

    <ByDatePosts v-if="showByDatePosts" />

    <CommentsArray v-if="showComments" />
    
  </div>
</template>

<script>
import UsersArray from '../components/admin/usersArray';
import FlaggedPosts from '../components/admin/flaggedPostsArray';
import ByDatePosts from '../components/admin/byDatePostsArray';
import CommentsArray from '../components/admin/commentsArray';

export default {
  name: 'adminBoard',
  components: {
    UsersArray,
    FlaggedPosts,
    ByDatePosts,
    CommentsArray,
  },
  data() {
    return {
      showUsers: false,
      showFlaggedPosts: false,
      showByDatePosts: false,
      showComments: false,
      showPostsBtn: false,
    }
  },
};
</script>

<style>
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

.table {
  margin-top: 2rem;
  display: inline-block;
}

.line {
  border-bottom: 1px grey solid;
}


.btn-line {
  display: flex;
  flex-direction: row;
  margin: auto;
}

.moderate-users-btn,
.moderate-posts-btn,
.moderate-comments-btn {
  width: 50%;
  margin-left: 1rem;
}

.sort-btn {
  margin: 1rem 0 0 1rem;
}
</style>
