/**
 * Модуль - заглушка для тестирования гарда авторизации
 */

let isLoggedIn = false;

/**
 * Авторизован ли текущий пользователь
 * @return {boolean}
 */
export function isAuthenticated() { // возвращает true, если пользователь авторизован, и false, если нет
  return isLoggedIn;
}

export function login() {
  isLoggedIn = true;
}

export function logout() {
  isLoggedIn = false;
}
