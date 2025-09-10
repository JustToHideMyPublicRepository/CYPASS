export default defineNuxtPlugin({
  name: 'auth',
  enforce: 'post',
  async setup() {
    const authStore = useAuthStore();
    
    // Only initialize auth from localStorage on client-side
    if (process.client) {
      await authStore.initAuth();
    }
  }
});