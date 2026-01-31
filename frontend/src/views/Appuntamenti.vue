<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
// Interfaccia TypeScript per un appuntamento
interface Appuntamento {
  id: number;
  titolo: string;
  data: string;
  ora: string;
  note: string;
}

export default defineComponent({
  name: "Appuntamenti",
  data() {
    return {
      appuntamenti: [] as Appuntamento[],
      isLogged: false,
      showNewAppuntamento: false,
      nuovoAppuntamento: {
        titolo: "",
        data: "",
        ora: "",
        note: "",
      },
    };
  },

  mounted() {
    const loggedUserStr = sessionStorage.getItem("loggedUser");
    if (loggedUserStr) {
      this.isLogged = true;
      this.loadAppuntamenti();
    } else {
      this.isLogged = false;
      this.$router.push("/login"); // se non loggato, rimanda al login
    }
  },

  methods: {
    goHome() { this.$router.push("/home"); },
    goGestione() { this.$router.push("/gestione"); },
    goProfilo() { this.$router.push("/profilo"); },

    async loadAppuntamenti() {
      try {
        const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser")!);
        const res = await axios.get(`http://localhost:3000/api/appointments`);
        // formatta la data per visualizzazione
        this.appuntamenti = res.data.map((a: Appuntamento) => ({
          ...a,
          data: a.data.split("T")[0], // se il backend restituisce ISO string
        }));
      } catch (err) {
        console.error("Errore caricamento appuntamenti:", err);
        alert("Errore nel caricamento degli appuntamenti");
      }
    },

    async salvaNuovoAppuntamento() {
      if (!this.nuovoAppuntamento.titolo || !this.nuovoAppuntamento.data || !this.nuovoAppuntamento.ora) {
        alert("Compila tutti i campi!");
        return;
      }

      try {
        const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser")!);
        await axios.post("http://localhost:3000/api/appointments", {
          user_id: loggedUser.id,
          ...this.nuovoAppuntamento,
        });

        await this.loadAppuntamenti(); // ricarica gli appuntamenti

        this.nuovoAppuntamento = { titolo: "", data: "", ora: "", note: "" };
        this.showNewAppuntamento = false;
      } catch (err) {
        console.error("Errore salvataggio appuntamento:", err);
        alert("Errore nel salvataggio dell'appuntamento");
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
  <h2 class="title">I miei appuntamenti</h2>

  <!-- Lista Appuntamenti -->
  <div v-if="appuntamenti.length > 0">
    <div v-for="app in appuntamenti" :key="app.id" class="reminder-card">
      <strong>{{ app.titolo }}</strong>
      <div>{{ formatDate(app.data) }} - {{ app.ora }}</div>
      <div class="note" v-if="app.note">{{ app.note }}</div>
    </div>
  </div>

  <div v-else class="reminder-card">
    Nessun appuntamento inserito
  </div>

  <!-- Nuovo Appuntamento -->
  <div v-if="showNewAppuntamento" class="reminder-card">
    <input type="text" placeholder="Titolo" v-model="nuovoAppuntamento.titolo" />
    <input type="date" v-model="nuovoAppuntamento.data" />
    <input type="time" v-model="nuovoAppuntamento.ora" />
    <input type="text" placeholder="Note (opzionale)" v-model="nuovoAppuntamento.note" />

    <div class="primary-btn" @click="salvaNuovoAppuntamento">
      Salva
    </div>
  </div>

  <!-- Pulsante Aggiungi -->
  <div class="add-reminder-btn" @click="showNewAppuntamento = !showNewAppuntamento">
    {{ showNewAppuntamento ? "Annulla" : "Aggiungi appuntamento" }}
  </div>
</template>
