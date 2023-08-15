<template>
  <button @click="increment">{{ internalCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  data() {
    return {
      internalCount: this.count,
    };
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  watch: {
    count(newVal) {
      this.internalCount = newVal;
    },
  },

  methods: {
    increment() {
      this.internalCount++;
      if (this.count !== undefined) {
        this.$emit('update:count', this.internalCount);
      }
    },
  },

  emits: ['update:count'],
};
</script>
