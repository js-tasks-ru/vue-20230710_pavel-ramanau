<template>
  <button @click="increment">{{ count }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    increment() {
      this.$emit('update:count', this.count + 1);
    },
  },

  emits: ['update:count'],
};
</script>
