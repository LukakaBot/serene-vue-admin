<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 16
    },
  },
  setup(props) {
    const isLocalIcon = computed(() => props.name.startsWith('icon-'));

    const iconName = computed(() => `#svg-${props.name}`);

    const iconStyle = computed(() => ({
      color: props.color,
    }));

    return () => {
      if (isLocalIcon.value) {
        return h('svg', { style: iconStyle.value, width: props.size, height: props.size, 'aria-hidden': 'true' }, [
          h('use', { 'xlink:href': iconName.value, fill: props.color })
        ]);
      }

      return h(Icon, { icon: props.name, width: props.size, height: props.size, color: props.color });
    }
  }
})
</script>

<style scoped></style>