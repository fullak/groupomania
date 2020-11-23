<template>
  <div class="all-posts" >
    <div class="sendId">
      <input type="text" v-model="id" class="idInput" placeholder="Enter an user Id">
      <button class="button is-primary" @click="displayAllPostsByAuthor(id)">Send</button>
    </div>
    <table class="table">
      <tr>
        <th>&nbsp;</th>
        <th>postId</th>
        <th>author</th>
        <th>message</th>
        <th>date</th>
        <th>Signalé</th>
        <th>Delete post</th>
      </tr>
      <tr v-for="(post, postIndex) in posts" :index="postIndex" :key="post.index" class="line">
        <td>&nbsp;</td>
        <td>{{ post.id }}</td>
        <td>{{ post.name }} {{ post.firstname }}</td>
        <td>{{ post.message }}</td>
        <td>{{ post.date }}</td>
        <td>{{ post.isFlagged }}</td>
        <td><a href="#" @click="deleteAPost(post.id, post.image)"><i class="fas fa-trash-alt"></i></a></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'byAuthorArray',
    data() {
        return {
            posts: [],
            id: '',
        }
    },
    methods: {
        displayAllPostsByAuthor(id) {
          console.log(id);
      axios
        .get("http://localhost:3000/dashboard/allPosts/byAuthor/" + id, {
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
    deleteAPost(id, image) {

        axios
        .delete('http://localhost:3000/dashboard/posts/' + id + "/" + image.split('/posts/')[1], {
          headers: {
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          this.posts = response.data;
          return this.posts;
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