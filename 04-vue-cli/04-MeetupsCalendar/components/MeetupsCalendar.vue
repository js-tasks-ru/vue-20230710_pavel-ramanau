<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="previousMonth"
        ></button>
        <div class="calendar-view__date">{{ titleData }}</div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="nextMonth"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !day.isCurrentMonth }"
        tabindex="0"
        v-for="(day, index) in currentMonthDays"
        :key="index"
      >
        <div class="calendar-view__cell-day">{{ day.day }}</div>
        <div class="calendar-view__cell-content">
          <!-- <div>day.date: {{ day.date }}</div> -->
          <a
            v-for="(meetup, meetupIndex) in filterMeetupsByDate(day.date)"
            :key="meetupIndex"
            class="calendar-event"
          >
            {{ meetup.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeetupsCalendar",

  data() {
    return {
      date: new Date(), // Получаем текущую дату
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    titleData() {
      return this.date.toLocaleDateString(navigator.language, {
        month: "long",
        year: "numeric",
      });
    },
    //формирует дни текущего месяца
    currentMonthDays() {
      const currentYear = this.date.getUTCFullYear(); // Текущий год
      const currentMonth = this.date.getUTCMonth(); // Текущий месяц, нумерация месяцев начинается с 0 до 11

      const firstDay = new Date(Date.UTC(currentYear, currentMonth, 1)); // Первый день текущего месяца (год, месяц, номер дня)
      const lastDay = new Date(Date.UTC(currentYear, currentMonth + 1, 0)); // Последний день текущего месяца.

      const startDayOfWeek = (firstDay.getUTCDay() - 1 + 7) % 7; // 0 - вс, 1 - пн... день недели, с которого начинается неделя
      //должен быть на 1 меньше, но при этом Воскресение должно быть 6 (а не -1). Поэтому мы добавляем 7 и берем остаток от деления на 7.

      // количество дней в предыдущем месяце
      // .getUTCDate() извлекает день месяца из объекта Date. это число будет количеством дней в предыдущем месяце.
      const daysInPrevMonth = new Date(
        Date.UTC(currentYear, currentMonth, 0)
      ).getUTCDate();

      let days = [];

      // дни ПРЕДЫДУЩЕГО месяца, попадающие на первую неделю текущего месяца
      for (let i = startDayOfWeek - 1; i >= 0; i--) {
        days.push({
          day: daysInPrevMonth - i,
          date: null, // это дни предыдущего месяца и у них нет даты в формате UNIX Timestamp.
          isCurrentMonth: false,
        });
      }

      // Перебираем дни от первого до последнего(ТЕКУЩИЙ месяц)
      for (let date = firstDay; date <= lastDay; date.setUTCDate(date.getUTCDate() + 1)) {
        const day = date.getUTCDate(); // получаем число (день месяца)
        days.push({
          day,
          // date: +date, // Преобразуем дату в милисекунды
          date: +new Date(date),
          isCurrentMonth: true, // Флаг, указывающий, что день принадлежит текущему месяцу
        });
      }

      // дни СЛЕДУЮЩЕГО месяца, попадающие на последнюю неделю текущего месяца
      for (let i = 1; days.length % 7 !== 0; i++) {
        days.push({
          day: i,
          date: null,
          isCurrentMonth: false,
        });
      }

      return days; //массив объектов  {day: 1, date: 1690833600000, isCurrentMonth: true}
    },
  },

  methods: {
    nextMonth() {
      const newDate = new Date(this.date);
      newDate.setUTCDate(15); // Устанавливаем безопасную дату перед изменением месяца
      newDate.setUTCMonth(newDate.getUTCMonth() + 1);
      this.date = newDate;
    },

    previousMonth() {
      const newDate = new Date(this.date);
      newDate.setUTCDate(15); 
      newDate.setUTCMonth(newDate.getUTCMonth() - 1);
      this.date = newDate;
    },

    filterMeetupsByDate(targetDate) {
      if (!targetDate) {
        return []; // Возвращаем пустой массив, если дата не определена
      }

      const currentYear = this.date.getUTCFullYear();
      const currentMonth = this.date.getUTCMonth();
      const targetDateObject = new Date(targetDate); // Преобразуем targetDate в объект типа Date
      const dayNumber = targetDateObject.getUTCDate();

      if (isNaN(dayNumber)) {
        return []; // Возвращаем пустой массив, если день не определен
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

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url("@/assets/icons/icon-pill-active.svg") left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
