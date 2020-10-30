<template>

  <div class="profile">
    <div class="main-profile">
      <div class="information box">
        <img :src="this.$store.state.userPicture" class="profilePicture" alt="user profile picture">
        <button class="button is-primary updateBtn">Update PP</button>
        <div class="userInformation">
          <span>Name : {{ this.$store.state.userName }}</span>
          <span>Firstname : {{ this.$store.state.userFirstname }}</span>
          <span>Age: {{ getAge(birthday) }} ans</span>
          <span>Role : {{ this.$store.state.userRole }}</span>
        </div>
        <button class="button disconnect-btn is-danger" v-if="loggedIn" @click="logout">Déconnexion</button>
      </div>
      <div class="userPost-container">
        <h2 class="lastPostsTitle">My last posts</h2>
        <div class="posts box">
          <p class="postContent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid
            consectetur
            culpa deleniti distinctio dolore ducimus, ea eligendi et ex facilis illum ipsa optio, placeat quos rem sequi
            sit veritatis.
          </p>
        </div>
        <div class="posts box">
          <p class="postContent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid
            consectetur
            culpa deleniti distinctio dolore ducimus, ea eligendi et ex facilis illum ipsa optio, placeat quos rem sequi
            sit veritatis.</p>
        </div>
        <div class="posts box">
          <p class="postContent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid
            consectetur
            culpa deleniti distinctio dolore ducimus, ea eligendi et ex facilis illum ipsa optio, placeat quos rem sequi
            sit veritatis.</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'userProfile',
  data() {
    return {
      currentLogged: localStorage.getItem("userId"),
      birthday: this.$store.state.userBirthday,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLogged;
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit('LOGOUT');
      this.$store.commit('CLEAR_STATE');
      this.$router.push('/');
    },
    getAge(birthday) {
      let today = new Date();
      let birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }
};
</script>

<style lang="scss">
.profile {
  display: flex;
  flex-direction: column;
}

.main-profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.information {
  width: 300px;
  height: auto;
  margin: 6rem 0 0 2rem;
  display: flex;
  flex-direction: column;
}

.profilePicture {
  border: #757763 solid 1px;
  border-radius: 5rem;
  width: 150px;
  height: 150px;
  margin: 1rem auto;
}

.updateBtn {
  width: 50%;
  margin: 1rem auto;
}

.userInformation {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: auto;
}

.disconnect-btn {
  width: 100px;
  margin: 2rem auto;
  padding: 0 4rem;
}

.userPost-container {
  width: 700px;
  height: auto;
  margin: 2rem 0 0 2rem;
}

.lastPostsTitle {
  font-size: 25px;
  font-weight: bolder;
}

.posts {
  width: 80%;
  height: auto;
  margin: 2rem auto 0;
}

</style>