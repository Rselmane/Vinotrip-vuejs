<template>
  <div>
    <h1>Quelques avis de voyageurs</h1>
    <hr id="ligne">
    <section id="avis">
      <div v-for="(sejour, index) in listeSejour" :key="sejour.idsejour">
        <article class="avis">
          <a class="titre-avis" :href="'/sejour/' + sejour.idsejour">{{ sejour.titresejour }}</a>
          
          <div class="note">
            <p class="etoiles">
              <i v-for="n in 5" :key="n" 
                 data-lucide="star" 
                 fill="currentColor" 
                 :class="{'checked': note >= n}">
              </i>
            </p>
            <p class="valeur">{{ note }}/5 ({{ sejour.avis.length }} avis)</p>
          </div>

          <div class="exemple-avis">
            <p class="titre-exemple">{{ sejour.avis[0].titreavis }}</p>
            <p class="description-exemple">{{ sejour.avis[0].descriptionavis }}</p>
          </div>
        </article>
      </div>
      
      <div class="buttons">
        <a class="button" href="/avis">Découvrir tous les avis</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Définir les props qui contiendront les données des séjours et des avis.
defineProps({
  listeSejour: {
    type: Array,
    required: true,
  },
})

// Calculer la moyenne des notes pour chaque séjour
const calculateAverageNote = (avis) => {
  if (avis.length === 0) return 0
  const totalNote = avis.reduce((acc, curr) => acc + curr.noteavis, 0)
  return (totalNote / avis.length).toFixed(1)
}

// Variable reactive pour gérer la note
const note = computed(() => {
  return (sejour) => {
    return calculateAverageNote(sejour.avis)
  }
})
</script>

<style scoped>
</style>
