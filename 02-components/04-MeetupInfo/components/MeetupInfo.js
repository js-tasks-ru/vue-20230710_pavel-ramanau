import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',
  data() {
    return {
      options: { day: 'numeric', month: 'long', year: 'numeric' }, // для выввода даты в формате: 8 мая 2020 г.
    };
  },
  props: {
    organizer: String,
    place: String,
    date: {
      type: Number,
      required: true, //обязательный параметр
    },
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
       {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time datetime="2020-01-01">{{ new Date(date).toLocaleDateString('ru-RU', options) }}</time>
      </li>
    </ul>`,
});
