<script setup>
import { ref } from 'vue'
import { CircleCheck, CircleX } from 'lucide-vue-next'
import { useClientStore } from '@/stores/clients'
import '../assets/css/client/connexion.css'
import { watch,onMounted } from 'vue'

const client = useClientStore();
const signupForm = client.signupForm
const signupErrors = client.signupErrors
const loginForm = client.loginForm


const passwordSuccess = ref(null)
const loginError = ref(null)
const showResetPassword = ref(false)
const resetPasswordEmail = ref('')

// Réinitialiser les erreurs quand le composant est monté
onMounted(() => {
  // Réinitialiser toutes les erreurs
  Object.keys(signupErrors).forEach(key => {
    signupErrors[key] = null
  })
})
// Réinitialiser toutes les données du formulaire

Object.keys(signupForm
).forEach(key => {
    signupErrors[key] = null
  })

watch(() => signupForm.prenomclient, () => {
  signupErrors.prenomclient = null;
});

watch(() => signupForm.nomclient, () => {
  signupErrors.nomclient = null;
});

watch(() => signupForm.emailclientconnexion, () => {
  signupErrors.emailclientconnexion = null;
});

watch(() => signupForm.telephoneclient, () => {
  signupErrors.telephoneclient = null;
});

watch(() => signupForm.motdepasseclient, () => {
  signupErrors.motdepasseclient = null;
});

// Pour la date de naissance, vous pouvez surveiller les trois champs
watch([
  () => signupForm.journaissance,
  () => signupForm.moisnaissance,
  () => signupForm.anneenaissance
], () => {
  signupErrors.datenaissanceclient = null;
});

const handleSignup = () => {
  // Réinitialiser les erreurs
  
  signupErrors.value = {
    prenomclient: null,
    nomclient: null,
    emailclient: null,
    motdepasseclient: null,
    datenaissanceclient: null,
    telephoneclient: null
  };
  
  // Vérification de la validité du formulaire
  let isValid = true;
  
  // Validation prénom
  if (!signupForm.prenomclient || signupForm.prenomclient.trim().length < 2) {
    signupErrors.prenomclient = true;
    isValid = false;
  }
  
  // Validation nom
  if (!signupForm.nomclient || signupForm.nomclient.trim().length < 2) {
    signupErrors.nomclient = true;
    isValid = false;
  }
  
  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!signupForm.emailclientconnexion || !emailRegex.test(signupForm.emailclientconnexion)) {
    signupErrors.emailclientconnexion = true;
    isValid = false;
  }
  
  // Validation téléphone
  const phoneRegex = /^0[1-9][0-9]{8}$/;
  if (!signupForm.telephoneclient || !phoneRegex.test(signupForm.telephoneclient)) {
    signupErrors.telephoneclient = true;
    isValid = false;
  }
  
  // Validation mot de passe
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/;
  if (!signupForm.motdepasseclient || !passwordRegex.test(signupForm.motdepasseclient)) {
    signupErrors.motdepasseclient = true;
    isValid = false;
  }
  
  // Validation de l'âge (majeur)
  if (signupForm.journaissance && signupForm.moisnaissance && signupForm.anneenaissance) {
    const birthDate = new Date(
      signupForm.anneenaissance, 
      signupForm.moisnaissance - 1, 
      signupForm.journaissance
    );
    const today = new Date();
    const ageDifMs = today - birthDate;
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    
    if (age < 18) {
      signupErrors.datenaissanceclient = true;
      isValid = false;
    }
  } else {
    signupErrors.datenaissanceclient = true;
    isValid = false;
  }

  if (isValid) {
    client.signup(signupForm);
  }
}
const handleLogin = () => {
  loginError.value = null
  const loginSuccess = client.login(loginForm.emailclientconnexion, loginForm.motdepasseconnexion);
  if (loginSuccess) {
  } else {
    loginError.value = "Échec de connexion. Veuillez vérifier vos identifiants.";
  }
}

const handlePasswordReset = () => {
  passwordSuccess.value = `Un lien de réinitialisation a été envoyé à ${resetPasswordEmail.value}`
  showResetPassword.value = false
}
</script>

<template>
  <main class="container-sm">
    <nav aria-label="breadcrumb">
    </nav>
    
    <div v-if="passwordSuccess" class="alert alert-success">
      <CircleCheck />
      <span>{{ passwordSuccess }}</span>
    </div>

    <div id="conteneur">
      <div>
        <h1>Inscription</h1>
        <hr class="separateur-titre" />

        <form @submit.prevent="handleSignup" id="inscription" class="formulaire">
          <div class="groupe-radio">
            <label>Civilité</label>
            <div class="radios">
              <div class="input-control input-control-radio">
                <input 
                  id="civilitemonsieur" 
                  type="radio" 
                  v-model="signupForm.civiliteclient" 
                  value="M" 
                  autocomplete="off"
                />
                <label for="civilitemonsieur">M</label>
              </div>
              <div class="input-control input-control-radio">
                <input 
                  id="civilitemadame" 
                  type="radio" 
                  v-model="signupForm.civiliteclient" 
                  value="Mme" 
                  autocomplete="off"
                />
                <label for="civilitemadame">Mme</label>
              </div>
            </div>
          </div>

          <div class="input-control input-control-text required">
            <label for="prenomclient">Prénom</label>
            <input 
              id="prenomclient" 
              type="text" 
              v-model="signupForm.prenomclient" 
              placeholder="Prenom" 
              autocomplete="given-name"
            />
            <p v-if="signupErrors.prenomclient" class="alert alert-error">
              <CircleX />Le prénom n'est pas valide !
            </p>
          </div>

          <div class="input-control input-control-text required">
            <label for="nomclient">Nom</label>
            <input 
              id="nomclient" 
              type="text" 
              v-model="signupForm.nomclient" 
              placeholder="Nom" 
              autocomplete="family-name"
            />
            <p v-if="signupErrors.nomclient" class="alert alert-error">
              <CircleX />Le nom n'est pas valide !
            </p>
          </div>

          <div class="input-control input-control-text required">
            <label for="emailinscription">Email</label>
            <input 
              id="emailinscription" 
              type="text" 
              v-model="signupForm.emailclientconnexion" 
              placeholder="prenom.nom@email.com" 
              autocomplete="email"
            />
            <p v-if="signupErrors.emailclientconnexion" class="alert alert-error">
              <CircleX />L'adresse email n'est pas valide !
            </p>
          </div>

          <div class="input-control input-control-text required">
            <label for="telephoneclient">Numéro de téléphone</label>
            <input 
              id="telephoneclient" 
              type="text" 
              v-model="signupForm.telephoneclient" 
              placeholder="0102030405" 
              autocomplete="telephoneclient"
            />
            <p v-if="signupErrors.telephoneclient" class="alert alert-error">
              <CircleX />Le numéro de téléphone n'est pas valide !
            </p>
          </div>

          <div class="input-control input-control-text required">
            <label for="motdepasseinscription">Mot de passe</label>
            <input 
              id="motdepasseinscription" 
              type="password" 
              v-model="signupForm.motdepasseclient" 
              placeholder="M0tD€p@ss3" 
              autocomplete="new-password"
            />
            <p v-if="signupErrors.motdepasseclient" class="alert alert-error">
              <CircleX />
              Le format du mot de passe est invalide, il doit contenir : <br/>
              - Au moins une majuscule et minuscule <br/>
              - Au moins un chiffre <br/>
              - Au moins un caractère spécial <br/>
              - Et faire au moins 12 caractères
            </p>
          </div>

          <div class="input-control input-control-multiselect">
            <label>Date de naissance</label>
            <div class="input-selects">
              <select v-model="signupForm.journaissance" id="journaissance" autocomplete="bday-day">
                <option value="null">-</option>
                <option v-for="jour in 31" :key="jour" :value="jour">
                  {{ jour }}
                </option>
              </select>
              <select v-model="signupForm.moisnaissance" id="moisnaissance" autocomplete="bday-month">
                <option value="null">-</option>
                <option 
                  v-for="(mois, index) in ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']" 
                  :key="mois" 
                  :value="index + 1"
                >
                  {{ mois }}
                </option>
              </select>
              <select v-model="signupForm.anneenaissance" id="anneenaissance" autocomplete="bday-year">
                <option value="null">-</option>
                <option 
                  v-for="annee in Array.from({length: 124}, (_, i) => new Date().getFullYear() - i)" 
                  :key="annee" 
                  :value="annee"
                >
                  {{ annee }}
                </option>
              </select>
            </div>
            <p v-if="signupErrors.datenaissanceclient" class="alert alert-error">
              <CircleX />L'utilisateur doit être majeur !
            </p>
          </div>

          <div class="input-control input-control-checkbox">
            <input 
              type="checkbox" 
              v-model="signupForm.offrespromotionnellesclient" 
              id="offrespromotionnellesclient"
              value="1"
            />
            <label for="offrespromotionnellesclient">
              S'inscrire à la newsletter
            </label>
          </div>

          <button type="submit" class="button">Inscription</button>
        </form>
      </div>

      <div>
        <h1>Connexion</h1>
        <hr class="separateur-titre" />

        <form id="connexion" @submit.prevent="handleLogin" class="formulaire">
          <div class="input-control input-control-text required">
            <p v-if="loginError" class="alert alert-error">
              <CircleX />
              {{ loginError }}
            </p>

            <label for="emailconnexion">Email</label>
            <input 
              id="emailconnexion" 
              type="text" 
              v-model="loginForm.emailclientconnexion" 
              placeholder="prenom.nom@email.com" 
            />
          </div>

          <div class="input-control input-control-text required">
            <label for="motdepasseconnexion">Mot de passe</label>
            <input 
              id="motdepasseconnexion" 
              type="password" 
              v-model="loginForm.motdepasseconnexion" 
              placeholder="M0tD€p@ss3" 
              autocomplete="current-password"
            />
            <a @click="showResetPassword = true" class="link" id="forgot-password">
              Mot de passe oublié ?
            </a>
          </div>

          <button type="submit" class="button">Connexion</button>
        </form>

        <form 
          v-if="showResetPassword" 
          id="reset-password"
          @submit.prevent="handlePasswordReset" 
          class="formulaire"
        >
          <h3>Réinitialisation du mot de passe</h3>
          <div class="input-control input-control-text">
            <label for="reset_email">Adresse E-mail</label>
            <input 
              type="email" 
              v-model="resetPasswordEmail" 
              id="reset_email" 
              required 
              placeholder="prenom.nom@email.com"
            />
          </div>
          <button type="submit" class="button">
            Envoyer le lien de réinitialisation
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>