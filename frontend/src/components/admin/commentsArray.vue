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
      </tr>
      <tr v-for="(comment, commentIndex) in comments" :index="commentIndex" :key="comment.index" class="line">
        <td>&nbsp;</td>
        <td>{{ comment.id }}</td>
        <td>{{ comment.authorId }}</td>
        <td>{{ comment.message }}</td>
        <td>{{ comment.date }}</td>
        <td>{{ comment.postId }}</td>
        <td><a href="#"><i class="fas fa-trash-alt"></i></a></td>
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
      axios
        .get("http://localhost:3000/posts/comments/all/", {
          headers: {
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          if (this.comments.length != response.data.length) {
            this.comments = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
