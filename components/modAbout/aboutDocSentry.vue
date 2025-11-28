<template>
  <div class="mt-8 bg-white shadow-sm rounded-lg p-6">
    <h2 class="text-lg font-medium text-gray-900 mb-4">À propos de DocSentry</h2>
    <div class="prose max-w-none text-gray-600">
      <p>DocSentry est un service d'authentification de documents qui génère une empreinte numérique unique (hash) pour chaque fichier, afin de garantir son intégrité et son authenticité.</p>
      <div class="mt-4">
        <h3 class="text-base font-medium text-gray-900">Comment ça marche ?</h3>
        <ol class="mt-2 list-decimal pl-5 space-y-2">
          <li>Téléchargez votre document (PDF, Excel, PowerPoint ou Word)</li>
          <li>DocSentry génère une empreinte cryptographique unique (hash SHA-256)</li>
          <li>Un code QR est créé pour la vérification publique</li>
          <li>Un certificat officiel est généré avec les informations d'authentification</li>
        </ol>
      </div>
      <div class="mt-4">
        <h3 class="text-base font-medium text-gray-900">Avantages</h3>
        <ul class="mt-2 list-disc pl-5 space-y-2">
          <li>Vérifiez l'intégrité et l'authenticité de tout document</li>
          <li>Protégez-vous contre les falsifications</li>
          <li>Partagez des documents avec la garantie qu'ils sont authentiques</li>
        </ul>
      </div>
    </div>
  </div>
</template>
