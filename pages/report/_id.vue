<template>
  <div class="pt-2 md:pt-10 lg:p-24 px-2 md:px-10 lx:p-24">
    <h1 class="text-6xl tracking-wider">
      Ausbildungsnachweise
    </h1>
    <div class="md:flex gap-4">
      <div class="mt-4">
        <date-range-picker />
      </div>
      <label class="mt-4" for="section">
        <span>Ausbildungsabschnitt/-abteilung</span>
        <input class="input-primary" type="text">
      </label>
    </div>
    <email-double-input class="mt-4" />
    <div class="mt-4">
      <client-only>
        <h2 class="text-2xl">
          Betriebliche Tätigkeiten:
        </h2>
        <text-editor v-model="content.workActivities" class="mt-2" />
      </client-only>
    </div>
    <div class="mt-4">
      <client-only>
        <h2 class="text-2xl">
          Unterweisungen, betrieblicher Unterricht, sonstige Schulungen:
        </h2>
        <text-editor v-model="content.instructions" class="mt-2" />
      </client-only>
    </div>
    <div class="mt-4">
      <client-only>
        <h2 class="text-2xl">
          Berufsschule (Unterrichtsthemen):
        </h2>
        <text-editor v-model="content.curriculum" class="mt-2" />
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      duration: { start: '', end: '' },
      section: '',
      superVisorEmail: '',
      content: {
        workActivities: '',
        instructions: '',
        curriculum: ''
      }
    }
  }
})
</script>
