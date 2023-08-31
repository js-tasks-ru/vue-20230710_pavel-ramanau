import { ref, watch, watchEffect } from 'vue';

/**
 * @template T
 * @param {Ref<T>} source - Отслеживаемый ref
 * @returns {Object<{ history: Ref<T[]> }>} - История изменения source
 */

export function refHistory(source) {
  const history = ref([]); //реактивный массив

  const addToHistory = () => {
    history.value.push(source.value);
  };

  watchEffect(
    () => {
      addToHistory();
      source.value = history.value[history.value.length - 1];
    },
    { flush: 'sync' }, //обработчик будет вызываться сразу же после изменения значения
  );

  return { history };
}
