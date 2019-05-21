<template>
  <div id="app">
    <div class="m-nav">
      <router-link class="nav-box" to="/">Home</router-link>
      <router-link class="nav-box" to="/about">About</router-link>
      <router-link class="nav-box" to="/about">About</router-link>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.m-nav {
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
