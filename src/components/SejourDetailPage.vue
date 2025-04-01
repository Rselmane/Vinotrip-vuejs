<script setup>
import { ref, onMounted } from 'vue'
import { useSejourStore } from '@/stores/sejours'
import { useLocaliteStore } from '@/stores/localite'
import { useRoute } from 'vue-router'
import { Star } from 'lucide-vue-next'

const route = useRoute()
const sejours = useSejourStore()
const sejour = ref(null)
const localites=useLocaliteStore()
onMounted(async () => {
  
  const sejourId = route.params.id
  sejour.value = sejours.selectionSejours.find(s => s.idsejour == sejourId)
})

const calculateAverageNote = (avis) => {
  if (!avis || avis.length === 0) return 0
  const totalNote = avis.reduce((sum, a) => sum + a.noteAvis, 0)
  return (totalNote / avis.length).toFixed(1)
}
</script>

<template>
  <div v-if="sejour" class="sejour-details container">
    <div class="sejour-header">
      <h1>{{ sejour.titresejour }}</h1>
      <div class="note">
        <p class="etoiles">
          <Star 
            v-for="n in 5" 
            :key="n"
            :fill="calculateAverageNote(sejour.avisNavigation) >= n ? 'currentColor' : 'none'"
            :class="{'checked': calculateAverageNote(sejour.avisNavigation) >= n}"
          />
        </p>
        <p class="valeur">
          {{ calculateAverageNote(sejour.avisNavigation) }}/5 
          ({{ sejour.avisNavigation.length }} avis)
        </p>
      </div>
    </div>

    <div class="sejour-content">
      <div class="sejour-image">
        <img 
          :src="`/src/assets/images/sejours/${sejour.photosejour}`" 
          :alt="sejour.titresejour" 
        />
      </div>

      <div class="sejour-info">
        <p class="description">{{ sejour.descriptionsejour }}</p>
        
        <div class="sejour-details">
          <h2>Détails du Séjour</h2>
          <ul>
            <li><strong>Prix:</strong> {{ sejour.prixsejour }}€</li>
            <li><strong>Durée:</strong> {{ sejour.idduree }} jours</li>
            <li v-if="sejour.idlocalite"><strong>Localité:</strong> {{localites.localite(sejour.idlocalite)}}</li>
            <li><strong>Catégorie de Vignoble:</strong> {{ sejour.idcategorievignoble }}</li>
            <li><strong>Type de Séjour:</strong> {{ sejour.idcategoriesejour }}</li>
            <li><strong>Catégorie de Participants:</strong> {{ sejour.idcategorieparticipant }}</li>
          </ul>
        </div>
        <hr>
        <div>
          <h2>Hebergement </h2>
        
        </div>

        <div class="sejour-actions">
          <button class="button-reserver">Réserver ce séjour</button>
          <router-link to="/sejours" class="button-retour">Retour à la liste</router-link>
        </div>
      </div>
    </div>

    <div v-if="sejour.avisNavigation.length > 0" class="sejour-reviews">
      <h2>Avis des Clients</h2>
      <div 
        v-for="avis in sejour.avisNavigation" 
        :key="avis.idavis" 
        class="avis-item"
      >
        <p>{{ avis.commentaireAvis }}</p>
        <div class="avis-details">
          <p>Note: 
            <Star 
              v-for="n in 5" 
              :key="n"
              :fill="avis.noteAvis >= n ? 'currentColor' : 'none'"
            />
          </p>
          <small>{{ avis.dateAvis }}</small>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    Chargement des détails du séjour...
  </div>
</template>

<style scoped>

</style>