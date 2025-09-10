<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Questions fréquentes
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          Trouvez rapidement des réponses à vos questions sur CYPASS
        </p>
      </div>

      <div class="space-y-6">
        <!-- Général -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Questions générales</h2>

            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Qu'est-ce que CYPASS ?</h3>
                <p class="mt-2 text-gray-600">
                  CYPASS est la première plateforme béninoise souveraine de cybersécurité. Elle offre des solutions pour
                  authentifier les documents sensibles, auditer la sécurité des sites web et détecter les menaces en
                  temps réel.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900">Comment créer un compte ?</h3>
                <p class="mt-2 text-gray-600">
                  La création d'un compte est gratuite et simple. Cliquez sur "Se connecter" puis "Créer un compte".
                  Remplissez le formulaire avec vos informations et validez votre email pour activer votre compte.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900">Quels sont les différents modules disponibles ?</h3>
                <p class="mt-2 text-gray-600">
                  CYPASS propose actuellement quatre modules :
                </p>
                <ul class="mt-2 list-disc pl-5 text-gray-600">
                  <li>DocSentry : Authentification de documents</li>
                  <li>SecuScan : Audit de sécurité des sites web</li>
                  <li>LeakMonitor : Surveillance des fuites de données (bientôt)</li>
                  <li>VigiTech : Détection des menaces (bientôt)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- DocSentry -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">DocSentry</h2>

            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Quels types de documents puis-je authentifier ?</h3>
                <p class="mt-2 text-gray-600">
                  DocSentry prend en charge les formats de fichiers suivants :
                </p>
                <ul class="mt-2 list-disc pl-5 text-gray-600">
                  <li>PDF (.pdf)</li>
                  <li>Microsoft Word (.doc, .docx)</li>
                  <li>Microsoft Excel (.xls, .xlsx)</li>
                  <li>Microsoft PowerPoint (.ppt, .pptx)</li>
                </ul>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900">Comment fonctionne l'authentification ?</h3>
                <p class="mt-2 text-gray-600">
                  Le système calcule une empreinte numérique unique (hash SHA-256) du document. Cette empreinte est
                  stockée de manière sécurisée et un QR code est généré pour faciliter la vérification. Un certificat
                  d'authenticité est également créé.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900">Les documents sont-ils stockés sur vos serveurs ?</h3>
                <p class="mt-2 text-gray-600">
                  Non, CYPASS ne stocke que l'empreinte numérique du document, pas le document lui-même. Cela garantit
                  la confidentialité de vos données tout en permettant la vérification de l'authenticité.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- SecuScan -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">SecuScan</h2>

            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Que vérifie SecuScan exactement ?</h3>
                <p class="mt-2 text-gray-600">
                  SecuScan effectue une analyse complète basée sur les standards OWASP :
                </p>
                <ul class="mt-2 list-disc pl-5 text-gray-600">
                  <li>Vulnérabilités courantes (XSS, CSRF, injections...)</li>
                  <li>Configuration des certificats SSL/TLS</li>
                  <li>En-têtes de sécurité HTTP</li>
                  <li>Versions des bibliothèques et frameworks</li>
                  <li>Configuration des cookies et sessions</li>
                </ul>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900">L'analyse peut-elle endommager mon site ?</h3>
                <p class="mt-2 text-gray-600">
                  Non, SecuScan utilise des techniques d'analyse non intrusives. Nous ne testons pas les vulnérabilités
                  de manière active pour éviter tout impact sur votre site.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900">Quelle est la fréquence recommandée des audits ?</h3>
                <p class="mt-2 text-gray-600">
                  Nous recommandons d'effectuer un audit complet au moins une fois par mois, ainsi qu'après chaque mise
                  à jour majeure de votre site ou de ses composants.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Support -->
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
          <div class="px-4 py-5 sm:p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Support et assistance</h2>

            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900">Comment obtenir de l'aide ?</h3>
                <p class="mt-2 text-gray-600">
                  Notre équipe de support est disponible pour vous aider :
                </p>
                <ul class="mt-2 list-disc pl-5 text-gray-600">
                  <li>Email : support@cypass.bj</li>
                  <li>Téléphone : +229 XX XX XX XX</li>
                  <li>Chat en direct (heures de bureau)</li>
                </ul>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900">Proposez-vous des formations ?</h3>
                <p class="mt-2 text-gray-600">
                  Oui, nous organisons régulièrement des sessions de formation sur la cybersécurité et l'utilisation de
                  nos outils. Contactez-nous pour plus d'informations.
                </p>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900">Que faire en cas de problème technique ?</h3>
                <p class="mt-2 text-gray-600">
                  En cas de problème technique, consultez d'abord notre guide d'utilisation. Si le problème persiste,
                  contactez notre support technique qui vous assistera dans les plus brefs délais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
