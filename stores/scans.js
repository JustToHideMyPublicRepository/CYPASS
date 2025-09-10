import { defineStore } from 'pinia';

export const useScansStore = defineStore('scans', {
  state: () => ({
    scans: [
      {
        id: '1',
        url: 'https://exemple.com',
        score: 78,
        userId: 1,
        createdAt: '2025-04-26T08:30:00Z',
        vulnerabilities: [
          { id: 1, name: 'XSS', severity: 'high', description: 'Vulnérabilité XSS détectée' },
          { id: 2, name: 'CSRF', severity: 'medium', description: 'Protection CSRF insuffisante' }
        ],
        recommendations: [
          'Implémenter des en-têtes de sécurité HTTP',
          'Mettre à jour les bibliothèques obsolètes',
          'Ajouter une protection CSRF sur tous les formulaires'
        ]
      },
      {
        id: '2',
        url: 'https://site-test.bj',
        score: 92,
        userId: 1,
        createdAt: '2025-04-27T14:20:00Z',
        vulnerabilities: [
          { id: 3, name: 'Outdated Libraries', severity: 'low', description: 'Bibliothèques JavaScript obsolètes' }
        ],
        recommendations: [
          'Mettre à jour les bibliothèques JavaScript',
          'Implémenter CSP (Content Security Policy)'
        ]
      }
    ]
  }),
  
  getters: {
    getUserScans: (state) => (userId) => {
      return state.scans.filter(scan => scan.userId === userId);
    },
    
    getScanById: (state) => (id) => {
      return state.scans.find(scan => scan.id === id);
    }
  },
  
  actions: {
    async addScan(scanData, onProgress) {
      const steps = [
        { id: 1, name: 'Configuration', description: 'Configuration de l\'analyse', duration: 1000 },
        { id: 2, name: 'DNS', description: 'Résolution DNS et vérification de l\'accessibilité', duration: 1500 },
        { id: 3, name: 'Headers', description: 'Analyse des en-têtes de sécurité', duration: 2000 },
        { id: 4, name: 'SSL', description: 'Vérification du certificat SSL/TLS', duration: 1500 },
        { id: 5, name: 'Vulns', description: 'Recherche de vulnérabilités connues', duration: 3000 },
        { id: 6, name: 'Deps', description: 'Analyse des dépendances', duration: 2000 },
        { id: 7, name: 'Report', description: 'Génération du rapport', duration: 1000 }
      ];

      let currentStep = 0;
      const totalSteps = steps.length;

      for (const step of steps) {
        onProgress({
          step: currentStep + 1,
          totalSteps,
          currentStepInfo: step,
          progress: Math.round(((currentStep + 1) / totalSteps) * 100)
        });
        
        await new Promise(resolve => setTimeout(resolve, step.duration));
        currentStep++;
      }

      const vulnerabilities = [];
      const possibleVulns = [
        { name: 'XSS', severity: 'high', description: 'Vulnérabilité Cross-Site Scripting (XSS) détectée' },
        { name: 'SQL Injection', severity: 'high', description: 'Vulnérabilité d\'injection SQL possible' },
        { name: 'CSRF', severity: 'medium', description: 'Protection CSRF insuffisante' },
        { name: 'Outdated Libraries', severity: 'medium', description: 'Bibliothèques obsolètes avec failles connues' },
        { name: 'Missing Security Headers', severity: 'low', description: 'En-têtes de sécurité HTTP manquants' },
        { name: 'Weak Password Policy', severity: 'medium', description: 'Politique de mot de passe faible' },
        { name: 'Plain HTTP', severity: 'medium', description: 'Utilisation de HTTP non sécurisé' },
        { name: 'Insecure Cookies', severity: 'low', description: 'Cookies sans attributs de sécurité' }
      ];
      
      const vulnCount = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < vulnCount; i++) {
        const randomVuln = possibleVulns[Math.floor(Math.random() * possibleVulns.length)];
        vulnerabilities.push({
          id: i + 1,
          ...randomVuln
        });
      }
      
      const baseScore = 100;
      const deductions = vulnerabilities.reduce((total, vuln) => {
        if (vuln.severity === 'high') return total + 20;
        if (vuln.severity === 'medium') return total + 10;
        return total + 5;
      }, 0);
      
      const finalScore = Math.max(Math.min(baseScore - deductions, 100), 0);
      
      const recommendations = [
        'Mettre en place des en-têtes de sécurité HTTP',
        'Mettre à jour les bibliothèques obsolètes',
        'Implémenter une politique de mot de passe forte',
        'Configurer correctement les cookies (HttpOnly, Secure, SameSite)',
        'Mettre en place un pare-feu applicatif Web (WAF)',
        'Passer à HTTPS pour toutes les communications'
      ];
      
      const selectedRecommendations = [];
      const recCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < recCount; i++) {
        const randomRec = recommendations[Math.floor(Math.random() * recommendations.length)];
        if (!selectedRecommendations.includes(randomRec)) {
          selectedRecommendations.push(randomRec);
        }
      }
      
      const newId = String(this.scans.length + 1);
      const newScan = {
        id: newId,
        url: scanData.url,
        score: finalScore,
        userId: scanData.userId,
        createdAt: new Date().toISOString(),
        vulnerabilities,
        recommendations: selectedRecommendations
      };
      
      this.scans.push(newScan);
      return newScan;
    }
  }
});