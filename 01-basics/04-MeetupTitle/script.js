import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const vm = createApp({
  data() {
    return {
      meetupTitle: '',
      selectedMeetupId: '',  // для watch
    };
  },
  // Когда значение selectedMeetupId изменяется, 
  // вызывается метод fetchMeetupTitle с новым идентификатором митапа.
  watch: {
    selectedMeetupId: {
      immediate: true,
      handler(newMeetupId) {
        this.fetchMeetupTitle(newMeetupId);
      },
    },
  },
  methods: {
    fetchMeetupTitle(meetupId) {
      fetchMeetupById(meetupId)
        .then((meetup) => {
          this.meetupTitle = meetup.title;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
}).mount('#app');
