<script setup lang="tsx">
import type { VNode } from 'vue';
import { resolveDirective, withDirectives } from 'vue';
import type { ButtonProps } from 'naive-ui';
import { NButton, NSpace } from 'naive-ui';
import type { BaseButton } from './types';
import { renderIcon } from '@/utils/tools/index';

type Props = {
	list: BaseButton[];
	onClick?: (label: string) => void;
};

const props = defineProps<Props>();

function handleClick(label: string) {
	props.onClick?.(label);
}

function createButtonProps({ type, icon, text }: BaseButton): ButtonProps {
	return {
		type,
		renderIcon: icon ? () => renderIcon({ name: icon! }) : undefined,
		strong: true,
		onClick: () => handleClick(text),
	};
}

function withAuthDirective(vnode: VNode, value: string) {
	const vAuth = resolveDirective('auth');
	return withDirectives(vnode, [[vAuth, value]]);
}

defineRender(() => {
	const { list } = props;
	return (
		<NSpace>
			{list.map((btn) => {
				const buttonProps = createButtonProps(btn);
				const buttonRender = <NButton {...buttonProps}>{btn.text}</NButton>;

				return btn.auth !== undefined
					? withAuthDirective(buttonRender, btn.text)
					: buttonRender;
			})}
		</NSpace>
	);
});
</script>
