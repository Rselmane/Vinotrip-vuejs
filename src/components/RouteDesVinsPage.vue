<script setup>
import { useRouteDesVinsStore } from '@/stores/routedesvins'
import { onMounted } from 'vue'

const routeDesVinsStore = useRouteDesVinsStore()

onMounted(() => {
  console.log('✅ Fetching data from API...')
  routeDesVinsStore.fetchRoutes()
})

const getImageUrl = (photoroute) => {
  try {
    return new URL(`/src/assets/images/routedesvins/${photoroute}`, import.meta.url).href
  } catch (error) {
    console.error('❌ Image not found:', photoroute)
    return ''
  }
}
</script>

<template>
  <section class="routes-container">
    <div class="route-header">
      <h1>Route des Vins</h1>
      <div class="line"></div>
    </div>

    <div class="routes-grid">
      <div v-for="route in routeDesVinsStore.selection" :key="route.idRoute" class="route-card">
        
          <img :src="getImageUrl(route.photoRoute)" alt="Image of {{ route.libRoute }}" class="route-image" />
          <div class="route-info">
            <h2>{{ route.libRoute }}</h2>
            <p>{{ route.descriptionRoute }}</p>
            <a :href="'/routedesvins/' + route.idRoute" class="discover-button">DÉCOUVRIR LA {{ route.libRoute }} </a>
          </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
