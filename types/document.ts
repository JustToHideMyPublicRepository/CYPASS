
// ===============================================
// DOCUMENTS
// ===============================================
export interface Document {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  hash: string;
  filePath?: string;
  qrCodeUrl?: string;
  verificationUrl?: string;
  status: 'pending' | 'verified' | 'failed' | 'deleted';
  metadata: {
    author?: string;
    organization?: string;
    department?: string;
    [key: string]: any; 
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface DocumentVerificationResult {
  verified: boolean;
  message: string;
  document?: Document;
  hash?: string;
  uploadedFile?: { 
    filename: string;
    size: number;
    type: string;
  };
}
