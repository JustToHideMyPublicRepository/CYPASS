import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // Accessibles sans authentification
  const isGuestRoute = to.path.startsWith('/auth/login') || to.path.startsWith('/auth/signup') || to.path.startsWith('/auth/forgot-password') || to.path.startsWith('/auth/email-verify') || to.path.startsWith('/auth/email-verification-pending') || to.path.startsWith('/auth/request-email-verification');
  
  // Nécessitent une authentification)
  const isProtectedRoute = to.path.startsWith('/dashboard') || to.path.startsWith('/modules');

  // Si l'utilisateur est déjà authentifié
  if (isGuestRoute && authStore.isAuthenticated) {
    return navigateTo('/dashboard');
  }

  // Si la route est protégée :
  if (isProtectedRoute) {
    if (!authStore.isAuthenticated) {
      return navigateTo('/auth/login');
    }

    // Si l'utilisateur est authentifié mais que son e-mail n'est pas vérifié
    if (authStore.user && !authStore.user.isEmailVerified && authStore.user.status === 'pending') {
      if (to.path !== '/auth/email-verification-pending' && to.path !== '/auth/email-verify' && to.path !== '/auth/request-email-verification') {
        return navigateTo('/auth/email-verification-pending');
      }
    }
  }
});
