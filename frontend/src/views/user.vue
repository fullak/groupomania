<template>

  <div class="profile">
    <div class="information box">
      <img src="../assets/images/defaultPP.jpeg" class="profilePicture" alt="user profile picture">
      <button class="updateBtn">Update PP</button>
      <div class="userInformation">
        <span>Email :userEmail@mail.com</span>
        <span>Birthday : Birth date</span>
        <span>Live in : Place</span>
        <span>Total posts : xx</span>
      </div>
    </div>

    <div class="userPost-container">
      <h2 class="lastPostsTitle">My last posts</h2>
      <div class="posts box">
        <p class="postContent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid consectetur
          culpa deleniti distinctio dolore ducimus, ea eligendi et ex facilis illum ipsa optio, placeat quos rem sequi
          sit veritatis.
        </p>
      </div>
      <div class="posts box">
        <p class="postContent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid consectetur
          culpa deleniti distinctio dolore ducimus, ea eligendi et ex facilis illum ipsa optio, placeat quos rem sequi
          sit veritatis.</p>
      </div>
      <div class="posts box">
        <p class="postContent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid consectetur
          culpa deleniti distinctio dolore ducimus, ea eligendi et ex facilis illum ipsa optio, placeat quos rem sequi
          sit veritatis.</p>
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
    };
  }
};
</script>

<style lang="scss">
.profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.information {
  width: 300px;
  height: auto;
  margin: 2rem 0 0 2rem;
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