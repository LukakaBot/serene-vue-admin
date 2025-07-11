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

defineRender(() => {
	const { name, color, size } = props;
	return isLocalIcon.value ? (
		<svg style={iconStyle.value} width={size} height={size} aria-hidden='true'>
			<use xlinkHref={iconName.value} fill={color} />
		</svg>
	) : (
		<Icon icon={name} width={size} height={size} color={color} />
	);
});
</script>

<style scoped></style>
