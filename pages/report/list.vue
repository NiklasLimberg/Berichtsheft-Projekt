<template>
  <div class="p-4">
    <header class="flex place-content-between items-baseline gap-4 mb-4">
      <h1>
        Reports List
      </h1>
      <a href="/report/new">
        Erstellen
      </a>
      <a href="/">
        Zurück
      </a>
    </header>
    <div v-for="report in reports" :key="report.id">
      <report-overview :report="report" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ReportOverview from '~/components/ReportOverview.vue'

export default Vue.extend({
  components: { ReportOverview },
  async asyncData (context) {
    const { page = 1, limit = 25 } = context.route.params

    const reports = (await context.$axios.get(`/api/report/?page=${page}&limit=${limit}`)).data

    return {
      reports: reports.data,
      total: reports.total
    }
  },
  data () {
    return {
      reports: [],
      total: 0
    }
  }
})
</script>
