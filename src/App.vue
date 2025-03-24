<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="semibold">
    

    <div class="wrapper">
      <div class="leftMargin">
        <div class="logo">
            <img src="./assets/images/vinotrip.png" alt="">
            <p class="underlogo colorVino">Créateurs de séjours oenotouristique</p>
        </div>

      </div>

      <nav class="colorVino topmenu">
        <RouterLink class="leftMargin link colorVino" to="/">HOME</RouterLink>|
        <RouterLink class="leftMargin link colorVino" to="/sejours">TOUT NOS SEJOURS</RouterLink>|
        <RouterLink class="leftMargin link colorVino" to="/routedesvins">ROUTE DES VINS</RouterLink>|
        <RouterLink class="leftMargin link colorVino" to="/aide">AIDE</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView class="mainpage" />

  <footer>

    @COPYRIGHT

    <nav>
      <RouterLink class="semibold leftMargin link footerlink" to="/mentions-legales">MENTIONS LÉGALES</RouterLink>
      <RouterLink class="semibold leftMargin link footerlink" to="/politique">POLITIQUE DE CONFIDENTIALITÉ</RouterLink>
      <RouterLink class="semibold leftMargin link footerlink" to="/conditions-vente">CONDITIONS GÉNÉRALES DE VENTE</RouterLink>
      <RouterLink class="semibold leftMargin link footerlink" to="/aide">ASSISTANCE / FAQ</RouterLink>
    </nav>

  </footer>
</template>

<style scoped>



/*************************************************HEADER*******/

.mainpage{
  min-height: 100vh;
}

.topmenu{
  right: 0;
}

.wrapper{
  display:flex;
  right: 0px;
  
  justify-content: space-between; /* Espace entre les éléments */
}

.leftMargin{
    margin: 0 3vw;
}


/*************************************************DISPLAY*******/
.colorVino{
  color: rgba(135,6,76,255);
}
.topmenu .link:hover{
  color:rgb(255, 0, 200);
}


nav{
  margin: 15px;
}


/*************************************************TEXT*******/

.link{
  text-decoration:none ;
}
.link:hover{
  text-decoration: underline;
}
.semibold{
  font-weight: 600;
}

/*************************************************UNDERLOGO*******/

.underlogo{
  font-size: 10px;
  font-weight: 400;
  margin: -15px 0 0 95px;
}


/*************************************************FOOTER*******/

footer{
  background-color:rgb(40,28,28);  
  color: white;
  height: 30vh;
  text-align: center;
  padding: 5px;

}

footer nav{
  justify-content: center;

  display: flex;
  flex-direction:row;
  margin: 4vw;
}

.footerlink{
  color: white;
}
</style>
