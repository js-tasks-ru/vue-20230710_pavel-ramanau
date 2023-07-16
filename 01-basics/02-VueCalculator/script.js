import { createApp } from './vendor/vue.esm-browser.js';
const vm = createApp({
  data() {
    return {
      number_1: 0,
      number_2: 0,
      operator: 'sum',
    };
  },

  computed: {
    result() {
      if (this.operator === 'sum') {
        return this.number_1 + this.number_2;
      } else if (this.operator === 'subtract') {
        return this.number_1 - this.number_2;
      } else if (this.operator === 'multiply') {
        return this.number_1 * this.number_2;
      } else if (this.operator === 'divide') {
        return this.number_1 / this.number_2;
      }
      return 0;
    },
  },

  methods: {
    setOperator(operator) {
      this.operator = operator;
    },
  },
}).mount('#app');
