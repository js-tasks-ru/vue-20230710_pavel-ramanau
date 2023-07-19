import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',
  data() {
    return {
      // для выввода даты в формате: 8 мая 2020 г.
      options: {  year: 'numeric', month: 'long', day: 'numeric',  }, 
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
        <time datetime="2020-01-01">{{ new Date(date).toLocaleDateString('en-US', options) }}</time>
      </li>
    </ul>`,
});

// navigator.language - возвращает строку с информацией о языке, установленном в настройках браузера пользователя
// 'ru-RU' - использовать русский язык для форматирования даты.
// undefined - чтобы использовать язык по умолчанию, который установлен в браузере. 