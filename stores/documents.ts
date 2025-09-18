import { defineStore } from 'pinia';
import { useRuntimeConfig } from '#app';
import type { Document, Pagination, DocumentVerificationResult } from '@/types';

interface DocumentsState {
  documents: Document[];
  loading: boolean;
  pagination: Pagination | null;
}

export const useDocumentsStore = defineStore('documents', {
  state: (): DocumentsState => ({
    documents: [],
    loading: false,
    pagination: null,
  }),

  actions: {
    async authenticateDocument(file: File, metadata: Record<string, any> = {}) {
      this.loading = true;
      const config = useRuntimeConfig();
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('metadata', JSON.stringify(metadata));

        const response = await $fetch<{ document: Document; message: string; hash: string }>(
          `${config.public.apiBaseUrl}/documents/authenticate`,
          {
            method: 'POST',
            body: formData,
          }
        );

        this.documents.unshift(response.document);
        return { success: true, document: response.document, message: response.message };
      } catch (error: any) {
        console.error('Erreur authentification:', error);
        return {
          success: false,
          message: error.data?.message || 'Erreur lors de l\'authentification du document.',
          existingDocument: error.data?.existingDocument,
        };
      } finally {
        this.loading = false;
      }
    },

    async verifyDocument(hash: string): Promise<DocumentVerificationResult> {
      this.loading = true;
      const config = useRuntimeConfig();

      const hashPattern = /^[0-9a-fA-F]{64}$/;
      if (!hashPattern.test(hash)) {
        this.loading = false;
        return {
          verified: false,
          message: 'Le hash SHA-256 doit être une chaîne de 64 caractères hexadécimaux.',
          hash: hash,
        };
      }

      try {
        const response = await $fetch<DocumentVerificationResult>(
          `${config.public.apiBaseUrl}/documents/verify/${hash}`,
          {
            method: 'GET',
          }
        );
        return response;
      } catch (error: any) {
        console.error('Erreur vérification:', error);
        return {
          verified: false,
          message: error.data?.message || 'Une erreur est survenue lors de la vérification.',
          hash: hash,
        };
      } finally {
        this.loading = false;
      }
    },

    async verifyByFile(file: File): Promise<DocumentVerificationResult> {
      this.loading = true;
      const config = useRuntimeConfig();
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await $fetch<DocumentVerificationResult>(
          `${config.public.apiBaseUrl}/documents/verify`,
          {
            method: 'POST',
            body: formData,
          }
        );
        return response;
      } catch (error: any) {
        console.error('Erreur vérification par fichier:', error);
        return {
          verified: false,
          message: error.data?.message || 'Une erreur est survenue lors de la vérification par fichier.',
        };
      } finally {
        this.loading = false;
      }
    },

    async verifyByQrCode(file: File): Promise<DocumentVerificationResult> {
      this.loading = true;
      const config = useRuntimeConfig();
      try {
        const formData = new FormData();
        formData.append('qrimage', file); 

        const response = await $fetch<DocumentVerificationResult>(
          `${config.public.apiBaseUrl}/documents/verify/qr`,
          {
            method: 'POST',
            body: formData,
          }
        );
        return response;
      } catch (error: any) {
        console.error('Erreur vérification par QR Code:', error);
        return {
          verified: false,
          message: error.data?.message || 'Une erreur est survenue lors de la vérification par QR Code.',
        };
      } finally {
        this.loading = false;
      }
    },

    async fetchUserDocuments(page: number = 1, limit: number = 20) {
      this.loading = true;
      const config = useRuntimeConfig();
      try {
        const response = await $fetch<{ documents: Document[]; pagination: Pagination }>(
          `${config.public.apiBaseUrl}/documents`,
          {
            params: { page, limit },
          }
        );

        this.documents = response.documents;
        this.pagination = response.pagination;
        return { success: true, documents: response.documents, pagination: response.pagination };
      } catch (error: any) {
        console.error('Erreur récupération documents:', error);
        return {
          success: false,
          message: error.data?.message || 'Erreur lors de la récupération des documents.',
          documents: [],
          pagination: null,
        };
      } finally {
        this.loading = false;
      }
    },

    async downloadCertificate(documentId: string) {
      this.loading = true;
      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBaseUrl}/documents/${documentId}/certificate`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors du téléchargement du certificat');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificat-${documentId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return { success: true, message: 'Certificat téléchargé avec succès.' };
      } catch (error: any) {
        console.error('Erreur téléchargement certificat:', error);
        return { success: false, message: error.message || 'Erreur lors du téléchargement du certificat.' };
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    getUserDocuments: (state) => (userId: string) => {
      return state.documents; 
    },

    getDocumentById: (state) => (id: string) => {
      return state.documents.find((doc) => doc.id === id);
    },
  },
});

