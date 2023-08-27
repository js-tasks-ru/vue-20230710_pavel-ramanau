<template>
  <UiInput
    :type="type"
    :step="step"
    :modelValue="formattedModelValue"
    @input="updateModelValue"
  >
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from "./UiInput.vue";

export default {
  name: "UiInputDate",
  props: {
    type: {
      type: String,
      default: "date",
      validator(value) {
        return ["date", "time", "datetime-local"].includes(value);
      },
    },
    modelValue: {
      type: [Number, String, null],
      default: null,
    },
    step: {
      type: String,
      default: "any",
    },
  },

  components: { UiInput },

  emits: ["update:modelValue"],

  computed: {
    formattedModelValue() {
      if (this.type === "date" && this.modelValue !== null) {
        return new Date(this.modelValue).toISOString().slice(0, 10);
      } else if (this.type === "time" && this.modelValue !== null) {
        return new Date(this.modelValue).toISOString().slice(11, 16);
      } else if (this.type === "datetime-local" && this.modelValue !== null) {
        return new Date(this.modelValue).toISOString().slice(0, 16);
      } else {
        return "";
      }
    },
  },

  methods: {
    updateModelValue(event) {
      const newValue = event.target.valueAsNumber;

      if (isNaN(newValue)) {
        this.$emit("update:modelValue", null);
      } else {
        this.$emit("update:modelValue", newValue);
      }
    },
  },
};
</script>
