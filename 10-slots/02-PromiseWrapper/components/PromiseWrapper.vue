<template>
  <div>
    <slot v-if="currentState === 'pending'" name="pending"></slot>
    <slot v-else-if="currentState === 'fulfilled'" name="fulfilled" :result="result"></slot>
    <slot v-else-if="currentState === 'rejected'" name="rejected" :error="error"></slot>
  </div>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      currentState: 'pending',
      result: null,
      error: null,
    };
  },

  watch: {
    immediate: true,
    promise: {
      handler(newPromise) {
        this.currentState = 'pending';
        this.result = null;
        this.error = null;

        newPromise
          .then(result => {
            this.currentState = 'fulfilled';
            this.result = result;
          })
          .catch(error => {
            this.currentState = 'rejected';
            this.error = error;
          });
      },
    },
  },
};
</script>
