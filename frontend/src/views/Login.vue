<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
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
        // Chiamata POST al backend per effettuare il login
        const response = await axios.post("/auth/login", {
          codice_fiscale: this.codiceFiscale,
          pin: this.pin,
        });

        if (response.data.success) {
          //  Salva i dati dell'utente nel sessionStorage
          sessionStorage.setItem(
            "loggedUser",
            JSON.stringify(response.data.user)
          );

          // vai alla home
          this.$router.push("/home");
        } else {
          alert(response.data.error || "Errore nel login");
        }
      } catch (error: any) {
        const message = error.response?.data?.error || "Errore nel login";
        alert(message);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<template>
  <h2 class="title">Login</h2>
  <div class="form-box">
    <form @submit.prevent="goHome">
      <input
        type="text"
        placeholder="Codice Fiscale"
        v-model="codiceFiscale"
        autocomplete="username"
        required
      />

      <input
        type="password"
        placeholder="PIN"
        v-model="pin"
        autocomplete="current-password"
        required
      />

      <button 
        type="submit"
        class="primary-btn" 
        :disabled="loading"
      >
        {{ loading ? "Caricamento..." : "Entra" }}
      </button>
    </form>
  </div>
</template>
