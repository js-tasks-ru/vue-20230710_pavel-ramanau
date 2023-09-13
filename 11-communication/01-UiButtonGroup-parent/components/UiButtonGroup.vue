<template>
  <div class="button-group" role="group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UiButtonGroup',
emits: ['update:modelValue'],
  data() {
    return {
      selectedValue: this.modelValue,
    };
  },

  watch: {
    modelValue(newValue) {
      this.selectedValue = newValue;
    },
    '$parent.selectedValue': {
    immediate: true, 
    handler(newValue) {
      this.isActive = newValue === this.value;
    },
  },
  },

  methods: {
    updateSelected(value) {
      this.selectedValue = value;
      this.$emit('update:modelValue', value);
    },
  },
};
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
