<script setup lang="ts">

interface Props {
	type?: "submit" | "button" | "reset"
	mode: "filled" | "outlined" | "text"
	variant?: "primary" | "tonal" | "normal"
	disabled?: boolean
	class?: string
}

const props = withDefaults(defineProps<Props>(), {
	type: "button",
	mode: "filled",
	variant: "primary",
	disabled: false,
	class: "w-fit h-fit"
})
const isDarkMode = useIsDarkmode()

</script>
<template>
	<div :class="props.class">
		<button
			:type="props.type"
			class="w-full body-md px-4 py-1 relative overflow-hidden rounded-full transition-all duration-150 ease-in-out outline-offset-2 disabled:cursor-not-allowed"
			:class="{
				'bg-primary text-on-primary hover:bg-primary/80 outline-primary/80 disabled:bg-tertiary/50': props.mode === 'filled' && props.variant === 'primary',
				'bg-secondary-container shadow text-on-secondary-container hover:bg-secondary-container/80 outline-secondary-container/80 disabled:bg-secondary-container/50': props.mode === 'filled' && props.variant === 'tonal',
				'border border-primary text-primary hover:bg-primary/10 outline-offset-4 disabled:border-neutral-900/70': props.mode === 'outlined' && props.variant === 'primary',
				'border border-secondary-light text-secondary-light hover:bg-secondary-container/10 outline-offset-4 disabled:border-neutral-900/70': props.mode === 'outlined' && props.variant === 'tonal',
				'text-primary hover:bg-primary/10 outline-offset-4': props.mode === 'text' && props.variant === 'primary',
				'text-secondary-light hover:bg-secondary-container/10 outline-offset-4': props.mode === 'text' && props.variant === 'tonal',
				'text-on-surface hover:bg-on-surface/10 outline-offset-4': props.mode === 'text' && props.variant === 'normal',
				'disabled:bg-secondary-container/50 disabled:text-neutral-900/70': isDarkMode && props.disabled,
				'disabled:bg-[#1D1B20]/10 disabled:text-gray-900/80': !isDarkMode && props.disabled,
				'disabled:text-neutral-900/70': props.mode === 'outlined' && props.disabled,
				'disabled:text-neutral-900/70 ': props.mode === 'text' && props.disabled
			}"
			:disabled="props.disabled"
		>
			<slot></slot>
		</button>
	</div>
</template>

<style scoped>

</style>
