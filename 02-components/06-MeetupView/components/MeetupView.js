import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from './MeetupDescription.js';
import meetups from '../api/meetups.js';
import MeetupCover from './MeetupCover';
import MeetupInfo from './MeetupInfo.js';
import MeetupAgenda from './MeetupAgenda.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';


export default defineComponent({
  name: 'MeetupView',

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupInfo,
    MeetupAgenda,
    MeetupAgendaItem,
    UiAlert,
    UiContainer,
  },

  data() {
    return {
      meetups,
      selectedMeetup: 2,
      meetupWithImage: {
        title: 'VueConf US',
        image: 'https://course-vue.javascript.ru/api/images/5',
      },

      meetupWithoutImage: {
        title: 'Demo meetup',
        image: null,
      },
      agenda: [
        {
          id: 35,
          startsAt: '07:30',
          endsAt: '09:00',
          type: 'registration',
          title: null,
          description: null,
          speaker: null,
          language: null,
        },
        {
          id: 36,
          startsAt: '09:00',
          endsAt: '09:30',
          type: 'opening',
          title: 'Opening Keynote with Evan',
          description: null,
          speaker: null,
          language: null,
        },
        {
          id: 37,
          startsAt: '09:40',
          endsAt: '10:10',
          type: 'talk',
          title: 'Get the most out of Vue Router',
          description:
            "Routers in Single page applications touch a broad part of our business logic. As a consequence, we often end up with different ways of handling the same pattern/UX/logic in our code and we often wonder which one is better and why. Different ways of handling data fetching that change the user experience, different ways to implement layouts, and many more. During this talk, I will cover very practical implementations that I have found useful in the past and explain the differences between various Vue Router features. After the talk you will have a better understanding of Vue Router's API and hopefully the excitement to refactor some bits of your Vue app!",

          speaker: 'Eduardo',
          language: 'EN',
        },
      ],
    };
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  computed: {
    description() {
      return this.meetups[this.selectedMeetup].description;
    },
  },

  template: `
    <div>
    <MeetupCover :title="meetupWithImage.title" :image="meetupWithImage.image" />
    <!-- <MeetupCover :title="meetupWithoutImage.title" :image="meetupWithoutImage.image" /> -->

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="description" />
            <h3>Программа</h3>
            <MeetupAgenda :agenda="agenda" />
            <UiAlert v-if="agenda.length === 0">Программа пока пуста...</UiAlert>
          </div>
          <div class="meetup__aside">
          <MeetupInfo
           :organizer="meetups[selectedMeetup].organizer"
           :place="meetups[selectedMeetup].place"
           :date="meetups[selectedMeetup].date"
          />
          </div>
        </div>
      </UiContainer>
    </div>`,
});
