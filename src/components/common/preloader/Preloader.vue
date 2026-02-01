<template>
  <div class="preloader">
    <div class="preloaderCircle" />
  </div>
</template>

<style lang="scss" scoped>
.preloader {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-block-start: 50px;
  scroll-behavior: unset;
}

.preloaderCircle {
  position: relative;
  inset: 0;
  display: block;
  width: 74px;
  height: 74px;
  margin: auto;
  border: 1px solid;
  border-color:  rgb(22, 178, 64) rgb(36, 193, 78) rgb(195, 252, 210);
  border-radius: 50%;
  animation: spin 0.75s infinite linear;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
