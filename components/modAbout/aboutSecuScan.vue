<template>
  <div class="mt-8 bg-white shadow-sm rounded-lg p-6">
    <h2 class="text-lg font-medium text-gray-900 mb-4">À propos de SecuScan</h2>
    <div class="prose max-w-none text-gray-600">
      <p>SecuScan est un service d'audit de sécurité automatisé qui analyse la sécurité de votre site web en se basant sur les meilleures pratiques OWASP (Open Web Application Security Project).</p>
      <div class="mt-4">
        <h3 class="text-base font-medium text-gray-900">Comment ça marche ?</h3>
        <ol class="mt-2 list-decimal pl-5 space-y-2">
          <li>Entrez l'URL du site à analyser</li>
          <li>SecuScan effectue un scan approfondi pour détecter les vulnérabilités</li>
          <li>Un score de sécurité et une liste de vulnérabilités sont générés</li>
          <li>Des recommandations personnalisées sont fournies pour améliorer la sécurité</li>
        </ol>
      </div>
      <div class="mt-4">
        <h3 class="text-base font-medium text-gray-900">Types de vulnérabilités détectées</h3>
        <ul class="mt-2 list-disc pl-5 space-y-2">
          <li>Injections (SQL, XSS, etc.)</li>
          <li>Authentification et gestion de session faibles</li>
          <li>Exposition de données sensibles</li>
          <li>XXE (XML External Entities)</li>
          <li>Contrôle d'accès défaillant</li>
          <li>Mauvaise configuration de sécurité</li>
          <li>Scripts intersites (XSS)</li>
          <li>Désérialisation non sécurisée</li>
          <li>Utilisation de composants avec des vulnérabilités connues</li>
          <li>Journalisation et surveillance insuffisantes</li>
        </ul>
      </div>
    </div>
  </div>
</template>
