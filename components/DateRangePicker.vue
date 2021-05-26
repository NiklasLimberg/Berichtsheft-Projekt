<template>
  <div class="flex">
    <div>
      <label class="" for="start">
        Zeitraum vom:
      </label>
      <input
        v-model="dateRange.start"
        type="date"
        name="start"
        required
        pattern="\d{4}-\d{2}-\d{2}"
        class="input-primary"
      >
    </div>
    <div>
      <label for="end">
        bis:
      </label>
      <input
        v-model="dateRange.end"
        type="date"
        name="end"
        required
        pattern="\d{4}-\d{2}-\d{2}"
        class="input-primary"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      dateRange: {
        start: '2021-05-20',
        end: '2021-05-27'
      }
    }
  }
})
</script>

<style>
</style>
