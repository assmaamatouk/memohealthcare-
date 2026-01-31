<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "AppMenu",
  methods: {
    // Funzione per effettuare il logout
    async logout() {
      try {
        await axios.post("/auth/logout");
        this.$router.push("/welcome");
      } catch (error) {
        console.error("Errore logout:", error);
        // Anche in caso di errore, rimanda alla pagina di benvenuto
        this.$router.push("/welcome");
      }
    }
  }
});
</script>
<template>
  <div class="menu">
    <span @click="$router.push('/home')">Home</span>
    <span @click="$router.push('/gestione')">Gestione</span>
    <span @click="$router.push('/profilo')">Profilo</span>
    <span class="logout" @click="logout">Logout</span>
  </div>
</template>
