import { defineStore } from 'pinia';

export const useDocumentsStore = defineStore('documents', {
  state: () => ({
    documents: [
      {
        id: '1',
        filename: 'Attestation de stage Elisée ATONDE.pdf',
        type: 'application/pdf',
        size: '1.5 MB',
        hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
        userId: 1,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069%0Ahttps://cypass.bj/verifier/1`,
        createdAt: '2025-04-26T10:30:00Z',
        verificationUrl: '/verifier/1',
        lastModified: '2025-04-26T10:30:00Z',
        status: 'verified',
        metadata: {
          author: 'Delluc Hounmenou',
          organization: 'HODD',
          department: 'Direction'
        }
      },
      {
        id: '2',
        filename: 'rapport-financier-Trimestre-1.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: '403 KO',
        hash: '3a1b5f2a7c6de8b4a9c0e5d7f3b2a1c6d8e4f5a2b7c9d6e3f8a1b2c5d4e7f8a9',
        userId: 1,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=3a1b5f2a7c6de8b4a9c0e5d7f3b2a1c6d8e4f5a2b7c9d6e3f8a1b2c5d4e7f8a9%0Ahttps://cypass.bj/verifier/2`,
        createdAt: '2025-05-02T14:45:00Z',
        verificationUrl: '/verifier/2',
        lastModified: '2025-05-02T14:45:00Z',
        status: 'verified',
        metadata: {
          author: 'Delluc Hounmenou',
          organization: 'HODD',
          department: 'Direction'
        }
      }
    ]
  }),
  
  getters: {
    getUserDocuments: (state) => (userId) => {
      return state.documents.filter(doc => doc.userId === userId);
    },
    
    getDocumentById: (state) => (id) => {
      return state.documents.find(doc => doc.id === id);
    },

    getDocumentByHash: (state) => (hash) => {
      return state.documents.find(doc => doc.hash === hash);
    }
  },
  
  actions: {
    addDocument(document) {
      const newId = String(this.documents.length + 1);
      const newDocument = {
        ...document,
        id: newId,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        status: 'verified',
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${document.hash}%0Ahttps://cypass.bj/verifier/${newId}`,
        verificationUrl: `/verifier/${newId}`,
        metadata: {
          author: document.author || 'Inconu',
          organization: 'Non définie',
          department: document.department || '-'
        }
      };
      
      this.documents.push(newDocument);
      return newDocument;
    },
    
    verifyDocument(hashOrId) {
      const document = this.documents.find(
        doc => doc.id === hashOrId || doc.hash === hashOrId
      );

      if (!document) return { verified: false, message: 'Document non trouvé' };
      
      return {
        verified: true,
        document: {
          id: document.id,
          filename: document.filename,
          type: document.type,
          size: document.size,
          hash: document.hash,
          createdAt: document.createdAt,
          lastModified: document.lastModified,
          status: document.status,
          metadata: document.metadata
        }
      };
    }
  }
});