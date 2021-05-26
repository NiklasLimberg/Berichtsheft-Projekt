<template>
  <div class="md:flex md:gap-4">
    <div>
      <label for="eMail">
        <span>E-Mail des Betreuers:</span>
        <input id="eMail" v-model="eMail" type="email" class="input-primary">
      </label>
    </div>
    <div class="sm:mt-4">
      <label for="eMailRepeat">
        <span>E-Mail des Betreuers (Wiederholung):</span>
        <input id="eMailRepeat" v-model="eMailRepeat" type="email" class="input-primary">
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      eMail: '',
      eMailRepeat: ''
    }
  }
})
</script>
