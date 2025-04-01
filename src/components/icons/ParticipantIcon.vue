<template>
    <component :is="iconComponent" />
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { Heart, UsersRound, Baby } from 'lucide-vue-next'
  
  const props = defineProps({
    participantId: {
      type: Number,
      required: true
    }
  })
  
  const iconComponent = computed(() => {
    switch(props.participantId) {
      case 1: return Heart
      case 2: return UsersRound
      case 3: return Baby
      default: return null
    }
  })
  </script>