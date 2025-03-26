import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Sejours from '@/components/Sejours.vue'

export const useSejourStore = defineStore('avis', () => {
  const list = ref([])
  const url = "https://apivinotripv1-dad8bqb3arhjecaj.francecentral-01.azurewebsites.net/api/Sejours/"
  
  axios.get(url + "GetAllAvis", {
    params: {
      limit: 5
    }
  }).then(response => {
    list.value = response.data
  }).catch(error => {
    console.error(error)
  })
  
  const selection = computed(() => {
    return list.value.filter(b => b.avisNavigation.length > 0).slice(0, 5)
})
  const calculateAverageNote = (avis) => {
    if (!avis || avis.length === 0) {
       return 0
    }
    
    let totalNote = 0
    for (let i = 0; i < avis.length; i++) {
      const rating = avis[i].noteAvis
      totalNote += rating
    }
    
    return (totalNote / avis.length)
  }
  
  return { list,selection, calculateAverageNote }
})