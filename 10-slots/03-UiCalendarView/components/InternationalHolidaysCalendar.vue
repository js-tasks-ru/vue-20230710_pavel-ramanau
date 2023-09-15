<template>
  <UiCalendarView v-slot="{ date, month }">
    <div v-for="holiday in internationalHolidaysMap[month][date]" :key="holiday" class="holiday">
      {{ holiday }}
    </div>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from "./UiCalendarView.vue";

export default {
  name: "InternationalHolidaysCalendar",

  components: {
    UiCalendarView,
  },

  data() {
    return {
      currentDate: new Date(),
      // Data from: https://www.timeanddate.com/holidays/world/
      internationalHolidays: [
        { date: 7, month: 1, holiday: "International Programmers' Day" },
        { date: 16, month: 1, holiday: "World Religion Day" },
        { date: 26, month: 1, holiday: "International Customs Day" },
        { date: 30, month: 1, holiday: "World Leprosy Day" },
        { date: 2, month: 2, holiday: "World Wetlands Day" },
        { date: 4, month: 2, holiday: "World Cancer Day" },
        { date: 11, month: 2, holiday: "World Day of the Sick" },
        { date: 1, month: 3, holiday: "Self-Injury Awareness Day" },
        { date: 10, month: 3, holiday: "World Kidney Day" },
        { date: 26, month: 3, holiday: "Earth Hour" },
        { date: 1, month: 4, holiday: "April Fool's Day" },
        { date: 15, month: 4, holiday: "World Art Day" },
        { date: 18, month: 4, holiday: "International Day for Monuments and Sites" },
        { date: 1, month: 5, holiday: "International Family Equality Day" },
        { date: 8, month: 5, holiday: "World Ovarian Cancer Day" },
        { date: 8, month: 5, holiday: "World Red Cross and Red Crescent Day" },
        { date: 12, month: 5, holiday: "International Nurses Day" },
        { date: 13, month: 5, holiday: "Friday the 13th" },
        {
          date: 20,
          month: 5,
          holiday: "World Autoimmune / Autoinflammatory Arthritis Day",
        },
        { date: 25, month: 5, holiday: "African Liberation Day" },
        { date: 31, month: 8, holiday: "International Overdose Awareness Day" },
        { date: 4, month: 9, holiday: "World Sexual Health Day" },
        { date: 7, month: 9, holiday: "Still's Disease Awareness Day" },
        { date: 10, month: 9, holiday: "World Suicide Prevention Day" },
        { date: 13, month: 9, holiday: "International Programmers' Day" },
        { date: 23, month: 9, holiday: "International Celebrate Bisexuality Day" },
        { date: 28, month: 9, holiday: "World Rabies Day" },
        { date: 29, month: 9, holiday: "World Heart Day" },
        { date: 1, month: 10, holiday: "World Vegetarian Day" },
        { date: 6, month: 10, holiday: "World Cerebral Palsy Day" },
        { date: 13, month: 10, holiday: "World Sight Day" },
        { date: 29, month: 10, holiday: "World Stroke Day" },
        { date: 1, month: 11, holiday: "World Vegan Day" },
        { date: 12, month: 11, holiday: "World Pneumonia Day" },
        { date: 17, month: 11, holiday: "World Prematurity Day" },
        { date: 19, month: 11, holiday: "International Men's Day" },
      ],
    };
  },

  computed: {
    // Вычисляемое свойство для фильтрации и преобразования массива праздников
    internationalHolidaysMap() {
      const currentMonth = this.currentDate.getUTCMonth();
      const filteredHolidays = this.internationalHolidays.filter((holiday) => {
        return holiday.month - 1 === currentMonth; // Фильтруем праздники по текущему месяцу
      });

      const result = Array.from(Array(31), () => []); // Создаем массив для хранения праздников в каждый день месяца

      for (const { date, holiday } of filteredHolidays) {
        result[date - 1].push(holiday); // Добавляем праздник в соответствующий день месяца
      }

      return result;
    },
  },

  methods: {
    shouldDisplayHoliday(day) {
      return day && day.date instanceof Date && !isNaN(day.date.getMonth());
    },
    getHolidaysForDate(day) {
      if (day && day.date instanceof Date && !isNaN(day.date.getMonth())) {
        const month = day.date.getMonth() + 1;
        const date = day.date.getDate();

        const key = `${month}-${date}`;
        if (this.internationalHolidaysMap[key]) {
          return this.internationalHolidaysMap[key];
        }
      }
      return [];
    },
  },
};
</script>

<style scoped>
.holiday {
  font-weight: bold;
  color: var(--red);
}
</style>
