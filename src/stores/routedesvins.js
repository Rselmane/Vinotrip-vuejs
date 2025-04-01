import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useRouteDesVinsStore = defineStore('routedesvins', () => {
  const list = ref([])
  const url = "https://vinotrip-dqhfhhd4fyhwdebf.francecentral-01.azurewebsites.net/api/RouteDesVins"

  const fetchRoutes = async () => {
    try {
      console.log('✅ Fetching data from API...')
      
      const response = await axios.get(url, { 
        params: { limit: 5 }
      })
      
     
      
      if (response.data && Array.isArray(response.data)) {
        list.value = response.data
        console.log('✅ Data successfully stored in list:', list.value)
      } else {
        console.error('❌ Unexpected response format:', response.data)
      }
    } catch (error) {
      console.error('🚨 Error fetching data from API:', error)
    }
  }

  const selection = computed(() => list.value)

  return { list, selection, fetchRoutes }
})
