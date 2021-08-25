<template>
  <div>
    <h1>
      Reports List
    </h1>
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
    return {}
  }

})
</script>
