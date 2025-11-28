En se basant sur pages\vigitech-public.vue
components/vigitech/AnonymousReportModal.vue - Pour le signalement anonyme
components/vigitech/PublicIncidentDetailsModal.vue - Pour les détails publics avec commentaires
components/vigitech/CommentModal.vue - Pour ajouter des commentaires


<div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
            <input v-model="filters.sector" type="text" placeholder="Banque, Santé..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border" />
          </div>

          doit etre liste deroulante