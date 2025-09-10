<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Guide d'utilisation
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          Apprenez à utiliser CYPASS efficacement pour sécuriser vos actifs numériques
        </p>
      </div>

      <div class="space-y-8">
        <!-- DocSentry -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">DocSentry</h2>

            <div class="prose max-w-none">
              <h3 class="text-lg font-medium text-gray-900 mt-6 mb-4">Comment authentifier un document ?</h3>
              <ol class="list-decimal pl-5 space-y-4">
                <li>
                  <p class="text-gray-600">Connectez-vous à votre compte CYPASS</p>
                </li>
                <li>
                  <p class="text-gray-600">Accédez au module DocSentry depuis votre tableau de bord</p>
                </li>
                <li>
                  <p class="text-gray-600">Cliquez sur le bouton "Authentifier un document"</p>
                </li>
                <li>
                  <p class="text-gray-600">Sélectionnez le fichier à authentifier (PDF, Word, Excel, PowerPoint)</p>
                </li>
                <li>
                  <p class="text-gray-600">Le système génère automatiquement :</p>
                  <ul class="list-disc pl-5 mt-2">
                    <li>Une empreinte numérique unique (hash)</li>
                    <li>Un QR code pour la vérification</li>
                    <li>Un certificat d'authenticité</li>
                  </ul>
                </li>
              </ol>

              <h3 class="text-lg font-medium text-gray-900 mt-8 mb-4">Comment vérifier un document ?</h3>
              <ol class="list-decimal pl-5 space-y-4">
                <li>
                  <p class="text-gray-600">Accédez à la page de vérification (pas besoin de compte)</p>
                </li>
                <li>
                  <p class="text-gray-600">Trois options de vérification :</p>
                  <ul class="list-disc pl-5 mt-2">
                    <li>Scanner le QR code du document</li>
                    <li>Entrer le hash du document</li>
                    <li>Télécharger le document pour vérification</li>
                  </ul>
                </li>
                <li>
                  <p class="text-gray-600">Le système vérifie l'authenticité et affiche les détails du document</p>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <!-- SecuScan -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">SecuScan</h2>

            <div class="prose max-w-none">
              <h3 class="text-lg font-medium text-gray-900 mt-6 mb-4">Comment auditer un site web ?</h3>
              <ol class="list-decimal pl-5 space-y-4">
                <li>
                  <p class="text-gray-600">Connectez-vous à votre compte CYPASS</p>
                </li>
                <li>
                  <p class="text-gray-600">Accédez au module SecuScan</p>
                </li>
                <li>
                  <p class="text-gray-600">Cliquez sur "Analyser un site"</p>
                </li>
                <li>
                  <p class="text-gray-600">Entrez l'URL du site à analyser</p>
                </li>
                <li>
                  <p class="text-gray-600">Le système effectue automatiquement :</p>
                  <ul class="list-disc pl-5 mt-2">
                    <li>Analyse des vulnérabilités OWASP Top 10</li>
                    <li>Vérification des certificats SSL</li>
                    <li>Analyse des en-têtes de sécurité</li>
                    <li>Détection des bibliothèques obsolètes</li>
                  </ul>
                </li>
                <li>
                  <p class="text-gray-600">Un rapport détaillé est généré avec :</p>
                  <ul class="list-disc pl-5 mt-2">
                    <li>Score de sécurité global</li>
                    <li>Liste des vulnérabilités détectées</li>
                    <li>Recommandations personnalisées</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <!-- Bonnes pratiques -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Bonnes pratiques de sécurité</h2>

            <div class="prose max-w-none">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Protection des documents</h3>
                  <ul class="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Authentifiez tous les documents sensibles</li>
                    <li>Conservez une copie des certificats d'authenticité</li>
                    <li>Vérifiez régulièrement l'intégrité des documents</li>
                    <li>Utilisez des mots de passe forts pour les documents confidentiels</li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-medium text-gray-900 mb-4">Sécurité des sites web</h3>
                  <ul class="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Effectuez des audits réguliers</li>
                    <li>Appliquez rapidement les correctifs de sécurité</li>
                    <li>Surveillez les alertes de sécurité</li>
                    <li>Maintenez à jour toutes les dépendances</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
