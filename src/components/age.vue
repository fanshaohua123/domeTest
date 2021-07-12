<template>
  <div>
    <div>{{ $store.state.count }}</div>
    <div>getters.count{{ $store.getters.countChange }}</div>
    <button @click="add">+1</button>
    <button @click="dispatchAdd">+1</button>
  </div>
</template>
<script>
export default {
  name: "age",
  data() {
    return {};
  },
  methods: {
    add() {
      this.$store.commit("addCount");
    },
    dispatchAdd() {
      this.$store.dispatch("asyncAddCount");
    },
  },
  mounted() {},
};
</script>