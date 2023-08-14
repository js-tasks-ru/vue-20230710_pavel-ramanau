import { isAuthenticated } from '../services/authService.js';

export function authGuard(to, from, next) {
  if (to.meta.requireAuth && !isAuthenticated()) {
    // нужна авторизация, но пользователь не авторизован
    next({
      path: '/login',
      query: { from: to.fullPath }, // чтобы после авторизации пользователь мог быть перенаправлен обратно на исходную страницу
    });
  } else if (to.meta.requireGuest && isAuthenticated()) {
    // перенаправляем. для гостей, но пользователь авторизован
    next('/');
  } else {
    // позволяет продолжить навигацию пользователя к запрашиваемому маршруту
    next();
  }
}