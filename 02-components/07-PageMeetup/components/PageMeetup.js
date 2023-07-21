import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetupData: null,
      isLoading: true,
      error: null,
    };
  },

  methods: {
    async fetchData() {
      try {
        this.meetupData = await fetchMeetupById(this.meetupId);
        this.isLoading = false;
        this.error = null;
      } catch (error) {
        console.error(error);
        this.isLoading = false;
        this.error = 'Ошибка загрузки митапа';
      }
    },
  },
  
  async mounted() {
    await this.fetchData();
  },

  watch: {
    meetupId: {
      immediate: true,
      handler() {
        this.fetchData();
      },
    },
  },

  template: `
    <div class="page-meetup">
        <UiContainer v-if="isLoading">
          <UiAlert>Загрузка...</UiAlert>
        </UiContainer>

        <UiContainer v-else-if="error">
          <UiAlert>{{ error }}</UiAlert>
        </UiContainer>
         <MeetupView v-else :meetup="meetupData" />
    </div>
    `,
});
