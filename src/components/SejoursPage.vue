<script setup>
import { useSejoursStore } from '@/stores/sejours_';
import { Star } from 'lucide-vue-next';
import '../assets/css/sejour/sejours.css'
import { onMounted, computed, ref } from 'vue';

const sejoursStore = useSejoursStore();
const filters = ref({
  vignoble: '',
  localite: '',
  duree: '',
  participant: '',
  envies: ''
});

onMounted(() => {
  sejoursStore.fetchSejours();
});

const filteredSejours = computed(() => {
  return sejoursStore.sejours.filter(sejour => {
    return (
      (!filters.value.vignoble || sejour.idcategorievignoble == filters.value.vignoble) &&
      (!filters.value.localite || (sejour.localite && sejour.localite.idlocalite == filters.value.localite)) &&
      (!filters.value.duree || sejour.idduree == filters.value.duree) &&
      (!filters.value.participant || sejour.categorieparticipant.idcategorieparticipant == filters.value.participant) &&
      (!filters.value.envies || sejour.idcategoriesejour == filters.value.envies)
    );
  });
});
</script>

<template>
  <div v-if="loading">Chargement...</div>
  <div v-else-if="error">Erreur : {{ error.message }}</div>
  <div class="container container-sjr">
    <h1>Liste des Séjours</h1>
    <div class="filters">
      <select v-model="filters.vignoble">
        <option value="">Tous les vignobles</option>
        <option v-for="vignoble in sejoursStore.fetchVignobles" :key="vignoble.idcategorievignoble">{{vignoble.libellecategorievignoble  }}</option>
      </select>
      <select v-model="filters.localite">
        <option value="">Toutes les localités</option>
        <option value="1">Localité X</option>
        <option value="2">Localité Y</option>
      </select>
      <select v-model="filters.duree">
        <option value="">Toutes les durées</option>
        <option value="3">3 jours</option>
        <option value="5">5 jours</option>
      </select>
      <select v-model="filters.participant">
        <option value="">Tous les participants</option>
        <option value="1">Solo</option>
        <option value="2">Famille</option>
      </select>
      <select v-model="filters.envies">
        <option value="">Toutes les envies</option>
        <option value="1">Aventure</option>
        <option value="2">Détente</option>
      </select>
    </div>

    <section id="sejours">
      <div class="routes-grid">
        <div v-for="sejour in filteredSejours" :key="sejour.idsejour" class="sejour">
          <img class="sejours-img" :src="`/src/assets/images/routedesvins/ALSACE.png`" alt="Image du séjour" />
          <div>
            <h2><router-link :to="{ name: 'Sejour', params: { id: sejour.idsejour } }">{{ sejour.titresejour }}</router-link></h2>
            <p>{{ sejour.descriptionsejour }}</p>
            <p><strong>Prix:</strong> {{ sejour.prixsejour }}€</p>
            <p><strong>Durée:</strong> {{ sejour.idduree }} jours</p>
            <div class="note">
              <p class="etoiles">
                <Star 
                  v-for="n in 5" 
                  :key="n"
                  :fill="sejoursStore.calculateAverageNote(sejour.avisNavigation) >= n ? 'currentColor' : 'none'"
                  :class="{'checked': sejoursStore.calculateAverageNote(sejour.avisNavigation) >= n}"
                />
              </p>
              <p class="valeur">{{ sejoursStore.calculateAverageNote(sejour.avisNavigation) }}/5 ({{ sejour.avisNavigation.length }} avis)</p>
            
            </div>
            <router-link :to="{ name: 'Sejour', params: { id: sejour.idsejour } }" class="button-decouvrir">
              Découvrir l'offre
            </router-link>
          </div>
        </div>
    </div>
    </section>
  </div>
</template>

<style scoped>

</style>