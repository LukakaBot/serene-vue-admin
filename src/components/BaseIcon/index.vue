<script setup lang="tsx">
import { Icon } from '@iconify/vue';

type Props = {
	name: string;
	color?: string;
	size?: number;
};

const props = withDefaults(defineProps<Props>(), {
	color: 'currentColor',
	size: 16,
});

const isLocalIcon = computed(() => props.name.startsWith('icon-'));

const iconName = computed(() => `#svg-${props.name}`);

const iconStyle = computed(() => ({
	color: props.color,
}));

defineRender(() =>
	isLocalIcon.value ? (
		<svg
			style={iconStyle.value}
			width={props.size}
			height={props.size}
			aria-hidden='true'
		>
			<use xlinkHref={iconName.value} fill={props.color} />
		</svg>
	) : (
		<Icon
			icon={props.name}
			width={props.size}
			height={props.size}
			color={props.color}
		/>
	)
);
</script>

<style scoped></style>
