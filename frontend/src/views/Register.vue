<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      // Dati inseriti dall’utente nel form di registrazione
      nome: "",
      cognome: "",
      dataNascita: "",
      codiceFiscale: "",
      pin: "",
      loading: false,
    };
  },
  methods: {
    async goHome() {
  if (this.loading) return;
  
  this.loading = true;
  
  try {
     // Chiamata POST al backend per la registrazione dell’utente
    const response = await axios.post("/auth/register", {
      nome: this.nome,
      cognome: this.cognome,
      data_nascita: this.dataNascita,
      codice_fiscale: this.codiceFiscale,
      pin: this.pin,
    });

    if (response.data.success) {
      // Salva i dati dell'utente nel sessionStorage
      sessionStorage.setItem(
        "loggedUser",
        JSON.stringify(response.data.user)
      );
      
      this.$router.push("/home");
    }
  } catch (error: any) {
    // Gestione degli errori restituiti dal backend
    const message = error.response?.data?.error || "Errore durante la registrazione";
    alert(message);
  } finally {
    this.loading = false;
  }
    },

    goLogin() {
      this.$router.push("/login");
    },
  },
});
</script>

<template>
  <h2 class="title">Inserimento dei dati</h2>
  <div class="form-box">
    <form @submit.prevent="goHome">
      <input type="text" placeholder="Nome" v-model="nome" required />
      <input type="text" placeholder="Cognome" v-model="cognome" required />
      <input type="date" v-model="dataNascita" required />
      <input 
        type="text" 
        placeholder="Codice Fiscale" 
        v-model="codiceFiscale" 
        maxlength="16"
        autocomplete="username"
        required 
      />
      <input 
        type="password" 
        placeholder="PIN (min 4 cifre)" 
        v-model="pin"
        minlength="4"
        autocomplete="new-password"
        required 
      />

      <button 
        type="submit"
        class="primary-btn" 
        :disabled="loading"
      >
        {{ loading ? "Caricamento..." : "Registrati" }}
      </button>
      
      <p class="link" @click="goLogin">HAI GIÀ UN ACCOUNT? LOGIN</p>
    </form>
  </div>
</template>