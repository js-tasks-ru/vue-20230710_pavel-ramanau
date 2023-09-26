<template>
  <div class="button-group" role="group">
    <slot></slot>
  </div>
</template>

<script>
import { ref, provide, watch } from 'vue';

export default {
  name: "UiButtonGroup",
  props: {
    modelValue: {
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const selectedValue = ref(props.modelValue);

    provide('UiButtonGroup', {
      selectedValue,
      updateSelected: (value) => {
        selectedValue.value = value;
        emit('update:modelValue', value);
      },
    });

    watch(() => props.modelValue, (newValue) => {
      selectedValue.value = newValue;
    });

    return {};
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
