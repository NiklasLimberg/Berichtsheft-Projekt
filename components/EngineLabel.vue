<template>
  <div>
    <h5 class="absolute bottom-0 right-1">
      built with Vue {{ version }}
    </h5>
    <div class="absolute bottom-7 right-9">
      <Logo/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    version: () => Vue.version
  }
})
</script>
