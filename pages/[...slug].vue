<template>
  <div class="error-page">
    <main class="wrapper">
      <section class="card">
        <div class="illustration" aria-hidden="true">
          <img 
            src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-available-illustration-svg-png-download-7706458.png" 
            alt="Page 404 non disponible"
            style="max-width:100%; height:auto;"
          />
        </div>

        <div class="content">
          <h1>{{ statusText }}</h1>
          <p class="desc">Oups ! La page que vous cherchez semble être protégée par notre firewall ou elle n'existe pas encore.</p>

          <div class="actions">
            <button @click="goHome" class="btn primary">Retour à l'accueil</button>
            <button @click="goBack" class="btn ghost">Retour</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({ error: { type: Object, required: false }, statusCode: { type: [Number, String], required: false } })

const router = useRouter()

const status = props.statusCode || (props.error && props.error.statusCode) || 404
const statusText = status === 404 ? "Page introuvable" : `Erreur ${status}`

function goHome () {
  router.push('/')
}
function goBack () {
  if (window.history.length > 1) window.history.back()
  else router.push('/')
}
</script>

<style scoped>
:root{--bg:#f7fafc;--card:#ffffff;--muted:#6b7280;--accent:#111827}
.error-page{min-height:70vh;display:flex;align-items:center;justify-content:center;padding:40px;background:var(--bg)}
.wrapper{width:100%;max-width:980px}
.card{display:flex;gap:28px;background:var(--card);border-radius:12px;padding:28px;box-shadow:0 8px 20px rgba(17,24,39,0.06);align-items:center}
.illustration{flex:0 0 240px;display:flex;align-items:center;justify-content:center}
.content{flex:1}
h1{font-size:28px;margin:0 0 8px;color:var(--accent)}
.desc{margin:0 0 18px;color:var(--muted)}
.actions{display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap}
.btn{padding:8px 14px;border-radius:8px;border:1px solid transparent;cursor:pointer;font-weight:600}
.btn.primary{background:#111827;color:#fff}
.btn.ghost{background:transparent;border-color:#e5e7eb;color:var(--accent)}

@media (max-width:700px){
  .card{flex-direction:column;align-items:flex-start}
  .illustration{width:100%}
}
</style>
