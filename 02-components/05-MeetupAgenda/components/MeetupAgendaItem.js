import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true, //обязательный параметр
    },
  },

  computed: {
    // будет использовать agendaItem.title или значение из agendaItemDefaultTitles, если title отсутствует
    agendaTitle() {
      return this.agendaItem.title || agendaItemDefaultTitles[this.agendaItem.type];
    },
    agentaIcon(){
      return '/assets/icons/icon-' + agendaItemIcons[this.agendaItem.type] + '.svg';
    },
  },
  
  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="agentaIcon" class="icon" :alt="agentaIcon" />
        <!-- эта шляпа не работает -->
        <!-- <img src="/assets/icons/icon-key.svg" class="icon" :alt="\`\${agentaIcon}\`" /> -->
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaTitle }}</h3>
       <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk" >  
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,
});