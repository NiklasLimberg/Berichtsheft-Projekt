<template>
    <div v-if="$auth.loggedIn" class="absolute bottom-5 left-5">
      <p>{{ $auth.user.name }}</p>
    </div>
</template>

<script>
export default {
  name: 'LoggedIn'
}
</script>

<style scoped>

</style>
