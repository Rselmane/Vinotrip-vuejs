import { ref, computed } from 'vue' 
import { defineStore } from 'pinia'
import axios from 'axios'

export const useLocaliteStore = defineStore('localite', () => {
  const list = ref([]) // Liste des avis
  

  const url = "https://vinotrip-dqhfhhd4fyhwdebf.francecentral-01.azurewebsites.net/"

  // Récupération des avis
  axios.get(url + "api/Localite", {
  }).then(response => {
    list.value = response.data
  }).catch(error => {
    console.error("Erreur lors de la récupération des avis :", error)
  })

  const localite = computed(() => {
    return (idlocalite) => {
      return list.value.find(l => l.idlocalite === idlocalite)
    }  
  })
  const selection = computed(() => {return list.value})



  return { 
    list, 
    selection,
    localite
  }
})