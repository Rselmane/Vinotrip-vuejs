<template>
    <component :is="iconComponent" />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { LandPlot, Leaf, PartyPopper } from 'lucide-vue-next'
  
  const props = defineProps({
    themeId: {
      type: Number,
      required: true
    }
  })
  
  const iconComponent = computed(() => {
    switch(props.themeId) {
      case 3: return LandPlot
      case 5: return Leaf
      case 6: return PartyPopper
      default: return null
    }
  })
  </script>
  