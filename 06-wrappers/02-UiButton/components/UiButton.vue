<template>
  <component :is="tag" :type="isButton" :variant="variant" :class="[classes, {'button_block':block}]" class="button">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiButton',

  props: {
    tag: {
      type: [String, Object],
      default: 'button',
    },
    variant: {
      type: String,
      default: 'secondary',
      validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
    },
    block: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      const classMappings = {
        primary: 'button_primary',
        secondary: 'button_secondary',
        danger: 'button_danger',
      };
      return classMappings[this.variant];
    },
    isButton() {
      const buttonTypes = {
        button: 'button',
        submit: 'submit',
        reset: 'reset',
      };
      return buttonTypes[this.tag];
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}

.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}

.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}

.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
