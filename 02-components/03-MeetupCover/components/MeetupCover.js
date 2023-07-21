import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: String,
    image: String,
  },
  computed: {
    // возвращает объект со свойством --bg-url, установленным на url(${this.image}),
    // если пропс image не пустой или возвращает пустой объект
    coverStyle() {
      return this.image ? { '--bg-url': `url(${this.image})` } : {};
    },
  },

  template: `
  <!-- <div class="meetup-cover" :style="image && { '--bg-url': \`url('\${image}')\` }"> -->
    <div class="meetup-cover"  :style="coverStyle">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
