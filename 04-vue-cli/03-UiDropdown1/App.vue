<template>
  <div class="sample container">
    <h2>With icons</h2>
    <p>selectedType = {{ selectedType }}</p>
    <p>
      <button @click="setRegistration">Set registration</button>
    </p>
    <p><button @click="updateOptions">Remove last option</button></p>
    <p>
      <UiDropdown
        :options="agendaItemTypes"
        :title="title"
        :selected-icon="selectedIcon"
        @change-title="handleChangeTitle"
      />
    </p>

    <h2>Without icons</h2>
    <p>selectedLang = {{ selectedLang }}</p>
    <p>
      <UiDropdown v-model="selectedLang" :options="langOptions" title="Язык" />
    </p>

    <h2>Mixed icons</h2>
    <UiDropdown v-model="selectedMixed" :options="mixedIconsOptions" title="Mixed icons" />
    <p></p>
  </div>
</template>

<script>
import UiDropdown from './components/UiDropdown.vue';

const agendaIconMap = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemTypes = [
  {
    value: 'registration',
    text: 'Регистрация',
  },
  {
    value: 'opening',
    text: 'Открытие',
  },
  {
    value: 'break',
    text: 'Перерыв',
  },
  {
    value: 'coffee',
    text: 'Coffee Break',
  },
  {
    value: 'closing',
    text: 'Закрытие',
  },
  {
    value: 'afterparty',
    text: 'Afterparty',
  },
  {
    value: 'talk',
    text: 'Доклад',
  },
  {
    value: 'other',
    text: 'Другое',
  },
].map((item) => ({
  ...item,
  icon: agendaIconMap[item.value],
}));

export default {
  name: 'App',
  components: { UiDropdown },
  data() {
    return {
      agendaItemTypes,

      langOptions: [
        { value: 'EN', text: 'EN' },
        { value: 'RU', text: 'RU' },
      ],

      mixedIconsOptions: [
        { value: 'with-icon', text: 'With icon', icon: 'tv' },
        { value: 'without-icon', text: 'Without icon' },
      ],

      selectedLang: 'EN',
      selectedType: undefined,
      selectedMixed: undefined,
      title: 'Событие',
      selectedIcon: '',
    };
  },

  methods: {
    updateOptions() {
      this.agendaItemTypes.pop();
    },
    handleChangeTitle(selectedOption, selectedValue, selectedIcon) {
      this.title = selectedOption;
      this.selectedType = selectedValue;
      this.selectedIcon = selectedIcon;
    },
    setRegistration() {
      const registrationItem = this.agendaItemTypes.find((item) => item.value === 'registration');
      if (registrationItem) {
        this.selectedType = registrationItem.value;
        this.title = registrationItem.text;
        this.selectedIcon = 'key'
      }
    },
  },
};
</script>

<style></style>
