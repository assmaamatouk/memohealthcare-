<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
// Interfaccia TypeScript per un promemoria
interface Reminder {
  id: number;
  farmaco: string;
  frequenza: string;
  orario: string;
}

export default defineComponent({
  name: "Promemoria",
  data() {
    return {
      reminders: [] as Reminder[],
      isLogged: false,
      nuovoPromemoria: { // dati del nuovo promemoria da aggiungere
        nome: "",
        frequenza: "",
        orari: [] as string[],
      },
      showNewPromemoria: false,
    };
  },

  mounted() {
    const loggedUserStr = sessionStorage.getItem("loggedUser");
    if (loggedUserStr) {
      this.isLogged = true;
      this.loadReminders();
    } else {
      this.isLogged = false;
      this.$router.push("/login"); // se non loggato, rimanda al login
    }
  },

  computed: {
  groupedReminders() {
    const map: Record<string, { farmaco: string; frequenza: string; orari: string[] }> = {};

    this.reminders.forEach(r => {
      // Se non esiste, crea l’oggetto; poi aggiunge l’orario
      (map[r.farmaco] ??= { farmaco: r.farmaco, frequenza: r.frequenza, orari: [] })
        .orari.push(r.orario);
    });

    return Object.values(map);
  },

  numeroOrari(): number {
    if (this.nuovoPromemoria.frequenza === "1 volta al giorno") return 1;
    if (this.nuovoPromemoria.frequenza === "2 volte al giorno") return 2;
    if (this.nuovoPromemoria.frequenza === "3 volte al giorno") return 3;
    return 0;
  },
},


  methods: {
    async loadReminders() {
      try {
        const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser")!);
        const response = await axios.get(`http://localhost:3000/api/reminders/user`);
        this.reminders = response.data;
      } catch (err) {
        console.error("Errore caricamento promemoria:", err);
        alert("Errore nel caricamento dei promemoria");
      }
    },

    onFrequenzaChange() {
      this.nuovoPromemoria.orari = Array(this.numeroOrari).fill("");
    },

    async salvaNuovoPromemoria() {
      if (!this.nuovoPromemoria.nome || !this.nuovoPromemoria.frequenza || this.nuovoPromemoria.orari.some(o => !o)) {
        alert("Compila tutti i campi!");
        return;
      }

      try {
        const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser")!);
        await axios.post("http://localhost:3000/api/reminders", {
          user_id: loggedUser.id,
          farmaco: this.nuovoPromemoria.nome,
          frequenza: this.nuovoPromemoria.frequenza,
          orari: this.nuovoPromemoria.orari,
        });

        await this.loadReminders(); // ricarica promemoria dal db

        this.nuovoPromemoria = { nome: "", frequenza: "", orari: [] };
        this.showNewPromemoria = false;
      } catch (err) {
        console.error("Errore salvataggio promemoria:", err);
        alert("Errore nel salvataggio del promemoria");
      }
    },

    goHome() { this.$router.push("/home"); },
    goProfilo() { this.$router.push("/profilo"); },
    goGestione() { this.$router.push("/gestione"); },
  },
});
</script>

<template>
  <h2 class="title">I miei farmaci</h2>

  <!-- Lista Promemoria -->
  <div v-if="isLogged && reminders.length > 0">
    <div v-for="(reminder, index) in groupedReminders" :key="index" class="reminder-card">
      <div><strong>{{ reminder.farmaco }}</strong></div>
      <div>{{ reminder.orari.join(" / ") }}</div>
      <div>{{ reminder.frequenza }}</div>
    </div>
  </div>
  <div v-else class="reminder-card">Nessun promemoria inserito</div>

  <!-- Nuovo Promemoria -->
  <div v-if="isLogged && showNewPromemoria" class="reminder-card">
    <input type="text" placeholder="Nome farmaco" v-model="nuovoPromemoria.nome" />

    <select v-model="nuovoPromemoria.frequenza" @change="onFrequenzaChange">
      <option disabled value="">Frequenza</option>
      <option>1 volta al giorno</option>
      <option>2 volte al giorno</option>
      <option>3 volte al giorno</option>
    </select>

    <div v-for="(orario, index) in nuovoPromemoria.orari" :key="index">
      <input type="time" v-model="nuovoPromemoria.orari[index]" />
    </div>

    <div class="primary-btn" @click="salvaNuovoPromemoria">Salva</div>
  </div>

  <div class="add-reminder-btn" @click="showNewPromemoria = !showNewPromemoria">
    {{ showNewPromemoria ? "Annulla" : "Aggiungi promemoria" }}
  </div>
</template>
