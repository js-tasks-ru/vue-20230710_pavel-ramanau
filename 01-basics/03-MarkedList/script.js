// import { createApp } from './vendor/vue.esm-browser.js';

// From https://jsonplaceholder.typicode.com/comments
const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

import { createApp } from './vendor/vue.esm-browser.js';
const vm = createApp({
  data() {
    return {
      emails,
      filteredEmails: [...emails],
      filter: {
        search: ''
      }, 
    };
  },

  computed: {
    filteredEmails() {
      const search = this.filter.search.toLowerCase();
      if (search) {
        return this.emails.filter(email => email.toLowerCase().includes(search));
      }
      return this.emails;
    }
  },
  methods: {
    isMatch(email) {
      const search = this.filter.search.toLowerCase();
      return search && email.toLowerCase().includes(search);
    }
  }

}).mount('#app');

