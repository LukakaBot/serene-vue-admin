<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true
    },
    render: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    return props.render(props.data);
  }
})
</script>

<style scoped></style>