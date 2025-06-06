<script setup lang="tsx">
// import SvgImage from './SvgImage.vue';
import WaveSvg from './WaveSvg.vue';
import LoginForm from './LoginForm.vue';

defineRender(() => (
	<div>
		<WaveSvg />
		<div class='absolute top-50% left-50% -translate-50% rounded-3'>
			<LoginForm />
		</div>
	</div>
));
</script>

<style scoped></style>
