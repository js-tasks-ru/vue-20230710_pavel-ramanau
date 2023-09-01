import { computed, ref, isRef } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
    //принимает неопределенное количество аргументов
  return (...args) => {
    //оборачиваем аргумент в ref, если это не ref
    const refArgs = args.map((arg) => (isRef(arg) ? arg : ref(arg)));

    const computedValue = computed(() => func(...refArgs.map((arg) => (isRef(arg) ? arg.value : arg))));
    return computedValue;
  };
}
