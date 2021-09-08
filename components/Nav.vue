<template>
  <div class="absolute top-0 left-0 w-full">
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div class="flex items-center flex-shrink-0 text-black mr-6">
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
        </svg>
        <span class="font-semibold text-xl tracking-tight">Berichtsheft-Projekt</span>
      </div>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      <div class="w-full block flex-1 lg:flex lg:w-auto">
        <div class="text-sm">
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
          <a v-if="$auth.loggedIn" class="button-primary m-1 p-4 px-3" @click="$auth.logout()">
            Logout
          </a>
          <a
            v-else
            href="/login"
            rel="noopener noreferrer"
            class="button-primary m-1 p-4 px-3"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped>

</style>
