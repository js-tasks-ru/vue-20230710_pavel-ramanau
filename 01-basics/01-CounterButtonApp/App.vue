<template>
  <button type="button" @click="count">{{ this.counter }}</button>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    count(){
      this.counter += 1;
    }
  },
};
</script>

<style lang="scss" scoped></style>

