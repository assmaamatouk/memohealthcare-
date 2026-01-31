<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
// Interfaccia TypeScript per un esame
interface Esame {
  id: number;
  nome_esame: string;
  data: string;
  ora: string;
}

export default defineComponent({
  name: "Esami",
  data() {
    return {
      esami: [] as Esame[],
      isLogged: false,
      nuovoEsame: {
        nome_esame: "",
        data: "",
        ora: "",
      },
      showNewEsame: false,
    };
  },

  mounted() {
    const loggedUserStr = sessionStorage.getItem("loggedUser");
    if (loggedUserStr) {
      this.isLogged = true;
      this.loadEsami();
    } else {
      this.isLogged = false;
      this.$router.push("/login"); // se non loggato, rimanda al login
    }
  },

  methods: {
    goHome() { this.$router.push("/home"); },
    goGestione() { this.$router.push("/gestione"); },
    goProfilo() { this.$router.push("/profilo"); },

    async loadEsami() {
      try {
        const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser")!);
        const res = await axios.get(`http://localhost:3000/api/esami/esami`);
        this.esami = res.data;
      } catch (err) {
        console.error("Errore caricamento esami:", err);
        alert("Errore nel caricamento degli esami");
      }
    },

    async salvaNuovoEsame() {
      if (!this.nuovoEsame.nome_esame || !this.nuovoEsame.data || !this.nuovoEsame.ora) {
        alert("Compila tutti i campi!");
        return;
      }

      try {
        const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser")!);

        await axios.post(`http://localhost:3000/api/esami`, {
          user_id: loggedUser.id,
          ...this.nuovoEsame,
        });

        await this.loadEsami(); // ricarica gli esami dal DB

        this.nuovoEsame = { nome_esame: "", data: "", ora: "" };
        this.showNewEsame = false;
      } catch (err) {
        console.error("Errore salvataggio esame:", err);
        alert("Errore nel salvataggio dell'esame");
      }
    },

    formatDate(dateStr: string) {
      const d = new Date(dateStr);
      return d.toLocaleDateString("it-IT");
    },
  },
});
</script>

<template>
  <h2 class="title">I miei esami</h2>

  <!-- Lista Esami -->
  <div class="cards-container" v-if="esami.length > 0">
    <div v-for="esame in esami" :key="esame.id" class="reminder-card">
      <strong>{{ esame.nome_esame }}</strong>
      <div>{{ formatDate(esame.data) }}</div>
      <div>{{ esame.ora }}</div>
    </div>
  </div>

  <div v-else class="reminder-card">
    Nessun esame inserito
  </div>

  <!-- Nuovo Esame -->
  <div v-if="showNewEsame" class="reminder-card">
    <input type="text" placeholder="Nome esame" v-model="nuovoEsame.nome_esame" />
    <input type="date" v-model="nuovoEsame.data" />
    <input type="time" v-model="nuovoEsame.ora" />

    <div class="primary-btn" @click="salvaNuovoEsame">
      Salva
    </div>
  </div>

  <!-- Pulsante Aggiungi -->
  <div class="add-reminder-btn" @click="showNewEsame = !showNewEsame">
    {{ showNewEsame ? "Annulla" : "Aggiungi esame" }}
  </div>
</template>
