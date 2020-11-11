<template>
  <div class="all-users" :class="displayAllUsers()">
    <table class="table">
      <tr>
        <th>&nbsp;</th>
        <th>userId</th>
        <th>Name</th>
        <th>FirstName</th>
        <th>Email</th>
        <th>Date of birth</th>
        <th>Role</th>
        <th>Change role</th>
        <th>Delete user</th>
      </tr>
      <tr v-for="(user, userIndex) in users" :index="userIndex" :key="user.index" class="line">
        <td>&nbsp;</td>
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.date_of_birth }}</td>
        <td>{{ user.role }}</td>
        <td>
          <a href="#" @click="changeRoleToAdmin(user.id) && Update()" v-if="user.role === 'user'"><i class="fas fa-user-cog"></i></a>
          <a href="#" @click="changeRoleToUser(user.id) && Update()" v-if="user.role === 'admin'"><i class="fas fa-user-cog"></i></a>
        </td>
        <td><a href="#"><i class="fas fa-trash-alt"></i></a></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "usersArray",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    displayAllUsers() {
      axios
        .get("http://localhost:3000/user/all", {
          headers: {
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          if (this.users.length != response.data.length) {
            this.users = response.data;
            return this.users;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeRoleToAdmin(id) {
      console.log(id);
      axios
        .put("http://localhost:3000/user/changeRoleToAdmin/" + id, {
          headers: {
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          this.users = response.data;
          return this.users;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    changeRoleToUser(id) {
      console.log(id);
      axios
        .put("http://localhost:3000/user/changeRoleToUser/" + id, {
          headers: {
            Authorization: `token ${this.$store.state.userToken}`,
          },
        })
        .then((response) => {
          this.users = response.data;
          return this.users;
        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
};
</script>

<style lang="sass"></style>
