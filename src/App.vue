<script setup>
// Import de RouterLink
import { RouterLink,RouterView } from 'vue-router'
import { 
  Star, 
  Map, 
  Route, 
  LifeBuoy, 
  CircleUserRound, 
  ShoppingCart 
} from 'lucide-vue-next'
</script>

<template>
  <header>
    <div id="header-content" class="container">
      <RouterLink id="header-logo"  to="./">
        <img src="./assets/images/vinotrip.png" alt="" class="logo">
        <span class="text">Créateurs de séjours oenotouristiques</span>
      </RouterLink>
      <nav>
        <li>
          <RouterLink to="/sejours">
            <Map size="20" />
            Tous nos Séjours
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/routedesvins">
            <Route size="20" />
            Routes des Vins
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/aide">
            <LifeBuoy size="20" />
            Aide
          </RouterLink>
        </li>
        <div class="separator"></div>
      </nav>
    </div>
  </header>
  <RouterView />

  <footer>



      <RouterLink class="semibold leftMargin link footerlink" to="/mentions-legales">MENTIONS LÉGALES</RouterLink>
      <RouterLink class="semibold leftMargin link footerlink" to="/politique">POLITIQUE DE CONFIDENTIALITÉ</RouterLink>
      <RouterLink class="semibold leftMargin link footerlink" to="/conditions-vente">CONDITIONS GÉNÉRALES DE VENTE</RouterLink>
      <RouterLink class="semibold leftMargin link footerlink" to="/aide">Aide</RouterLink>
    

  </footer>
</template>

<style scoped>
footer {
    background-color: #241c1c;
    color: white;
    font-weight: bold;
    height: 6rem;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    display: flex;
    text-transform: uppercase;
}

footer a {
    color: inherit;
    text-decoration: underline dotted;
    font-family: 300;
}

footer a:hover {
    text-decoration: underline solid;
}
</style>