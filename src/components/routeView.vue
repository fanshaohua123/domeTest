<template>
  <keep-alive :exclude="$store.state.delTabs">
    <router-view/>
  </keep-alive>
</template>
<script>
export default {
  name:'routeView',
}
</script>
