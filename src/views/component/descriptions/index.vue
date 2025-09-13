<script setup lang="tsx">
import BasicDescriptions from './components/BasicDescriptions.vue'
import ColumnDescriptions from './components/ColumnDescriptions.vue'

defineRender(() => (
  <div class="base-container">
    <BasicDescriptions />
    <ColumnDescriptions />
  </div>
))
</script>

<style scoped></style>
