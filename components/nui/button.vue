<script setup lang="ts">
import type { color } from "chart.js/helpers"

interface Props {
	type: "filled" | "outlined" | "text"
	disabled?: boolean
	color?: "primary" | "secondary" | "tertiary"
}

const {
	type = "filled",
	disabled = false,
	color = "primary",
} = defineProps<Props>()

const buttonClass = computed(() => {
	return {
		"btn-filled hover:opacity-[0.80]": type === "filled",
		"btn-outlined hover:opacity-[0.80]":
			type === "outlined",
		"btn-text hover:opacity-[0.80]": type === "text",
		"btn-disabled hover:opacity-[0.80]": disabled,
	}
})
const buttonColorClass = computed(() => {
	return {
		"btn-primary": color === "primary",
		"btn-secondary": color === "secondary",
		"btn-tertiary": color === "tertiary",
	}
})


</script>
<template>
	<button
		class="h-[40px] px-4 py-1 relative overflow-hidden rounded-full transition-all duration-150 ease-in-out"
		:class="[buttonClass, buttonColorClass]"
		:disabled="disabled"
	>
		<slot></slot>
	</button>
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
