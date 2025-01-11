<script setup lang="ts">
import type { color } from "chart.js/helpers"

interface Props {
	type: "filled" | "tonal" | "outlined" | "text"
	disabled?: boolean
}

const {
	type = "filled",
	disabled = false,
} = defineProps<Props>()
const isDarkMode = useIsDarkmode()

</script>
<template>
	<div>
		<button
			v-if="type === 'filled'"
			class="body-md px-4 py-1 relative overflow-hidden rounded-full transition-all duration-150 ease-in-out bg-primary text-on-primary hover:bg-primary/80 outline-offset-2 outline-primary/80 disabled:bg-primary/50 disabled:cursor-not-allowed"
			:disabled="disabled"
		>
			<slot></slot>
		</button>

		<button
			v-if="type === 'tonal'"
			class="body-md px-4 py-1 relative overflow-hidden rounded-full transition-all duration-150 ease-in-out bg-secondary-container shadow text-on-secondary-container hover:bg-secondary-container/80 outline-offset-2 outline-secondary-container/80   disabled:cursor-not-allowed"
			:class="{
				'disabled:bg-secondary-container/50 disabled:text-neutral-100/80': isDarkMode && disabled,
				'disabled:bg-[#1D1B20]/10 disabled:text-[#1D1B20]/80': !isDarkMode && disabled,
			}"
			:disabled="disabled"
		>
			<slot></slot>
		</button>

		<button
			v-if="type === 'outlined'"
			class="body-md px-4 py-1 relative overflow-hidden rounded-full transition-all duration-150 ease-in-out border border-primary text-primary hover:bg-primary/10 outline-offset-4  disabled:bg-neutral-300/50   disabled:border-neutral-900/70 disabled:cursor-not-allowed"
			:class="{
				'disabled:text-neutral-100/80': isDarkMode && disabled,
				'disabled:text-neutral-700/80': !isDarkMode && disabled,
			}"
			:disabled="disabled"
		>
			<slot></slot>
		</button>

		<button
			v-if="type === 'text'"
			class="body-md px-4 py-1 relative overflow-hidden rounded-full transition-all duration-150 ease-in-out  text-primary hover:bg-primary/10 outline-offset-4   disabled:bg-neutral-300/50  disabled:cursor-not-allowed"
			:class="{
				'disabled:text-neutral-100/80': isDarkMode && disabled,
				'disabled:text-neutral-700/80': !isDarkMode && disabled,
			}"
			:disabled="disabled"
		>
			<slot></slot>
		</button>
	</div>
</template>

<style scoped>
.btn-filled {
	@apply !text-white;
}

.btn-outlined {
	@apply !bg-transparent border;
}

.btn-text {
	@apply !bg-transparent text-white;
}

.btn-disabled {
	@apply opacity-50 cursor-not-allowed;
}

.btn-primary {
	@apply bg-primary border-primary text-primary;
}

.btn-secondary {
	@apply bg-secondary border-secondary text-secondary;
}

.btn-tertiary {
	@apply bg-tertiary border-tertiary text-tertiary;
}

</style>
