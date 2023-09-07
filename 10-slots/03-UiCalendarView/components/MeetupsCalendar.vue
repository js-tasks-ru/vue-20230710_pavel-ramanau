<template>
  <UiCalendarView :current-date="currentDate">
    <template #default="{ day }">
      <div class="calendar-view__cell-content">
        <div class="calendar-view__cell-day">{{ day.day }}</div>
        <div class="calendar-view__cell-content">
          <ui-calendar-event
            v-for="(meetup, meetupIndex) in filterMeetupsByDate(day.date, currentDate)"
            :key="meetupIndex"
            :meetup="meetup"
          />
        </div>
      </div>
    </template>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from "./UiCalendarView.vue"; 
import UiCalendarEvent from "./UiCalendarEvent.vue"; 

export default {
  name: "MeetupsCalendar",

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    UiCalendarView, 
    UiCalendarEvent, 
  },

  data() {
    return {
      currentDate: new Date(),
    };
  },

  computed: {
    titleData() {
      return this.currentDate.toLocaleDateString(navigator.language, {
        month: "long",
        year: "numeric",
      });
    },
  },

  methods: {
    filterMeetupsByDate(targetDate, currentDate) {
      if (!targetDate) {
        return [];
      }

      const currentYear = currentDate.getUTCFullYear();
      const currentMonth = currentDate.getUTCMonth();
      const targetDateObject = new Date(targetDate);
      const dayNumber = targetDateObject.getUTCDate();

      if (isNaN(dayNumber)) {
        return [];
      }

      const filteredMeetups = this.meetups.filter((meetup) => {
        const meetupDate = new Date(meetup.date);
        return (
          meetupDate.getUTCFullYear() === currentYear &&
          meetupDate.getUTCMonth() === currentMonth &&
          meetupDate.getUTCDate() === dayNumber
        );
      });

      return filteredMeetups;
    },
  },
};
</script>
<style scoped></style>