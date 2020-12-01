<template>
  <div class="all-comments" :class="displayAllComments()">
    <table class="table">
      <tr>
        <th>&nbsp;</th>
        <th>id</th>
        <th>authorId</th>
        <th>message</th>
        <th>date</th>
        <th>postId</th>
        <th>Flagged</th>
      </tr>
      <tr v-for="(comment, commentIndex) in comments" :index="commentIndex" :key="comment.index" class="line">
        <td>&nbsp;</td>
        <td>{{ comment.id }}</td>
        <td>{{ comment.authorId }}</td>
        <td>{{ comment.message }}</td>
        <td>{{ comment.date }}</td>
        <td>{{ comment.postId }}</td>
        <td>{{ comment.isFlagged }}</td>
        <td><a href="#" @click="deleteAComment(comment.id)"><i class="fas fa-trash-alt"></i></a></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "commentsArray",
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    displayAllComments() {
      axios.get("http://localhost:3000/dashboard/allComments/", {
        headers: {
          Authorization: `token ${this.$store.state.userToken}`,
        },
      }).then((response) => {
        if (this.comments.length != response.data.length) {
          this.comments = response.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    deleteAComment(id) {
      axios.delete("http://localhost:3000/dashboard/comments/" + id, {
        headers: {
          Authorization: `token${this.$store.state.userToken}`,
        },
      }).then((response) => {
        this.comments = response.data;
        return this.comments;
      }).catch((error) => {
        console.log(error);
      })
    },
  },
};
</script>
