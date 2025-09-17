import { defineStore } from 'pinia';
import { useRuntimeConfig } from '#app';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phone: string | null;
  company?: string | null;
  jobTitle?: string | null;
  bio?: string | null;
  profilePictureUrl?: string | null;
  status: 'pending' | 'active' | 'inactive' | 'suspended' | 'deleted' | 'admin';
  isEmailVerified: boolean;
  twoFactorEnabled?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isEmailVerified: (state) => state.user?.isEmailVerified || false,
    isAdmin: (state) => state.user?.status === 'admin',
  },

  actions: {
    setUser(user: User | null) {
      this.user = user;
    },

    setToken(token: string | null) {
      this.token = token;
    },

    async login(emailAddress: string, password: string, rememberMe: boolean = false) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<{ user: User; token: string }>(`${config.public.apiBaseUrl}/user/auth/login`, {
          method: 'POST',
          body: { emailAddress, password },
        });

        this.setUser(response.user);
        this.setToken(response.token);

        if (process.client) {
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('user', JSON.stringify(response.user));
          storage.setItem('token', response.token);
        }

        return { success: true, user: response.user };
      } catch (error: any) {
        console.error('Login error:', error);
        return { success: false, message: error.data?.message || 'Email ou mot de passe incorrect' };
      }
    },

    async signup(userData: { firstName: string; lastName: string; emailAddress: string; password: string }) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<{ user: User; token: string }>(`${config.public.apiBaseUrl}/user/auth/register`, {
          method: 'POST',
          body: userData,
        });

        this.setUser(response.user);
        this.setToken(response.token);

        if (process.client) {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
        }

        return { success: true, user: response.user };
      } catch (error: any) {
        console.error('Signup error:', error);
        if (error.response && error.response.status === 400 && error.data && error.data.errors) {
          return { success: false, message: error.data.message, errors: error.data.errors };
        }
        return { success: false, message: error.data?.message || 'Une erreur est survenue lors de l\'inscription.', errors: [] };
      }
    },

    async forgotPassword(emailAddress: string) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<{ message: string }>(`${config.public.apiBaseUrl}/user/auth/forgot-password`, {
          method: 'POST',
          body: { emailAddress },
        });
        return { success: true, message: response.message };
      } catch (error: any) {
        console.error('Forgot password error:', error);
        return { success: false, message: error.data?.message || 'Une erreur est survenue lors de la demande de réinitialisation.' };
      }
    },

    async resetPassword(token: string, newPassword: string) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<{ message: string }>(`${config.public.apiBaseUrl}/user/auth/reset-password`, {
          method: 'POST',
          body: { token, newPassword },
        });
        return { success: true, message: response.message };
      } catch (error: any) {
        console.error('Reset password error:', error);
        return { success: false, message: error.data?.message || 'Le jeton est invalide ou a expiré, ou une erreur est survenue.' };
      }
    },

    async verifyEmail(token: string) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<{ message: string }>(`${config.public.apiBaseUrl}/user/auth/verify-email?token=${token}`, {
          method: 'GET',
        });

        if (this.user) {
          this.user.isEmailVerified = true;
          this.user.status = 'active';
          if (process.client) {
            localStorage.setItem('user', JSON.stringify(this.user));
            sessionStorage.setItem('user', JSON.stringify(this.user));
          }
        }

        return { success: true, message: response.message || 'Votre adresse e-mail a été vérifiée avec succès.' };
      } catch (error: any) {
        console.error('Email verification error:', error);
        const errorMessage = error.data?.message || error.message || 'Le jeton de vérification est invalide ou a expiré.';
        return { success: false, message: errorMessage };
      }
    },

    async requestEmailVerification(emailAddress: string) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<{ message: string }>(`${config.public.apiBaseUrl}/user/auth/request-email-verification`, {
          method: 'POST',
          body: { emailAddress },
        });
        return { success: true, message: response.message };
      } catch (error: any) {
        console.error('Request email verification error:', error);
        return { success: false, message: error.data?.message || 'Une erreur est survenue lors de la demande de nouveau lien.' };
      }
    },

    async updateProfile(profileData: Partial<User>, profilePictureFile: File | null = null) {
      const config = useRuntimeConfig();
      try {
        let body: FormData | Partial<User>;
        let headers: HeadersInit = {
          'Authorization': `Bearer ${this.token}`,
        };

        if (profilePictureFile) {
          body = new FormData();
          for (const key in profileData) {
            const typedKey = key as keyof Partial<User>;
            if (profileData[typedKey] !== undefined && profileData[typedKey] !== null) {
              body.append(typedKey, String(profileData[typedKey]));
            }
          }
          body.append('profilePicture', profilePictureFile);
          delete headers['Content-Type'];
        } else {
          body = profileData;
          headers['Content-Type'] = 'application/json';
        }

        const response = await $fetch<{ data: User }>(`${config.public.apiBaseUrl}/user/profile`, {
          method: 'PUT',
          headers: headers,
          body: body,
        });

        if (this.user && response.data) {
          Object.assign(this.user, response.data);
        }

        if (process.client) {
          localStorage.setItem('user', JSON.stringify(this.user));
          sessionStorage.setItem('user', JSON.stringify(this.user));
        }
        return { success: true, user: response.data };
      } catch (error: any) {
        console.error('Update profile error:', error);
        return { success: false, message: error.data?.message || 'Erreur lors de la mise à jour du profil.' };
      }
    },

    async updatePassword(passwordData: { currentPassword: string; newPassword: string; confirmPassword: string }) {
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<{ message: string }>(`${config.public.apiBaseUrl}/user/password`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
          body: passwordData,
        });
        return { success: true, message: response.message };
      } catch (error: any) {
        console.error('Update password error:', error);
        return { success: false, message: error.data?.message || 'Erreur lors de la mise à jour du mot de passe.' };
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      if (process.client) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
      }
    },

    async initAuth() {
      if (process.client) {
        try {
          let user = null;
          let token = null;

          const localUser = localStorage.getItem('user');
          const localToken = localStorage.getItem('token');

          if (localUser && localToken) {
            user = JSON.parse(localUser);
            token = localToken;
          } else {
            const sessionUser = sessionStorage.getItem('user');
            const sessionToken = sessionStorage.getItem('token');
            if (sessionUser && sessionToken) {
              user = JSON.parse(sessionUser);
              token = sessionToken;
            }
          }

          if (user && token) {
            this.setUser(user);
            this.setToken(token);
          }
        } catch (error) {
          console.error('Erreur lors de l\'initialisation de l\'auth', error);
          this.logout();
        }
      }
    }
  }
});
