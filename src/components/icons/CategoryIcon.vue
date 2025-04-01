<template>
    <component :is="iconComponent" />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { Landmark, CookingPot, Volleyball, Flower } from 'lucide-vue-next'
  
  const props = defineProps({
    categoryId: {
      type: Number,
      required: true
    }
  })
  const iconComponent = computed(() => {
  switch(props.categoryId) {
    case 1: return Landmark
    case 2: return CookingPot
    case 3: return Volleyball
    case 4: return Flower
    default: return null
  }
})
</script>
