<template>
   <div class="m-home">

      <router-link class="nav-box" to="/xbridge">xbridge</router-link>
      <router-link class="nav-box" to="/about">About</router-link>
      <router-link class="nav-box" to="/about">...</router-link>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
};
</script>
<style lang="scss" scoped>
.m-home {
  display: flex;
  flex-direction: column ;
  height: 100vh;
  background-color: #f5f5f5;
  .nav-box {
    @include center();
    flex: 1;
    font-weight: bold;
    font-size: 30px;
    color: #fff;
    &:first-child {
      background-color: #42b983;
    }
    &:nth-child(2) {
      background-color: salmon;
    }
    &:nth-child(3) {
      background-color: slategrey;
    }
    &.router-link-exact-active {

    }
  }
}
</style>
