<template>
  <div class="modal" id="registerModal">
    <div class="modal-background"></div>

    <div class="modal-content box">
      <h2 class="signupValidate">Votre inscription est validée !</h2>

      <div align="center" class="cssload-fond">
        <div class="cssload-container-general">
          <div class="cssload-internal">
            <div class="cssload-ballcolor cssload-ball_1"></div>
          </div>
          <div class="cssload-internal">
            <div class="cssload-ballcolor cssload-ball_2"></div>
          </div>
          <div class="cssload-internal">
            <div class="cssload-ballcolor cssload-ball_3"></div>
          </div>
          <div class="cssload-internal">
            <div class="cssload-ballcolor cssload-ball_4"></div>
          </div>
        </div>
      </div>

      <span class="signupRedirection">Vous allez être redirigé</span>
      
    </div>

    <button class="modal-close is-large" aria-label="close" @click="hideModal"></button>
    
  </div>
</template>

<script>
export default {
  name: "modal",
  methods: {
    hideModal() {
      document.querySelector('#registerModal').classList.remove('is-active');
    }
  }
};
</script>

<style lang="scss">
.modal {
  background-color: rgb(255, 255, 255);
}

.modal-content {
  background-color: rgba(255, 255, 255, 0.817);
}

.signupValidate {
  font-size: 25px;
  font-weight: bolder;
}

.signupRedirection {
  font-size: 20px;
}

.cssload-fond {
  margin: 1rem auto;
  position: relative;
}

.cssload-container-general {
  animation: cssload-animball_two 1.75s infinite;
  -o-animation: cssload-animball_two 1.75s infinite;
  -ms-animation: cssload-animball_two 1.75s infinite;
  -webkit-animation: cssload-animball_two 1.75s infinite;
  -moz-animation: cssload-animball_two 1.75s infinite;
  width: 44px;
  height: 44px;
}
.cssload-internal {
  width: 44px;
  height: 44px;
  position: absolute;
}
.cssload-ballcolor {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.cssload-ball_1,
.cssload-ball_2,
.cssload-ball_3,
.cssload-ball_4 {
  position: absolute;
  animation: cssload-animball_one 1.75s infinite ease;
  -o-animation: cssload-animball_one 1.75s infinite ease;
  -ms-animation: cssload-animball_one 1.75s infinite ease;
  -webkit-animation: cssload-animball_one 1.75s infinite ease;
  -moz-animation: cssload-animball_one 1.75s infinite ease;
}
.cssload-ball_1 {
  background-color: rgb(0, 31, 48);
  top: 0;
  left: 0;
}
.cssload-ball_2 {
  background-color: rgb(0, 162, 255);
  top: 0;
  left: 24px;
}
.cssload-ball_3 {
  background-color: rgb(179, 179, 179);
  top: 24px;
  left: 0;
}
.cssload-ball_4 {
  background-color: rgb(1, 81, 130);
  top: 24px;
  left: 24px;
}

@keyframes cssload-animball_one {
  0% {
    position: absolute;
  }
  50% {
    top: 12px;
    left: 12px;
    position: absolute;
    opacity: 0.5;
  }
  100% {
    position: absolute;
  }
}

@-o-keyframes cssload-animball_one {
  0% {
    position: absolute;
  }
  50% {
    top: 12px;
    left: 12px;
    position: absolute;
    opacity: 0.5;
  }
  100% {
    position: absolute;
  }
}

@-ms-keyframes cssload-animball_one {
  0% {
    position: absolute;
  }
  50% {
    top: 12px;
    left: 12px;
    position: absolute;
    opacity: 0.5;
  }
  100% {
    position: absolute;
  }
}

@-webkit-keyframes cssload-animball_one {
  0% {
    position: absolute;
  }
  50% {
    top: 12px;
    left: 12px;
    position: absolute;
    opacity: 0.5;
  }
  100% {
    position: absolute;
  }
}

@-moz-keyframes cssload-animball_one {
  0% {
    position: absolute;
  }
  50% {
    top: 12px;
    left: 12px;
    position: absolute;
    opacity: 0.5;
  }
  100% {
    position: absolute;
  }
}

@keyframes cssload-animball_two {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(360deg) scale(1.3);
  }
  100% {
    transform: rotate(720deg) scale(1);
  }
}

@-o-keyframes cssload-animball_two {
  0% {
    -o-transform: rotate(0deg) scale(1);
  }
  50% {
    -o-transform: rotate(360deg) scale(1.3);
  }
  100% {
    -o-transform: rotate(720deg) scale(1);
  }
}

@-ms-keyframes cssload-animball_two {
  0% {
    -ms-transform: rotate(0deg) scale(1);
  }
  50% {
    -ms-transform: rotate(360deg) scale(1.3);
  }
  100% {
    -ms-transform: rotate(720deg) scale(1);
  }
}

@-webkit-keyframes cssload-animball_two {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
  }
  50% {
    -webkit-transform: rotate(360deg) scale(1.3);
  }
  100% {
    -webkit-transform: rotate(720deg) scale(1);
  }
}

@-moz-keyframes cssload-animball_two {
  0% {
    -moz-transform: rotate(0deg) scale(1);
  }
  50% {
    -moz-transform: rotate(360deg) scale(1.3);
  }
  100% {
    -moz-transform: rotate(720deg) scale(1);
  }
}
</style>
