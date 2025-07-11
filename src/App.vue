<script setup lang="tsx">
import { RouterView } from 'vue-router';
import { darkTheme, zhCN, dateZhCN, NConfigProvider } from 'naive-ui';
import { useConfigStore, useThemeStore } from './store';
import BaseProvider from '@/components/BaseProvider/index.vue';

const configStore = useConfigStore();

const themeStore = useThemeStore();

const theme = computed(() => (configStore.isDarkMode ? darkTheme : undefined));

defineRender(() => (
	<NConfigProvider
		theme={theme.value}
		themeOverrides={themeStore.appTheme}
		locale={zhCN}
		dateLocale={dateZhCN}
	>
		<BaseProvider>
			<RouterView />
		</BaseProvider>
	</NConfigProvider>
));
</script>

<style scoped></style>
