<template>
  <div>
    <div class="md:flex md:gap-4">
      <label for="eMail">
        <span>E-Mail des Betreuers:</span>
        <input id="eMail" v-model="eMail" type="email" class="input-primary">
      </label>

      <label for="eMailRepeat">
        <span>E-Mail des Betreuers (Wiederholung):</span>
        <input id="eMailRepeat" v-model="eMailRepeat" type="email" class="input-primary">
      </label>
    </div>
    <div class="flex justify-center">
      <div v-if="!valid" class="p-3 m-3 rounded border border-red-600">
        E-Mails stimmen nicht überein!
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      eMail: '',
      eMailRepeat: ''
    }
  },
  computed: {
    valid ():boolean {
      if (this.eMail === this.eMailRepeat) {
        this.$emit('input', this.eMail)

        return true
      }

      this.$emit('input', '')
      return false
    }
  },
  watch: {
    value: {
      handler (value) {
        if (value.length === 0) {
          return
        }
        this.eMail = value
        this.eMailRepeat = value
      },
      immediate: true
    }
  }
})
</script>
