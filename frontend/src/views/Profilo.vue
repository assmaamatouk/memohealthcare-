<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Profilo",
  data() {
    return {
      user: {
        id: null as number | null,
        nome: "",
        cognome: "",
        data_nascita: "",
        codice_fiscale: "",
        pin: "",
      },
      isLogged: false,
      loading: true,
    };
  },

  mounted() {
    // Recupera l’utente salvato nella sessione
    const loggedUser = sessionStorage.getItem("loggedUser");

    if (loggedUser) {
      this.isLogged = true;
      const u = JSON.parse(loggedUser);
      this.user.id = u.id;
      // Carica i dati aggiornati dal backend
      this.loadUser();
    } else {
      this.isLogged = false;
      this.loading = false;
    }
  },

  methods: {
     // Recupera i dati del profilo dell’utente dal backend
    async loadUser() {
      if (!this.user.id) return;

      try {
        // Recupera il token di autenticazione
        const token = sessionStorage.getItem("token");
        // Chiamata GET per ottenere i dati dell’utente autenticato
        const res = await axios.get(`/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const user = res.data;
        // Aggiorna i dati del profilo
        this.user = { ...this.user, ...user, pin: "" };
      } catch (error) {
        console.error("Errore loadUser:", error);
        alert("Errore nel caricamento del profilo");
      } finally {
        this.loading = false;
      }
    },

    async salvaProfilo() {
      if (!this.user.id) return;

      try {
        const token = sessionStorage.getItem("token");
          // Chiamata PUT per aggiornare i dati dell’utente
        await axios.put(`/users/me`, this.user, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Aggiorna i dati salvati nella sessione
        sessionStorage.setItem("loggedUser", JSON.stringify(this.user));
        alert("Profilo aggiornato con successo ✅");
        this.user.pin = "";
      } catch (error) {
        console.error("Errore salvaProfilo:", error);
        alert("Errore nel salvataggio del profilo");
      }
    },

    goHome() { this.$router.push("/home"); },
    goGestione() { this.$router.push("/gestione"); },
  },
});
</script>

<template>
  <div v-if="loading" class="title">Caricamento...</div>

  <div v-else>
    <h2 class="title">Il mio profilo</h2>

    <div v-if="isLogged" class="form-box">
      <form @submit.prevent="salvaProfilo">
        <input type="text" placeholder="Nome" v-model="user.nome" />
        <input type="text" placeholder="Cognome" v-model="user.cognome" />
        <input type="date" v-model="user.data_nascita" />
         <!-- Codice fiscale non modificabile -->
        <input 
          type="text" 
          placeholder="Codice fiscale" 
          v-model="user.codice_fiscale" 
          readonly 
        />
        <input 
          type="password" 
          placeholder="Nuovo PIN (lascia vuoto per non modificare)" 
          v-model="user.pin"
          autocomplete="new-password"
        />

        <button type="submit" class="primary-btn">Salva modifiche</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-box input {
  text-align: center;
}
</style>
