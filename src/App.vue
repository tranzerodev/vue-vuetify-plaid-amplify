<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',
  }
</script>
<style lang="scss">
  .v-tab{
    background-color: #666;
    color: #ccc!important;
    border-top-right-radius: 5%;
    border-top-left-radius: 5%;
    &.v-tab--active{
      color: #fff!important;
    }
  }
  .v-chip{
    border-radius: 7px!important;
  }
</style>