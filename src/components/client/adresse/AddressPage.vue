<template>
    <div>
      <header>
        <!-- Include your header here, if any -->
      </header>
  
      <main class="container">
        <breadcrumb-component></breadcrumb-component>
        <h1>Mes adresses</h1>
        <hr class="separateur-titre" />
        
        <div v-if="successMessage" class="alert alert-success">
          <i data-lucide="circle-check-big"></i>{{ successMessage }}
        </div>
  
        <div id="explication">
          <p>
            Choisissez vos adresses de facturation et de livraison.
            Ces dernières seront présélectionnées lors de vos commandes.
            Vous pouvez également ajouter d'autres adresses, ce qui est particulièrement intéressant pour envoyer des
            cadeaux ou recevoir votre commande au bureau.
          </p>
          <p>
            <b>Vos adresses sont listées ci-dessous. </b>
          </p>
          <p>
            Pensez à les tenir à jour si ces dernières venaient à changer.
          </p>
        </div>
  
        <section id="adresses">
          <article v-for="adresse in adresses" :key="adresse.idadresse" class="adresse">
            <h2 class="titre">
              <router-link :to="{ name: 'adresse', params: { id: adresse.idadresse } }">{{ adresse.nomadresse }}</router-link>
            </h2>
            <div class="contenu">
              <hr />
              <p>
                {{ adresse.nomdestinataireadresse }} {{ adresse.prenomdestinataireadresse }}
              </p>
              <p>
                {{ adresse.numadresse }} {{ adresse.rueadresse }}
              </p>
              <p>
                {{ adresse.cpadresse }} {{ adresse.villeadresse }}
              </p>
              <p>
                {{ adresse.paysadresse }}
              </p>
              <a class="button" :href="'/adresse/' + adresse.idadresse">Modifier</a>
              <button class="supprimer button" @click="confirmDelete(adresse.idadresse)">Supprimer</button>
            </div>
          </article>
        </section>
  
        <form v-if="showDeleteConfirmation" @submit.prevent="deleteAdresse" class="overlay">
          <div class="overlay-content">
            <h2>Confirmer la suppression</h2>
            <input type="hidden" v-model="adresseToDelete" />
            <div class="buttons">
              <button type="button" class="button" @click="cancelDelete">Annuler</button>
              <button type="submit" class="button">Supprimer</button>
            </div>
          </div>
        </form>
  
        <a class="ajouter button" :href="createAdresseRoute">Ajouter une adresse</a>
      </main>
  
      <footer>
        <!-- Include your footer here -->
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        adresses: [], // Array to store addresses
        successMessage: '', // Success message from session
        showDeleteConfirmation: false, // Flag to show delete confirmation modal
        adresseToDelete: null, // The adresse id to delete
        createAdresseRoute: '/adresses/create', // Route to add a new address
      };
    },
    mounted() {
      // Fetch data when the component is mounted
      this.fetchAdresses();
      this.fetchSuccessMessage();
    },
    methods: {
      async fetchAdresses() {
        // Fetch the list of adresses from an API or server
        const response = await fetch('/api/adresses');
        this.adresses = await response.json();
      },
      fetchSuccessMessage() {
        // Check if there's a success message (if passed from a session or API)
        this.successMessage = localStorage.getItem('successMessage') || '';
      },
      confirmDelete(idadresse) {
        this.adresseToDelete = idadresse;
        this.showDeleteConfirmation = true;
      },
      cancelDelete() {
        this.showDeleteConfirmation = false;
        this.adresseToDelete = null;
      },
      async deleteAdresse() {
        const response = await fetch('/api/adresse/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idadresse: this.adresseToDelete,
          }),
        });
  
        if (response.ok) {
          // Remove the deleted adresse from the list
          this.adresses = this.adresses.filter(adresse => adresse.idadresse !== this.adresseToDelete);
          this.cancelDelete();
        } else {
          // Handle error
          alert('Error deleting address');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Include your styles here */
  @import '/assets/css/client/adresses.css';
  </style>
  