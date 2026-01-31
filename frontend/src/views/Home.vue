<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "Home",
  data() {
    return {
      nomeUtente: "Ospite",
      loading: true,
    };
  },
  async mounted() {
    try {
      // Chiamata GET al backend per ottenere i dati del profilo
      const response = await axios.get("/auth/profile");
      this.nomeUtente = response.data.nome || "Ospite";
    } catch (error) {
      console.error("Errore caricamento profilo:", error);
      this.$router.push("/welcome");
    } finally {
      this.loading = false;
    }
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    goGestione() {
      this.$router.push("/gestione");
    },
    goProfilo() {
      this.$router.push("/profilo");
    },
    goFarmaci() {
      this.$router.push("/farmaci");
    },
    goAppuntamenti() {
      this.$router.push("/appuntamenti");
    },
    goEsami() {
      this.$router.push("/esami");
    },
  },
});
</script>



<template>
   <!-- Titolo con il nome dell'utente -->
    <h1 class="title">CIAO {{ nomeUtente }}</h1>
    <p class="description">
      Qui puoi gestire facilmente farmaci, appuntamenti ed esami, 
      mantenendo tutte le informazioni sulla tua salute in un unico spazio.
    </p>
    <div class="home-container">
      <button class="home-container-btn" @click="goFarmaci">
        I Miei Farmaci
      </button>
      <button class="home-container-btn" @click="goAppuntamenti">
        I Miei Appuntamenti
      </button>
      <button class="home-container-btn" @click="goEsami">
        I Miei Esami
      </button>
    </div>

    
</template>
<style scoped>

    .home-container-btn {
  background-color: #16A28E;
  color: white;
  padding: 25px 30px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  margin: 40px auto;
  text-align: center;
  width: fit-content;       
  min-width: 260px;
  font-size: 18px;
}
.home-container-btn:hover {
  background-color: #14977d;
}
.home-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 40px;
  
}
</style>

