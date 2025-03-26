<template>
    <div>
      <header>
        <!-- Include your header here -->
      </header>
  
      <main class="container-sm">
        <breadcrumb-component></breadcrumb-component>
        
        <h1>{{ user ? 'Ajouter Adresse' : 'Ajouter votre première adresse' }}</h1>
        <hr class="separateur-titre" />
  
        <div v-if="successMessage" class="alert alert-success">
          <i data-lucide="circle-check-big"></i>{{ successMessage }}
        </div>
  
        <div id="informations">
          <form @submit.prevent="submitForm" class="formulaire">
            <input v-if="!user" type="hidden" name="prenomclient" :value="prenomclient">
            <input v-if="!user" type="hidden" name="nomclient" :value="nomclient">
            <input v-if="!user" type="hidden" name="emailclient" :value="emailclient">
            <input v-if="!user" type="hidden" name="telephoneclient" :value="telephoneclient">
            <input v-if="!user" type="hidden" name="motdepasseclient" :value="motdepasseclient">
            <input v-if="!user && datenaissanceclient" type="hidden" name="datenaissanceclient" :value="datenaissanceclient">
            <input v-if="!user && offrespromotionnellesclient" type="hidden" name="offrespromotionnellesclient" :value="offrespromotionnellesclient">
            <input v-if="!user && civiliteclient" type="hidden" name="civiliteclient" :value="civiliteclient">
            <input v-if="!user && redirect" type="hidden" name="redirect" :value="redirect">
  
            <!-- Form fields -->
            <div class="input-control input-control-text required">
              <label for="nomadresse">Libellé de l'adresse</label>
              <input id="nomadresse" type="text" v-model="form.nomadresse" />
              <p v-if="errors.nomadresse" class="alert alert-error"><i data-lucide="circle-x"></i>Le nom n'est pas valide !</p>
            </div>
  
            <div class="input-control input-control-text required">
              <label for="nomadressedestinataire">Nom</label>
              <input id="nomadressedestinataire" type="text" v-model="form.nomadressedestinataire" />
              <p v-if="errors.nomadressedestinataire" class="alert alert-error"><i data-lucide="circle-x"></i>Le nom n'est pas valide !</p>
            </div>
  
            <div class="input-control input-control-text required">
              <label for="prenomadressedestinataire">Prénom</label>
              <input id="prenomadressedestinataire" type="text" v-model="form.prenomadressedestinataire" />
              <p v-if="errors.prenomadressedestinataire" class="alert alert-error"><i data-lucide="circle-x"></i>Le prénom n'est pas valide !</p>
            </div>
  
            <!-- Hidden Inputs for Address Fields -->
            <div class="hidden">
              <div id="state" class="address-field autocomplete-container"></div>
              <input id="rueadresse" v-model="form.rueadresse" />
              <input id="villeadresse" v-model="form.villeadresse" />
              <input id="paysadresse" v-model="form.paysadresse" />
            </div>
  
            <div class="input-control input-control-text required">
              <label>Rue</label>
              <div id="street" class="address-field autocomplete-container"></div>
              <p v-if="errors.rueadresse" class="alert alert-error"><i data-lucide="circle-x"></i>La rue n'est pas valide !</p>
            </div>
  
            <div class="input-control input-control-text required">
              <label for="numadresse">Numéro</label>
              <input id="numadresse" type="text" v-model="form.numadresse" class="geoapify-autocomplete-input small-input" />
              <p v-if="errors.numadresse" class="alert alert-error"><i data-lucide="circle-x"></i>Le numéro n'est pas valide !</p>
            </div>
  
            <div class="input-control input-control-text required">
              <label for="cpadresse">Code Postal</label>
              <input id="cpadresse" type="text" v-model="form.cpadresse" class="geoapify-autocomplete-input small-input" />
              <p v-if="errors.cpadresse" class="alert alert-error"><i data-lucide="circle-x"></i>Le code postal n'est pas valide !</p>
            </div>
  
            <div class="input-control input-control-text required">
              <label>Ville</label>
              <div id="city" class="address-field autocomplete-container" ></div>
              <p v-if="errors.villeadresse" class="alert alert-error"><i data-lucide="circle-x"></i>La ville n'est pas valide !</p>
            </div>
  
            <div class="input-control input-control-text required">
              <label>Pays</label>
              <div id="country" class="address-field autocomplete-container"></div>
              <p v-if="errors.paysadresse" class="alert alert-error"><i data-lucide="circle-x"></i>Le pays n'est pas valide !</p>
            </div>
  
            <div id="message"></div>
  
            <input value="Enregistrer" class="button" type="submit" />
          </form>
        </div>
      </main>
  
      <footer>
        <!-- Include your footer here -->
      </footer>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null, // Represents the authenticated user, if any
        form: {
          nomadresse: '',
          nomadressedestinataire: '',
          prenomadressedestinataire: '',
          rueadresse: '',
          villeadresse: '',
          paysadresse: '',
          numadresse: '',
          cpadresse: '',
        },
        errors: {},
        successMessage: '',
        // Form hidden values (if needed)
        prenomclient: '',
        nomclient: '',
        emailclient: '',
        telephoneclient: '',
        motdepasseclient: '',
        datenaissanceclient: '',
        offrespromotionnellesclient: '',
        civiliteclient: '',
        redirect: '',
      };
    },
    mounted() {
      this.fetchUser();
      this.fetchSuccessMessage();
      this.initGeoapify(); // Initialize Geoapify for address autocomplete
    },
    methods: {
      async fetchUser() {
        // Get the authenticated user (replace with your API call)
        const response = await axios.get('/api/user');
        this.user = response.data;
      },
      fetchSuccessMessage() {
        // Retrieve any success message from localStorage or session
        this.successMessage = localStorage.getItem('successMessage') || '';
      },
      initGeoapify() {
        // Initialize Geoapify autocomplete (you can adjust it as needed)
        new Geoapify.GeocoderAutocomplete('#street', {
          lang: 'fr',
          placeholder: 'Entrez votre adresse...',
          countryCodes: 'fr',
          type: 'address',
          limit: 5,
        });
      },
      async submitForm() {
        try {
          const apiUrl = this.user ? '/api/adresse/add' : '/api/adresse/first';
          const response = await axios.post(apiUrl, this.form);
          if (response.data.success) {
            this.successMessage = response.data.message;
            localStorage.setItem('successMessage', this.successMessage);
          }
        } catch (error) {
          this.errors = error.response.data.errors || {};
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Include your styles here */
  @import '/assets/css/client/connexion.css';
  </style>
  