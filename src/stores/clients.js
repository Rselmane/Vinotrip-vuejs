import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'


export const useClientStore = defineStore('clients', () => {

  const signupForm = ref({
    civiliteclient: 'M',
    prenomclient: '',
    nomclient: '',
    emailclientconnexion: '',
    telephoneclient: '',
    motdepasseclient: '',
    journaissance: null,
    moisnaissance: null,
    anneenaissance: null,
    offrespromotionnellesclient: false
  })

  const signupErrors = ref({
    prenomclient: false,
    nomclient: false,
    emailclientconnexion: false,
    telephoneclient :false,
    motdepasseclient: false
  })

  const loginForm = ref({
    emailclientconnexion: '',
    motdepasseconnexion: ''
  })
  
  
  const token = ref(localStorage.getItem('token') || null)
 
  const currentUser = ref(JSON.parse(localStorage.getItem('user')) || null)
  
  const url = "https://vinotrip-dqhfhhd4fyhwdebf.francecentral-01.azurewebsites.net/api/"

  function login(email, password, onSuccess, onError) {
    axios.post(url + 'Login', {
      emailClient: email,
      mdpClient: password
    })
    .then(response => {
      token.value = response.data.token
      currentUser.value = response.data.userDetails

      // Sauvegarder dans le localStorage pour persistance
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(currentUser.value))

      // Configurer axios pour inclure le token dans les requêtes futures
      configureAxiosInterceptor()

      // Appeler le callback de succès
      if (onSuccess) onSuccess()
    })
    .catch(error => {
      console.error('Erreur de connexion:', error)
      token.value = null
      currentUser.value = null

    })
  }
  function signup(formData) {
    // Construire la date de naissance au format YYYY-MM-DD
    const formattedDay = String(formData.journaissance).padStart(2, '0');
    const formattedMonth = String(formData.moisnaissance).padStart(2, '0');
    const dateNaissance = `${formData.anneenaissance}-${formattedMonth}-${formattedDay}`;
    
    // Requête API d'inscription
    axios.post(url + 'Client', {
      civiliteClient: formData.civiliteclient,
      prenomClient: formData.prenomclient,
      nomClient: formData.nomclient,
      emailClient: formData.emailclientconnexion,
      telephoneClient: formData.telephoneClient,
      mdpClient: formData.motdepasseclient,
      dateNaissanceClient: dateNaissance,
      offresPromotionnellesClient: formData.offrespromotionnellesclient ? 1 : 0
    })
    .then(response => {
      // Réinitialiser le formulaire
      signupForm.value = {
        civiliteclient: 'M',
        prenomclient: '',
        nomclient: '',
        emailclientconnexion: '',
        telephoneclient: '',
        motdepasseclient: '',
        journaissance: null,
        moisnaissance: null,
        anneenaissance: null,
        offrespromotionnellesclient: false
      };

    });
  }
  
  // Méthode de déconnexion
  function logout() {
    // Supprimer le token et les informations utilisateur
    token.value = null
    currentUser.value = null
    
    // Supprimer du localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Configuration des intercepteurs axios pour ajouter le token
  function configureAxiosInterceptor() {
    axios.interceptors.request.use(
      config => {
        if (token.value) {
          config.headers['Authorization'] = `Bearer ${token.value}`
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = computed(() => {
    return token.value !== null
  })

  // Vérifier le rôle de l'utilisateur
  const userRole = computed(() => {
    return currentUser.value?.role || null
  })

  // Initialiser l'intercepteur si un token existe déjà
  if (token.value) {
    configureAxiosInterceptor()
  }

  return {
    token,
    currentUser,
    login,
    logout,
    signup,
    isAuthenticated,
    userRole,
    signupForm,
    signupErrors,
    loginForm,
  }
})