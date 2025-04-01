<script setup>
import { useSejourStore } from '@/stores/sejours'
import { Star } from 'lucide-vue-next'
import '../assets/css/welcome.css'

const sejours = useSejourStore()
defineProps({
  sejour: {
    type: Object,
  },
})


</script>

<template>
  <main class="container-sm">
    <h1>Tous les avis</h1>
    <hr id="ligne">
    <section id="avis">
      <article v-for="sejour in sejours.selectionavis" :key="sejour.idSejour" class="avis">
        <a class="titre-avis" :href="'/sejour/' + sejour.idsejour">
          {{ sejour.titresejour }}
        </a>
        
        <div class="note">
          <p class="etoiles">
            <Star 
              v-for="n in 5" 
              :key="n"
              :fill="sejours.calculateAverageNote(sejour.avisNavigation) >= n ? 'currentColor' : 'none'"
              :class="{'checked': sejours.calculateAverageNote(sejour.avisNavigation) >= n}"
            />
          </p>
          <p class="valeur">{{ sejours.calculateAverageNote(sejour.avisNavigation).toFixed(1) }}/5 ({{ sejour.avisNavigation.length }} avis)</p>
        </div>
        
        <div class="exemple-avis" v-if="sejour.avisNavigation && sejour.avisNavigation.length > 0">
          <p class="titre-exemple">{{ sejour.avisNavigation[0].titreAvis }}</p>
          <p class="description-exemple">{{ sejour.avisNavigation[0].descriptionAvis }}</p>
        </div>
      </article>
      
      <div class="buttons">
        <a class="button" href="/avis">Découvrir tous les avis</a>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Vos styles CSS ici */
</style>