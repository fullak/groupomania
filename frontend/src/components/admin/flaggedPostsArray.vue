<template>
  <div class="all-posts" :class="displayAllPostsByFlag()">
    <table class="table">
      <tr>
        <th>&nbsp;</th>
        <th>postId</th>
        <th>author</th>
        <th>message</th>
        <th>date</th>
        <th>Signalé</th>
        <th>Delete Post</th>
      </tr>
      <tr v-for="(post, postIndex) in posts" :index="postIndex" :key="post.index" class="line">
        <td>&nbsp;</td>
        <td>{{ post.id }}</td>
        <td>{{ post.name }} {{ post.firstname }}</td>
        <td>{{ post.message }}</td>
        <td>{{ post.date }}</td>
        <td>{{ post.isFlagged }}</td>
        <td><a href="#" @click="deleteAPost(post.id)"><i class="fas fa-trash-alt"></i></a></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FlaggedPosts',
    data() {
        return {
            posts: [],
        }
    },
    methods: {
        displayAllPostsByFlag() {
      axios
        .get("http://localhost:3000/posts/allPosts/byFlag", {
          headers: {
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          if (this.posts.length != response.data.length) {
            this.posts = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    }
};
</script>

<style lang="sass"></style>
