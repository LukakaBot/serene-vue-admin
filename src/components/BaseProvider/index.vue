<script setup lang="tsx">
import {
	NModalProvider,
	NDialogProvider,
	NMessageProvider,
	NNotificationProvider,
} from 'naive-ui';
import type { BaseProviderSlots } from './types';

const slots = defineSlots<BaseProviderSlots>();

defineRender(() => (
	<NModalProvider>
		<NDialogProvider>
			<NMessageProvider>
				<NNotificationProvider>
					{{ default: slots.default }}
				</NNotificationProvider>
			</NMessageProvider>
		</NDialogProvider>
	</NModalProvider>
));
</script>

<style scoped></style>
