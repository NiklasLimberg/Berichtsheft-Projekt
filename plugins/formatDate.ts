import Vue from 'vue'

Vue.filter('formatDate', (dateStr: string, options: Intl.DateTimeFormatOptions) =>
  Intl.DateTimeFormat('us-EN', options).format(new Date(dateStr))
)
