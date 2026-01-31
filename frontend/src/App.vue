<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
// Import dei componenti layout principali
import AppMenu from "./components/layout/AppMenu.vue";
import AppHero from "./components/layout/AppHero.vue";
import AppFooter from "./components/layout/AppFooter.vue";

export default defineComponent({
  components: { AppMenu, AppHero, AppFooter },
  setup() {
    // Ottiene informazioni sulla rotta attiva
    const route = useRoute();

    // Elenco delle pagine in cui il menu deve essere visibile
    const pagesWithMenu = ["/home", "/farmaci", "/appuntamenti", "/esami", "/profilo", "/gestione"];

    const showMenu = computed(() => pagesWithMenu.includes(route.path));

    return { showMenu };
  },
});
</script>

<template>
  <div class="auth-page">
    <!-- Menu visibile solo nelle pagine specificate -->
    <AppMenu  v-if="showMenu"/>
    <AppHero />

    <main>
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<style src="@/assets/auth.css"></style>
