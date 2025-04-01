import { ref, computed } from 'vue' 
import { defineStore } from 'pinia'
import axios from 'axios'

export const useSejourStore = defineStore('sejour', () => {
  const list = ref([]) // Liste des avis
  const listtousavis=ref([])

  const url = "https://vinotrip-dqhfhhd4fyhwdebf.francecentral-01.azurewebsites.net/"

  // Récupération des avis
  axios.get(url + "api/Sejours/GetAllAvis", {
    params: { limit: 5 }
  }).then(response => {
    list.value = response.data
  }).catch(error => {
    console.error("Erreur lors de la récupération acceuil des avis :", error)
  })

  axios.get(url + "api/Sejours/GetAllAvis", {
  }).then(response => {
    listtousavis.value = response.data
  }).catch(error => {
    console.error("Erreur lors de la récupération de tous les sejours avec les avis :", error)
  })
  
  // Sélection des avis avec des commentaires
  const selection = computed(() => {
    return list.value.filter(b => b.avisNavigation?.length > 0).slice(0, 5)
  })

  // Sélection des séjours selon certains critères
  const selectionSejours = computed(() => {
    return listtousavis.value
  })

  // Calcul de la moyenne des notes des avis
  const calculateAverageNote = (avis) => {
    if (!avis || avis.length === 0) return 0

    let totalNote = avis.reduce((sum, a) => sum + a.noteAvis, 0)
    return totalNote / avis.length
  }




  return { 
    list, 
    selection, 
    calculateAverageNote, 
    selectionSejours
  }
})