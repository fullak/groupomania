<template>
  <div class="all-posts" >
    <div class="sendId">
      <input type="text" v-model="id" class="idInput" placeholder="Enter an user Id">
      <button class="button is-primary" @click="displayAllCommentsByAuthor(id)">Send</button>
    </div>
    <table class="table">
      <tr>
        <th>&nbsp;</th>
        <th>commentId</th>
        <th>author</th>
        <th>message</th>
        <th>date</th>
        <th>postId</th>
        <th>Signalé</th>
        <th>Delete post</th>
      </tr>
      <tr v-for="(comment, commentIndex) in comments" :index="commentIndex" :key="comment.index" class="line">
        <td>&nbsp;</td>
        <td>{{ comment.id }}</td>
        <td>{{ comment.name }} {{ comment.firstname }}</td>
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
import axios from 'axios';

export default {
    name: 'commentsByAuthorArray',
    data() {
        return {
            comments: [],
            id: '',
        }
    },
    methods: {
        displayAllCommentsByAuthor(id) {
          console.log(id);
      axios
        .get("http://localhost:3000/dashboard/allComments/byAuthor/" + id, {
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
        })
    },
    deleteAComment(id) {
      axios
      .delete("http://localhost:3000/dashboard/comments/" + id, {
        headers: {
          Authorization: `token${this.$store.state.userToken}`,
        },
      })
      .then((response) => {
        this.comments = response.data;
        return this.comments;
      })
      .catch((error) => {
        console.log(error);
      })
    },
  }
}
</script>

<style lang="scss">
.sendId {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: auto;
}

.idInput {
  margin: 1rem auto 1rem;
}

</style>