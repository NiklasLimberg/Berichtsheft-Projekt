<template>
  <div class="pt-2 md:pt-10 lg:p-24 px-2 md:px-10 lx:p-24">
    <div class="float-right right-0">
      <div v-if="isNew">
        <button class="button-primary m-1 p-4 px-3" @click="create()">
          Erstellen
        </button>
      </div>
      <div v-else>
        <button class="button-primary m-1 p-4 px-3" @click="save()">
          Speichern
        </button>
        <button class="button-primary m-1 p-4 px-3" @click="remove()">
          Löschen
        </button>
      </div>
    </div>
    <h1 class="text-6xl tracking-wider">
      Ausbildungsnachweise
    </h1>
    <div class="md:flex gap-4">
      <div class="flex mt-4">
        <div>
          <label for="start">
            Zeitraum vom:
          </label>
          <input
            :value="report.weekStart.slice(0, 10)"
            type="date"
            name="start"
            required
            pattern="\d{4}-\d{2}-\d{2}"
            class="input-primary"
            @input="ev => report.weekStart = ev.target.value"
          >
        </div>
        <div>
          <label for="end">
            bis:
          </label>
          <input
            :value="report.weekEnd.slice(0, 10)"
            type="date"
            name="end"
            required
            pattern="\d{4}-\d{2}-\d{2}"
            class="input-primary"
            @input="ev => report.weekEnd = ev.target.value"
          >
        </div>
      </div>
      <label class="mt-4" for="section">
        <span>Ausbildungsabschnitt/-abteilung</span>
        <input class="input-primary" type="text">
      </label>
    </div>
    <email-double-input class="mt-4" />
    <div class="mt-4">
      <client-only>
        <h2 class="text-2xl">
          Betriebliche Tätigkeiten:
        </h2>
        <text-editor v-model="report.workActivities" class="mt-2" />
      </client-only>
    </div>
    <div class="mt-4">
      <client-only>
        <h2 class="text-2xl">
          Unterweisungen, betrieblicher Unterricht, sonstige Schulungen:
        </h2>
        <text-editor v-model="report.instructions" class="mt-2" />
      </client-only>
    </div>
    <div class="mt-4">
      <client-only>
        <h2 class="text-2xl">
          Berufsschule (Unterrichtsthemen):
        </h2>
        <text-editor v-model="report.curriculum" class="mt-2" />
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const TextEditor = () => process.client ? import('~/client-components/TextEditor.vue') : undefined

export default Vue.extend({
  components: {
    'text-editor': TextEditor
  },
  async asyncData (context) {
    const id = context.route.params.id

    if (id === 'new') {
      return {
        isNew: true
      }
    }

    return {
      report: (await context.$axios.get(`/api/report/${id}`)).data
    }
  },
  data () {
    return {
      isNew: false,
      report: {
        weekStart: '',
        weekEnd: '',
        section: '',
        superVisorEmail: '',
        workActivities: '',
        instructions: '',
        curriculum: ''
      }
    }
  },
  methods: {
    async create () {
      const response = (await this.$axios.post('/api/report/', this.report)).data
      this.report = response.data
      this.$router.replace({ params: { id: response.id } })
    },
    async save () {
      const response = await this.$axios.put(`/api/report/${this.$route.params.id}`, this.report)
      this.report = response.data
    },
    async remove () {
      await this.$axios.delete(`/api/report/${this.$route.params.id}`)
      this.$router.replace({ path: '/report/list' })
    }
  }
})
</script>
