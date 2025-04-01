import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useSejoursStore = defineStore('sejour', () => {
  const url = "https://vinotrip-dqhfhhd4fyhwdebf.francecentral-01.azurewebsites.net/"
  
  // State
  const sejours = ref([])
  const currentSejour = ref(null)
  const sejoursHistory = ref([])
  const sejoursLikes = ref([])
  const loading = ref(false)
  const error = ref(null)
  const vignobles = ref([])
  const localites = ref([])
  const durees = ref([])
  const categoriesParticipants = ref([])
  const categoriesEnvies = ref([])


  // Fetch all sejours
  const fetchSejours = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(url + "api/Sejours")
      sejours.value = response.data.filter(sejour => sejour.publie === true)
    } catch (err) {
      error.value = err
      console.error("Erreur lors de la récupération des séjours :", err)
    } finally {
      loading.value = false
    }
  }

  // Fetch a single sejour by ID
  const fetchSejour = async (idsejour) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${url}api/Sejours/${idsejour}`)
      currentSejour.value = response.data
      
      // Update history
      updateSejourHistory(idsejour)
      
      // Fetch similar sejours
      await fetchSimilarSejours(response.data)
    } catch (err) {
      error.value = err
      console.error(`Erreur lors de la récupération du séjour ${idsejour} :`, err)
    } finally {
      loading.value = false
    }
  }

  // Update sejour history
  const updateSejourHistory = (idsejour) => {
    // Limit history to 5 most recent sejours
    const history = [...sejoursHistory.value]
    const index = history.indexOf(idsejour)
    
    if (index !== -1) {
      history.splice(index, 1)
    }
    
    history.push(idsejour)
    sejoursHistory.value = history.slice(-5)
  }

  // Fetch similar sejours
  const fetchSimilarSejours = async (sejour) => {
    try {
      const response = await axios.get(url + "api/Sejours")
      sejoursLikes.value = response.data.filter(s => 
        s.idcategorievignoble === sejour.idcategorievignoble &&
        s.idsejour !== sejour.idsejour &&
        s.idcategoriesejour === sejour.idcategoriesejour
      ).slice(0, 4)
    } catch (err) {
      console.error("Erreur lors de la récupération des séjours similaires :", err)
    }
  }

  // Computed Properties
  const selectionSejours = computed(() => {
    return sejours.value.filter(sejour => sejour.publie === true)
  })

  // Actions for creating/updating sejours (would require backend API integration)
  const createSejour = async (sejourData) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post(url + "api/Sejours", sejourData)
      sejours.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err
      console.error("Erreur lors de la création du séjour :", err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateSejour = async (idsejour, sejourData) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.put(`${url}api/Sejours/${idsejour}`, sejourData)
      const index = sejours.value.findIndex(s => s.idsejour === idsejour)
      if (index !== -1) {
        sejours.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err
      console.error(`Erreur lors de la mise à jour du séjour ${idsejour} :`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Calculate average note for a sejour
  const calculateAverageNote = (avis) => {
    if (!avis || avis.length === 0) return 0
    const totalNote = avis.reduce((sum, a) => sum + a.noteAvis, 0)
    return (totalNote / avis.length).toFixed(1)
  }

  // Search and filter methods
  const searchSejours = (filters) => {
    return computed(() => {
      return sejours.value.filter(sejour => {
        return (
          (!filters.vignoble || sejour.idcategorievignoble == filters.vignoble) &&
          (!filters.localite || (sejour.idlocalite && sejour.idlocalite == filters.localite)) &&
          (!filters.duree || sejour.idduree == filters.duree) &&
          (!filters.participant || sejour.idcategorieparticipant == filters.participant) &&
          (!filters.envies || sejour.idcategoriesejour == filters.envies)
        )
      })
    })
  }


/*----------------------------------------------------------*/
const fetchVignobles = async () => {
  try {
    const response = await axios.get(url + "api/CategorieVignoble")
    vignobles.value = response.data
  } catch (err) {
    console.error("Erreur lors de la récupération des vignobles :", err)
  }
}

const fetchLocalites = async () => {
  try {
    const response = await axios.get(url + "api/Localite")
    localites.value = response.data
  } catch (err) {
    console.error("Erreur lors de la récupération des localités :", err)
  }
}

const fetchDurees = async () => {
  try {
    const response = await axios.get(url + "api/Duree")
    durees.value = response.data
  } catch (err) {
    console.error("Erreur lors de la récupération des durées :", err)
  }
}

const fetchCategoriesParticipants = async () => {
  try {
    const response = await axios.get(url + "api/CategorieParticipant")
    categoriesParticipants.value = response.data
  } catch (err) {
    console.error("Erreur lors de la récupération des catégories de participants :", err)
  }
}

const fetchCategoriesEnvies = async () => {
  try {
    const response = await axios.get(url + "api/CategorieSejour")
    categoriesEnvies.value = response.data
  } catch (err) {
    console.error("Erreur lors de la récupération des catégories d'envies :", err)
  }
}

  

  return { 
    sejours,
    currentSejour,
    sejoursHistory,
    sejoursLikes,
    loading,
    error,
    fetchSejours,
    fetchSejour,
    selectionSejours,
    createSejour,
    updateSejour,
    calculateAverageNote,
    searchSejours,
    vignobles,
    localites,
    durees,
    categoriesParticipants,
    categoriesEnvies,
    fetchVignobles,
    fetchLocalites,
    fetchDurees,
    fetchCategoriesParticipants,
    fetchCategoriesEnvies
  }
})