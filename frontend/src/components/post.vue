<template>
    <div class="post-container">
        <div class="user-post">
            <img class="profil-picture">
            <span class="user-firstname"> TestName </span>
        </div>

        <div class="post-content">
            <span class="post-img"></span>
            <span class="post-message"></span>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "post",
    computed: {
        userFirstname() {
            return this.$store.getters.userFirstname;
        },
    }
}
</script>

<style lang="scss">

</style>