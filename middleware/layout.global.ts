export default defineNuxtRouteMiddleware((to) => {
  // if (!to.meta) {
  //   to.meta = {};
  // }

  if (to.path.startsWith('/dashboard') || to.path.startsWith('/modules')) {
    to.meta.layout = 'dashboard'
  } else {
    to.meta.layout = 'default'
  }
})
