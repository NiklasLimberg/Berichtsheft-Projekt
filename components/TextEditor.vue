<template>
  <div>
    <div ref="editorNode" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Quill from 'quill'

export default Vue.extend({

  props: {
    value: {
      default: '',
      type: String
    }
  },

  data () {
    return {
      editorContent: '',
      editorInstance: undefined as unknown as Quill
    }
  },

  watch: {
    value (newVal) {
      // Only update the content if it's changed from an external source
      // or else it'll act weird when you try to type anything
      if (newVal !== this.editorContent) {
        this.editorInstance.setText(newVal)
      }
    }
  },

  mounted () {
    this.editorInstance = new Quill(this.$refs.editorNode as Element, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          [{ color: [] }, { background: [] }],
          ['clean'],
          ['link', 'image', 'video'],
          [{ direction: 'rtl' }]
        ]
      },
      theme: 'snow'
    })

    // Set initial content that's going to be picked up by Quill
    this.editorInstance.setText(this.value)

    // Setup handler for whenever things change inside Quill
    this.editorInstance.on('text-change', this.onEditorContentChange)
  },

  beforeDestroy () {
    // Turn off all listeners set on text-change
    this.editorInstance.off('text-change', () => {})
  },

  methods: {
    onEditorContentChange () {
      this.editorContent = this.editorInstance.root.innerHTML
      this.$emit('input', this.editorContent)
    }
  }
})
</script>

<style>
  @import 'quill/dist/quill.snow.css'
</style>
