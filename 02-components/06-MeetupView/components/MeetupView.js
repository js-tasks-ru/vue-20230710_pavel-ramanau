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

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
    <MeetupCover :title="meetup.title" :image="meetup.image" />
      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description" />
            <h3>Программа</h3>
            <MeetupAgenda :agenda="meetup.agenda" />
            <UiAlert v-if="meetup.agenda.length === 0">Программа пока пуста...</UiAlert>
          </div>
          <div class="meetup__aside">
          <MeetupInfo
           :organizer="meetup.organizer"
           :place="meetup.place"
           :date="meetup.date"
          />
          </div>
        </div>
      </UiContainer>
    </div>`,
});
