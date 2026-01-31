<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      appName: "MemoHealthcare"
    };
  },
  methods: {
    // Reindirizza l'utente alla pagina di login
    goLogin() {
      this.$router.push("/login");
    },
    // Reindirizza l'utente alla pagina di registrazione
    goRegister() {
      this.$router.push("/register");
    }
  }
});
</script>

<template>
  

    <h1 class="title">
      Benvenuto Caro Utente!
    </h1>

    
    <p class="subtitle">
      MemoHealthcare è qui per ricordarti della tua salute
    </p>

    
    <p class="description">
      In questa Web Application progettata per aiutare gli utenti,
      soprattutto gli anziani, a gestire facilmente i propri promemoria
      dei farmaci quotidiani.
      <br /><br />
      Grazie a questa Web Application, gli utenti possono controllare
      gli orari delle medicine, aggiungere nuove dosi per non dimenticare
      mai un farmaco.
    </p>

    <!-- Chiamare l' action con link per login e registrazione -->
    <p class="cta">
      Clicca <span class="link" @click="goLogin">Accedi</span>
      o
      <span class="link" @click="goRegister">Registrati</span>
      e lascia che MemoHealthcare si prenda cura di Te!
    </p>

  
</template>


