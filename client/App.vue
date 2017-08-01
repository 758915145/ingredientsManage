<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
    export default {
        beforeCreate(){
            window.$vue = this;
            this.$store.dispatch('getData');
        }
    }
</script>
<style>
body {
  margin: 0;
  font-size: 2rem;
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
}
</style>
