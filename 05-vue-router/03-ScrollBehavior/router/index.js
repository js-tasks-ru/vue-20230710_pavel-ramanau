import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/03-ScrollBehavior'),

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      component: () => import('../views/PageMeetup.vue'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/PageMeetupDescription.vue'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/PageMeetupAgenda.vue'),
        },
      ],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // прокрутка к элементу с соответствующим id
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    if (savedPosition) {
      // для сохранения позиции, при переходе назад\вперед
      return savedPosition;
    }
    // При переходе на маршруты с meta свойством saveScrollPosition, сохранить позицию
    if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) {
      return false; // Оставить текущую позицию
    }
    // При переходе на маршруты c истинным meta свойством saveScrollPosition у to
     // При переходе на маршруты c истинным meta свойством saveScrollPosition у from
    if (
      (to.meta.saveScrollPosition && !from.meta.saveScrollPosition) ||
      (!to.meta.saveScrollPosition && from.meta.saveScrollPosition)
    ) {
      return { left: 0, top: 0 };
    }
    return { left: 0, top: 0 }; // прокрутить в начало
  },
});
