import { jsPDF } from 'jspdf';

export const generateCertificate = (document) => {
  // Create new PDF document
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Add background pattern
  const pattern = pdf.setPattern({
    pattern: (p) => {
      p.rect(0, 0, 10, 10);
      p.setFillColor('#f3f4f6');
      p.fill();
    },
    xStep: 10,
    yStep: 10
  });
  pdf.setFillColor(pattern);
  pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');

  // Add border
  pdf.setDrawColor('#1A56DB');
  pdf.setLineWidth(1);
  pdf.rect(10, 10, pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 20);

  // Add header
  pdf.setFontSize(24);
  pdf.setTextColor('#1A56DB');
  pdf.text('Certificat d\'Authenticité', pdf.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

  // Add CYPASS logo text
  pdf.setFontSize(36);
  pdf.setTextColor('#1A56DB');
  pdf.text('CYPASS', pdf.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

  // Add document information
  pdf.setFontSize(12);
  pdf.setTextColor('#000000');

  const startY = 70;
  const lineHeight = 10;

  pdf.text('Ce document certifie l\'authenticité du fichier suivant :', 20, startY);
  
  // Document details
  const details = [
    { label: 'Nom du fichier:', value: document.filename },
    { label: 'Type:', value: document.type },
    { label: 'Taille:', value: document.size },
    { label: 'Date d\'authentification:', value: new Date(document.createdAt).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })},
    { label: 'Empreinte (SHA-256):', value: document.hash }
  ];

  details.forEach((detail, index) => {
    pdf.setFontSize(11);
    pdf.setTextColor('#666666');
    pdf.text(detail.label, 30, startY + (index + 2) * lineHeight);
    
    pdf.setTextColor('#000000');
    pdf.text(detail.value, 80, startY + (index + 2) * lineHeight);
  });

  // Add QR code
  if (document.qrCode) {
    const qrImage = document.qrCode;
    pdf.addImage(qrImage, 'PNG', pdf.internal.pageSize.getWidth() - 60, startY, 40, 40);
  }

  // Add verification instructions
  const verificationY = startY + (details.length + 4) * lineHeight;
  pdf.setFontSize(11);
  pdf.setTextColor('#666666');
  pdf.text('Pour vérifier l\'authenticité de ce document:', 20, verificationY);
  
  const instructions = [
    '1. Visitez https://cypass.bj/verifier',
    '2. Scannez le QR code ci-dessus ou',
    '3. Entrez l\'empreinte SHA-256 du document'
  ];

  instructions.forEach((instruction, index) => {
    pdf.text(instruction, 30, verificationY + (index + 1) * 8);
  });

  // Add footer
  pdf.setFontSize(10);
  pdf.setTextColor('#666666');
  const footerText = 'Ce certificat a été généré par CYPASS - La plateforme béninoise souveraine de cybersécurité';
  pdf.text(footerText, pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 20, { align: 'center' });

  return pdf;
};