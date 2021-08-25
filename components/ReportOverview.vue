<template>
  <div class="grid-cols-2 gap-4">
    <span>Zeitraum:</span>
    <span>{{ report.weekStart }} - {{ report.weekEnd }}</span>
    <div>Ausbildungsabschnitt/-abteilung:</div>
    <span>{{ report.section }}</span>
    <div>Betreuer:</div>
    <span>{{ report.superVisorEmail }}</span>
    <div>Aktion:</div>
    <span>
      <nuxt-link :to="report.id">
        Edit
      </nuxt-link>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    report: {
      type: Object,
      required: true
    }
  }
})
</script>
