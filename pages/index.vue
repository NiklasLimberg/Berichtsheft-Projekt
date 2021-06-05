<template>
  <div class="min-h-screen flex justify-center items-center text-center mx-auto">
    <div class="absolute right-0 top-0 m-1 p-4 px-3">
      <div v-if="$auth.loggedIn" class="flex gap-4 items-center">
        <p>{{ $auth.user.name }}</p>
        <a class="button-primary cursor-pointer m-1 p-2 px-1" @click="$auth.logout()">
          Logout
        </a>
      </div>
      <a
        v-else
        href="/login"
        rel="noopener noreferrer"
        class="m-1 p-4 px-3"
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
          class="button-primary m-1 p-4 px-3"
        >
          Documentation
        </a>
        <a
          href="https://github.com/NiklasLimberg/Berichtsheft-Projekt"
          rel="noopener noreferrer"
          class="button-primary m-1 p-4 px-3"
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
