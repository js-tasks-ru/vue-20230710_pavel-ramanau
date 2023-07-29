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
        :selectedIcon="selectedIcon"
        @change-title="handleChangeTitle"
      />
    </p>

    <h2>Without icons</h2>
    <p>selectedLang = {{ selectedLang }}</p>
    <p>
      <UiDropdown
        :options="langOptions"
        :title="selectedLang"
        :selectedLang="selectedLang"
        @change-language="handleChangeLanguage"
      />
    </p>
    <h2>Mixed icons</h2>
    <UiDropdown
      :selectedMixed="selectedMixed"
      :options="mixedIconsOptions"
      :title="selectedMixed"
      :selectedIcon="selectedIconMixed"
      @change-mixed="handleChangeMixed"
    />
    <p></p>
    <!-- Новый блок для скрытого <select> -->
      <div style="display: none;">
        <select v-model="selectedType">
          <option v-for="(item, index) in agendaItemTypes" :key="index" :value="item.value">
            {{ item.text }}
          </option>
        </select>
      </div>
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
      selectedMixed: 'Mixed icons',
      title: 'Событие',
      selectedIcon: '',
      selectedIconMixed: '',
    };
  },

  methods: {
    updateOptions() {
      this.agendaItemTypes.pop();
    },
    handleChangeTitle(selectedText, selectedValue, selectedIcon) {
      this.title = selectedText;
      this.selectedType = selectedValue;
      this.selectedIcon = selectedIcon;
    },
    setRegistration() {
      const registrationItem = this.agendaItemTypes.find((item) => item.value === 'registration');
      if (registrationItem) {
        this.selectedType = registrationItem.value;
        this.title = registrationItem.text;
        this.selectedIcon = 'key';
      }
    },
    handleChangeLanguage(selectedLang) {
      this.selectedLang = selectedLang; // Обновляем значение selectedLang при выборе языка
    },
    handleChangeMixed(selectedMixed, selectedIcon) {
      this.selectedMixed = selectedMixed;
      this.selectedIconMixed = selectedIcon;
    },
  },
};
</script>

<style></style>
