<template>
  <RouterLink :to="to" class="tabs__tab" :class="{ tabs__tab_active: isActive }" role="tab">
    <slot />
  </RouterLink>
</template>

<script>
export default {
  name: 'UiTabsLink',

  props: {
    to: [String, Object],
  },

  computed: {
    isActive() {
      // позволяет получить объект с информацией о том, как будет обработан переданный маршрут, без непосредственной навигации.
      // {fullPath: '/meetups/2', hash: '', query: {…}, name: 'meetup.description', path: '/meetups/2',…}
      const resolvedRoute = this.$router.resolve(this.to);
      return resolvedRoute.fullPath === this.$route.fullPath;
    },
  },
};
</script>

<style scoped>
/* _tabs.css */
.tabs__tab {
  display: inline-flex;
  padding: 10px 0;
  font-weight: 400;
  font-size: 18px;
  text-decoration: none;
  line-height: 28px;
  color: var(--grey-8);
  border-bottom: 2px solid transparent;
  cursor: pointer;
  margin-right: 18px;
  transition-duration: 0.2s;
  transition-property: border-color, color;
  box-shadow: none;
  background-color: transparent;
  outline: none;
  position: relative;
  z-index: 1;
}

.tabs__tab:hover,
.tabs__tab.tabs__tab_active {
  border-bottom-color: var(--blue);
  color: var(--blue);
}
</style>
