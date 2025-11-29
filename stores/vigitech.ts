import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Severity = 'critique' | 'élevée' | 'moyenne' | 'faible' | 'info'
export type Status = 'published' | 'reported' | 'blocked' | 'suspended'
export type Category = 'Malware' | 'Phishing' | 'Vulnérabilité' | 'DDoS' | 'Ransomware' | 'Data Breach' | 'Autre'

export interface Publication {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  isAnonymous: boolean
  category: Category
  severity: Severity
  commentsCount: number
  createdAt: string
  status: Status
  views?: number
  reportCount?: number
  shares?: number
  moderationInfo?: {
    reason: string
    moderatedBy: string
    moderatedAt: string
  }
}

export interface Comment {
  id: string
  content: string
  author: string
  isAnonymous: boolean
  createdAt: string
  publicationId: string
  publicationTitle?: string
  status: Status
}

export interface Report {
  id: string
  contentType: 'publication' | 'comment'
  contentId: string
  publicationId: string
  contentTitle: string
  contentPreview: string
  contentAuthor: string
  reportedBy: string
  reason: 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'other'
  reportDetails?: string
  reportCount: number
  status: 'pending' | 'resolved' | 'blocked'
  createdAt: string
  moderatedBy?: string
  moderatedAt?: string
}

export const useVigitechStore = defineStore('vigitech', () => {
  // Publications
  const publications = ref<Publication[]>([
    {
      id: '1',
      title: 'Nouvelle vulnérabilité critique dans Apache Log4j',
      excerpt: 'Une faille de sécurité majeure permettant l\'exécution de code à distance a été découverte dans Apache Log4j...',
      content: `Une faille de sécurité majeure permettant l'exécution de code à distance a été découverte dans Apache Log4j, une bibliothèque de journalisation Java largement utilisée.

Cette vulnérabilité, identifiée comme CVE-2021-44228, permet à un attaquant distant d'exécuter du code arbitraire sur le système cible sans authentification préalable.

Points clés :
- Sévérité : Critique (CVSS 10.0)
- Versions affectées : Log4j 2.0-beta9 à 2.14.1
- Exploitation : Triviale, nombreux exploits publics disponibles
- Impact : Exécution de code à distance, compromission totale du système

Recommandations :
1. Mettre à jour vers Log4j version 2.15.0 ou supérieure immédiatement
2. Si la mise à jour n'est pas possible, désactiver les lookups JNDI
3. Surveiller les logs pour détecter les tentatives d'exploitation
4. Effectuer une analyse de sécurité complète des systèmes potentiellement affectés

Cette vulnérabilité est activement exploitée dans la nature. Une action immédiate est requise.`,
      author: 'SecExpert',
      isAnonymous: false,
      category: 'Vulnérabilité',
      severity: 'critique',
      commentsCount: 4,
      createdAt: '2025-11-20T10:30:00Z',
      status: 'published',
      views: 1247,
      reportCount: 0,
      shares: 34
    },
    {
      id: '2',
      title: 'Campagne de phishing visant les institutions financières',
      excerpt: 'Plusieurs banques ont signalé une augmentation des tentatives de phishing sophistiquées...',
      content: 'Plusieurs banques ont signalé une augmentation des tentatives de phishing sophistiquées ciblant leurs clients. Les attaquants utilisent des techniques d\'ingénierie sociale avancées pour voler les identifiants bancaires.',
      author: 'Utilisateur anonyme',
      isAnonymous: true,
      category: 'Phishing',
      severity: 'élevée',
      commentsCount: 12,
      createdAt: '2025-11-21T14:20:00Z',
      status: 'published',
      views: 856,
      reportCount: 0,
      shares: 18
    },
    {
      id: '3',
      title: 'Ransomware LockBit 3.0 - Nouvelles variantes détectées',
      excerpt: 'Les chercheurs en sécurité ont identifié de nouvelles versions du ransomware LockBit avec des capacités améliorées...',
      content: 'Les chercheurs en sécurité ont identifié de nouvelles versions du ransomware LockBit avec des capacités de chiffrement plus rapides et des méthodes d\'évasion sophistiquées.',
      author: 'CyberWatch',
      isAnonymous: false,
      category: 'Ransomware',
      severity: 'critique',
      commentsCount: 31,
      createdAt: '2025-11-22T09:15:00Z',
      status: 'reported',
      views: 1523,
      reportCount: 3,
      shares: 42
    },
    {
      id: '4',
      title: 'Attaque DDoS massive contre des services cloud',
      excerpt: 'Une attaque DDoS de grande envergure a perturbé plusieurs fournisseurs de services cloud majeurs...',
      content: 'Une attaque DDoS par amplification DNS a ciblé plusieurs fournisseurs cloud, causant des interruptions de service pendant plusieurs heures.',
      author: 'Utilisateur anonyme',
      isAnonymous: true,
      category: 'DDoS',
      severity: 'élevée',
      commentsCount: 18,
      createdAt: '2025-11-23T16:45:00Z',
      status: 'published',
      views: 634,
      reportCount: 0,
      shares: 12
    },
    {
      id: '5',
      title: 'Data breach chez un géant du e-commerce',
      excerpt: 'Des données personnelles de millions d\'utilisateurs auraient été exposées suite à une brèche de sécurité...',
      content: 'Une base de données non sécurisée a exposé les informations personnelles de plus de 10 millions d\'utilisateurs, incluant emails, adresses et numéros de téléphone.',
      author: 'InfoSecNews',
      isAnonymous: false,
      category: 'Data Breach',
      severity: 'critique',
      commentsCount: 45,
      createdAt: '2025-11-24T11:30:00Z',
      status: 'published',
      views: 2341,
      reportCount: 0,
      shares: 67
    },
    {
      id: '6',
      title: 'Nouveau malware ciblant les appareils IoT',
      excerpt: 'Un nouveau malware spécialisé dans l\'exploitation des vulnérabilités IoT a été découvert...',
      content: 'Un botnet ciblant les caméras de sécurité et routeurs domestiques a été détecté. Le malware exploite des mots de passe par défaut et des vulnérabilités connues.',
      author: 'IoTSecure',
      isAnonymous: false,
      category: 'Malware',
      severity: 'moyenne',
      commentsCount: 9,
      createdAt: '2025-11-25T08:20:00Z',
      status: 'published',
      views: 423,
      reportCount: 0,
      shares: 8
    }
  ])

  // Comments
  const comments = ref<Comment[]>([
    {
      id: 'c1',
      content: 'Excellente analyse. Nous avons détecté plusieurs tentatives d\'exploitation sur nos serveurs. La mise à jour est effectivement critique.',
      author: 'AdminSys',
      isAnonymous: false,
      createdAt: '2025-11-20T11:45:00Z',
      publicationId: '1',
      publicationTitle: 'Nouvelle vulnérabilité critique dans Apache Log4j',
      status: 'published'
    },
    {
      id: 'c2',
      content: 'Merci pour le partage. Quelqu\'un a-t-il des IOCs (Indicators of Compromise) à partager pour la détection ?',
      author: 'Utilisateur anonyme',
      isAnonymous: true,
      createdAt: '2025-11-20T13:20:00Z',
      publicationId: '1',
      publicationTitle: 'Nouvelle vulnérabilité critique dans Apache Log4j',
      status: 'published'
    },
    {
      id: 'c3',
      content: 'Nous avons publié un script de détection sur notre GitHub. Lien en MP si besoin.',
      author: 'CyberDefense',
      isAnonymous: false,
      createdAt: '2025-11-20T14:30:00Z',
      publicationId: '1',
      publicationTitle: 'Nouvelle vulnérabilité critique dans Apache Log4j',
      status: 'published'
    },
    {
      id: 'c4',
      content: 'Cette vulnérabilité est un cauchemar pour les équipes de sécurité. Des milliers de serveurs exposés...',
      author: 'SecOps',
      isAnonymous: false,
      createdAt: '2025-11-21T09:15:00Z',
      publicationId: '1',
      publicationTitle: 'Nouvelle vulnérabilité critique dans Apache Log4j',
      status: 'reported'
    },
    {
      id: 'c5',
      content: 'Cette campagne est particulièrement sophistiquée. Nous avons observé des techniques d\'ingénierie sociale très avancées.',
      author: 'SecAnalyst',
      isAnonymous: false,
      createdAt: '2025-11-21T15:30:00Z',
      publicationId: '2',
      publicationTitle: 'Campagne de phishing visant les institutions financières',
      status: 'reported'
    }
  ])

  // Reports
  const reports = ref<Report[]>([
    {
      id: 'r1',
      contentType: 'publication',
      contentId: '3',
      publicationId: '3',
      contentTitle: 'Ransomware LockBit 3.0 - Nouvelles variantes détectées',
      contentPreview: 'Les chercheurs en sécurité ont identifié de nouvelles versions du ransomware LockBit avec des capacités améliorées...',
      contentAuthor: 'CyberWatch',
      reportedBy: 'SecurityUser',
      reason: 'misinformation',
      reportDetails: 'Les informations partagées semblent inexactes et pourraient induire en erreur la communauté.',
      reportCount: 3,
      status: 'pending',
      createdAt: '2025-11-27T10:30:00Z'
    },
    {
      id: 'r2',
      contentType: 'comment',
      contentId: 'c4',
      publicationId: '1',
      contentTitle: 'Commentaire sur "Nouvelle vulnérabilité critique dans Apache Log4j"',
      contentPreview: 'Cette vulnérabilité est un cauchemar pour les équipes de sécurité. Des milliers de serveurs exposés...',
      contentAuthor: 'SecOps',
      reportedBy: 'Utilisateur anonyme',
      reason: 'spam',
      reportDetails: 'Commentaire répétitif et sans valeur ajoutée.',
      reportCount: 1,
      status: 'pending',
      createdAt: '2025-11-27T14:15:00Z'
    },
    {
      id: 'r3',
      contentType: 'publication',
      contentId: '7',
      publicationId: '7',
      contentTitle: 'Publicité pour des services de hacking',
      contentPreview: 'Services de pentesting à prix cassés ! Contactez-nous pour plus d\'informations...',
      contentAuthor: 'HackerPro',
      reportedBy: 'AdminSec',
      reason: 'spam',
      reportDetails: 'Publication commerciale non autorisée.',
      reportCount: 5,
      status: 'blocked',
      createdAt: '2025-11-26T09:00:00Z',
      moderatedBy: 'AdminPrincipal',
      moderatedAt: '2025-11-26T09:30:00Z'
    }
  ])

  // Computed
  const publishedPublications = computed(() =>
    publications.value.filter(p => p.status === 'published')
  )

  const reportedPublications = computed(() =>
    publications.value.filter(p => p.status === 'reported')
  )

  const pendingReports = computed(() =>
    reports.value.filter(r => r.status === 'pending')
  )

  const totalStats = computed(() => ({
    publications: publications.value.length,
    comments: comments.value.length,
    reports: reports.value.length,
    blocked: publications.value.filter(p => p.status === 'blocked').length
  }))

  // Actions
  const addPublication = (publication: Omit<Publication, 'id' | 'createdAt' | 'commentsCount' | 'status' | 'views' | 'reportCount' | 'shares'>) => {
    const newPublication: Publication = {
      ...publication,
      id: `pub_${Date.now()}`,
      createdAt: new Date().toISOString(),
      commentsCount: 0,
      status: 'published',
      views: 0,
      reportCount: 0,
      shares: 0
    }
    publications.value.unshift(newPublication)
    return newPublication
  }

  const addComment = (comment: Omit<Comment, 'id' | 'createdAt' | 'status'>) => {
    const newComment: Comment = {
      ...comment,
      id: `com_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'published'
    }
    comments.value.unshift(newComment)

    // Update publication comment count
    const publication = publications.value.find(p => p.id === comment.publicationId)
    if (publication) {
      publication.commentsCount++
    }

    return newComment
  }

  const addReport = (report: Omit<Report, 'id' | 'createdAt' | 'status' | 'reportCount'>) => {
    const newReport: Report = {
      ...report,
      id: `rep_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      reportCount: 1
    }
    reports.value.unshift(newReport)
    return newReport
  }

  const getPublicationById = (id: string) => {
    return publications.value.find(p => p.id === id)
  }

  const getCommentsByPublicationId = (publicationId: string) => {
    return comments.value.filter(c => c.publicationId === publicationId)
  }

  const deletePublication = (id: string) => {
    const index = publications.value.findIndex(p => p.id === id)
    if (index !== -1) {
      publications.value.splice(index, 1)
    }
  }

  const deleteComment = (id: string) => {
    const index = comments.value.findIndex(c => c.id === id)
    if (index !== -1) {
      const comment = comments.value[index]
      const publication = publications.value.find(p => p.id === comment.publicationId)
      if (publication && publication.commentsCount > 0) {
        publication.commentsCount--
      }
      comments.value.splice(index, 1)
    }
  }

  const updatePublicationStatus = (id: string, status: Status) => {
    const publication = publications.value.find(p => p.id === id)
    if (publication) {
      publication.status = status
    }
  }

  return {
    // State
    publications,
    comments,
    reports,

    // Computed
    publishedPublications,
    reportedPublications,
    pendingReports,
    totalStats,

    // Actions
    addPublication,
    addComment,
    addReport,
    getPublicationById,
    getCommentsByPublicationId,
    deletePublication,
    deleteComment,
    updatePublicationStatus
  }
})
