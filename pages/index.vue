<template>
  <div class="min-h-screen flex justify-center items-center text-center mx-auto">
    <div class="absolute right-0 top-0 m-1 p-4 px-3">
      <div v-if="$auth.loggedIn">
        {{ $auth.user.name }}
      </div>
      <a
        v-else
        href="/login"
        rel="noopener noreferrer"
        class="m-1 p-4 px-3 border-green-400 hover:text-white hover:bg-green-400 border-2 rounded-md"
      >
        Login
      </a>
    </div>
    <div>
      <Logo />
      <div class="tracking-wider">
        <h1 class="text-6xl">
          Berichtsheft-Projekt
        </h1>
        <h2 class="text-4xl">
          built with Vue {{ version }}
        </h2>
      </div>
      <div class="p-6">
        <a
          href="https://nuxtjs.org/"
          rel="noopener noreferrer"
          class="m-1 p-4 px-3 border-green-400 hover:text-white hover:bg-green-400 border-2 rounded-md"
        >
          Documentation
        </a>
        <a
          href="https://github.com/NiklasLimberg/Berichtsheft-Projekt"
          rel="noopener noreferrer"
          class="m-1 p-4 px-3 border-grey-600 hover:text-white hover:bg-gray-600 border-2 rounded-md"
        >
          GitHub
        </a>
      </div>
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

<style>
</style>
