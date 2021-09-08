<template>
  <div>
    <Nav/>

    <div class="w-screen h-screen">
      <div class="h-screen flex flex-wrap place-content-center">
        <div>
          <a v-if="$auth.loggedIn" class="button-primary m-1 p-4 px-3 focus:ring-2" href="/report/new">
            Berichtsheft schreiben
          </a>
          <a v-else class="button-primary m-1 p-4 px-3 focus:ring-2" href="/login">
            Berichtsheft schreiben
          </a>
        </div>
        <div>
          <a v-if="$auth.loggedIn" class="button-primary m-1 p-4 px-3 focus:ring-2" href="/report/list">
            Berichtshistorie
          </a>
          <a v-else class="button-primary m-1 p-4 px-3 focus:ring-2" href="/login">
            Berichtshistorie
          </a>
        </div>
      </div>
    </div>

    <EngineLabel/>
    <LoggedIn/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from "~/components/Nav.vue";
import LoggedIn from "~/components/LoggedIn.vue";
import EngineLabel from "~/components/EngineLabel.vue";

export default Vue.extend({
  components: {LoggedIn, Nav, EngineLabel},
})
</script>

<style>
</style>
