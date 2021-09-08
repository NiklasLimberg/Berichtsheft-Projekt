<template>
  <div class="min-h-screen flex justify-center items-center text-center mx-auto">
    <header>
      <h1 v-if="error.statusCode === 404">
        Page not found
      </h1>
      <h1 v-else>
        An error occurred
      </h1>
      <header>
        <main class="mt-6">
          <NuxtLink class="button-primary p-4 px-3" to="/">
            Home page
          </NuxtLink>
        </main>
      </header>
    </header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { NuxtError } from '@nuxt/types'

export default Vue.extend({
  props: {
    error: {
      type: Object as () => NuxtError,
      required: true
    }
  }
})
</script>
