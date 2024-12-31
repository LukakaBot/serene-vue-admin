<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NButton, NSpace } from 'naive-ui';
import { call, MaybeArray } from 'naive-ui/es/_utils';
import type { BaseButtonGroup, OnClick } from './types';
import { renderIcon } from '@/utils/tools/index';

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<BaseButtonGroup[]>,
      required: true,
    },
    onClick: {
      type: [Function, Array] as PropType<MaybeArray<OnClick>>,
    }
  },
  setup(props, { emit }) {
    console.log(emit)

    function handleClick(label: string) {
      call(props.onClick as OnClick, label);
    }

    return () => {
      return h(NSpace, () => [
        props.list.map(btn => {
          return h(NButton, {
            type: btn.type,
            renderIcon: btn.icon ? () => renderIcon({ name: btn.icon! }) : undefined,
            strong: true,
            onClick: () => handleClick(btn.label),
          }, () => btn.label)
        })
      ])
    }
  }
})
</script>

<style scoped></style>