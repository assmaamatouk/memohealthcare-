<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

type EditType = "farmaco" | "appuntamento" | "esame" | null;

export default defineComponent({
  name: "Gestione",
  data() {
    return {
      farmaci: [] as { id: number; farmaco: string; frequenza: string; orari: string[] }[],
      appuntamenti: [] as { id: number; titolo: string; data: string; ora: string; note: string }[],
      esami: [] as { id: number; nome_esame: string; data: string; ora: string }[],
      isLogged: false,

      // stato di modifica corretto
      editing: {
        type: null as EditType,
        id: null as number | null
      }
    };
  },

  mounted() {
    const loggedUser = sessionStorage.getItem("loggedUser");
    if (loggedUser) {
      this.isLogged = true;
      this.loadAll();
    }
  },

  methods: {
    async loadAll() {
      try {
        // FARMACI
        const farmaciRes = await axios.get("/reminders/user");
        this.farmaci = farmaciRes.data.map((r: any) => ({
          id: r.id,
          farmaco: r.farmaco,
          frequenza: r.frequenza,
          orari: [r.orario]
        }));

        // APPUNTAMENTI
        const appRes = await axios.get("/appointments");
        this.appuntamenti = appRes.data.map((a: any) => ({
          id: a.id,
          titolo: a.titolo,
          data: a.data,
          ora: a.ora,
          note: a.note
        }));

        // ESAMI
        const esamiRes = await axios.get("/esami/esami");
        this.esami = esamiRes.data.map((e: any) => ({
          id: e.id,
          nome_esame: e.nome_esame,
          data: e.data,
          ora: e.ora
        }));
      } catch (err) {
        console.error(err);
        alert("Errore nel caricamento dei dati");
      }
    },

    //  gestione edit
    startEdit(type: EditType, id: number) {
      this.editing = { type, id };
    },
    cancelEdit() {
      this.editing = { type: null, id: null };
    },

    async saveFarmaco(f: any) {
      await axios.put(`/reminders/${f.id}`, {
          farmaco: f.farmaco,
          frequenza: f.frequenza,
           orario: f.orari[0]   // backend requires this field
       });

      this.cancelEdit();
      this.loadAll();
    },

    async saveAppuntamento(a: any) {
      await axios.put(`/appointments/${a.id}`, a);
      this.cancelEdit();
      this.loadAll();
    },

    async saveEsame(e: any) {
      await axios.put(`/esami/${e.id}`, e);
      this.cancelEdit();
      this.loadAll();
    },

    async deleteFarmaco(id: number) {
      if (!confirm("Vuoi eliminare questo farmaco?")) return;
      await axios.delete(`/reminders/${id}`);
      this.loadAll();
    },

    async deleteAppuntamento(id: number) {
      if (!confirm("Vuoi eliminare questo appuntamento?")) return;
      await axios.delete(`/appointments/${id}`);
      this.loadAll();
    },

    async deleteEsame(id: number) {
      if (!confirm("Vuoi eliminare questo esame?")) return;
      await axios.delete(`/esami/${id}`);
      this.loadAll();
    }
  }
});
</script>


<template>
<div class="gestione-page">
  <h2 class="title">Gestione dei tuoi dati</h2>

  <!-- FARMACI -->
  <h3 class="subtitle">Farmaci</h3>
  <table class="gestione-table" v-if="farmaci.length > 0">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Orari</th>
        <th>Frequenza</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="f in farmaci" :key="f.id">
  <td>
    <span v-if="editing.type !== 'farmaco' || editing.id !== f.id">
      {{ f.farmaco }}
    </span>
    <input v-else v-model="f.farmaco" />
  </td>

  <td>
    <span v-if="editing.type !== 'farmaco' || editing.id !== f.id">
      {{ f.orari.join(' / ') }}
    </span>
    <input v-else type="time" v-model="f.orari[0]" />
  </td>

  <td>
    <span v-if="editing.type !== 'farmaco' || editing.id !== f.id">
      {{ f.frequenza }}
    </span>
    <input v-else v-model="f.frequenza" />
  </td>

  <td>
    <span
      v-if="editing.type !== 'farmaco' || editing.id !== f.id"
      class="action-btn"
      @click="startEdit('farmaco', f.id)"
    >
      Modifica
    </span>

    <span
      v-else
      class="action-btn"
      @click="saveFarmaco(f)"
    >
      Salva
    </span>

    <span
      v-if="editing.type === 'farmaco' && editing.id === f.id"
      class="action-btn"
      @click="cancelEdit"
    >
      Annulla
    </span>

    <span class="action-btn" @click="deleteFarmaco(f.id)">
      Elimina
    </span>
  </td>
</tr>

    </tbody>
  </table>
  <div v-else>Nessun farmaco inserito</div>

  <!-- APPUNTAMENTI -->
  <h3 class="subtitle">Appuntamenti</h3>
  <table class="gestione-table" v-if="appuntamenti.length > 0">
    <thead>
      <tr>
        <th>Titolo</th>
        <th>Data</th>
        <th>Ora</th>
        <th>Note</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="a in appuntamenti" :key="a.id">
  <td>
    <span v-if="editing.type !== 'appuntamento' || editing.id !== a.id">
      {{ a.titolo }}
    </span>
    <input v-else v-model="a.titolo" />
  </td>

  <td>
    <span v-if="editing.type !== 'appuntamento' || editing.id !== a.id">
      {{ a.data }}
    </span>
    <input v-else type="date" v-model="a.data" />
  </td>

  <td>
    <span v-if="editing.type !== 'appuntamento' || editing.id !== a.id">
      {{ a.ora }}
    </span>
    <input v-else type="time" v-model="a.ora" />
  </td>

  <td>
    <span v-if="editing.type !== 'appuntamento' || editing.id !== a.id">
      {{ a.note }}
    </span>
    <input v-else v-model="a.note" />
  </td>

  <td>
    <span
      v-if="editing.type !== 'appuntamento' || editing.id !== a.id"
      class="action-btn"
      @click="startEdit('appuntamento', a.id)"
    >
      Modifica
    </span>

    <span v-else class="action-btn" @click="saveAppuntamento(a)">
      Salva
    </span>

    <span
      v-if="editing.type === 'appuntamento' && editing.id === a.id"
      class="action-btn"
      @click="cancelEdit"
    >
      Annulla
    </span>

    <span class="action-btn" @click="deleteAppuntamento(a.id)">
      Elimina
    </span>
  </td>
</tr>

    </tbody>
  </table>
  <div v-else>Nessun appuntamento inserito</div>

  <!-- ESAMI -->
  <h3 class="subtitle">Esami</h3>
  <table class="gestione-table" v-if="esami.length > 0">
    <thead>
      <tr>
        <th>Nome Esame</th>
        <th>Data</th>
        <th>Ora</th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="e in esami" :key="e.id">
  <td>
    <span v-if="editing.type !== 'esame' || editing.id !== e.id">
      {{ e.nome_esame }}
    </span>
    <input v-else v-model="e.nome_esame" />
  </td>

  <td>
    <span v-if="editing.type !== 'esame' || editing.id !== e.id">
      {{ e.data }}
    </span>
    <input v-else type="date" v-model="e.data" />
  </td>

  <td>
    <span v-if="editing.type !== 'esame' || editing.id !== e.id">
      {{ e.ora }}
    </span>
    <input v-else type="time" v-model="e.ora" />
  </td>

  <td>
    <span
      v-if="editing.type !== 'esame' || editing.id !== e.id"
      class="action-btn"
      @click="startEdit('esame', e.id)"
    >
      Modifica
    </span>

    <span v-else class="action-btn" @click="saveEsame(e)">
      Salva
    </span>

    <span
      v-if="editing.type === 'esame' && editing.id === e.id"
      class="action-btn"
      @click="cancelEdit"
    >
      Annulla
    </span>

    <span class="action-btn" @click="deleteEsame(e.id)">
      Elimina
    </span>
  </td>
</tr>

    </tbody>
  </table>
  <div v-else>Nessun esame inserito</div>
</div>
</template>
