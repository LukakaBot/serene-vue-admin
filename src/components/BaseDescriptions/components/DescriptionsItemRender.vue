<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { BaseDescriptionData, BaseDescriptionRender } from '../types';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<BaseDescriptionData>,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    render: {
      type: Function as PropType<BaseDescriptionRender>,
      required: true
    },
  },
  setup(props) {
    return () => props.render(props.data, props.field);
  }
});
</script>

<style scoped></style>