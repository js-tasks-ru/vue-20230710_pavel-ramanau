import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  props: {
    organizer: String,
    place: String,
    date: {
      type: Number,
      required: true, //обязательный параметр
    },
  },

  computed: {
    localDate() {
      return new Date(this.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    isoDate() {
      return new Date(this.date).toISOString().split('T')[0];
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
        <time :datetime="isoDate">{{ localDate }}</time>
      </li>
    </ul>`,
});

// navigator.language - возвращает строку с информацией о языке, установленном в настройках браузера пользователя
// 'ru-RU' - использовать русский язык для форматирования даты.
// undefined - чтобы использовать язык по умолчанию, который установлен в браузере. 