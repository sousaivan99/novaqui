<script setup lang="ts">

interface Props {
	type?: "submit" | "button" | "reset"
	mode: "filled" | "outlined" | "text"
	variant?: "primary" | "tonal" | "normal"
	disabled?: boolean
	class?: string
	icon?: string
	iconBtn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	type: "button",
	mode: "filled",
	variant: "primary",
	disabled: false,
	class: "w-fit h-fit",
	icon: "",
	iconBtn: false
})
const isDarkMode = useIsDarkmode()

</script>
<template>
	<div :class="props.class">
		<button
			:type="props.type"
			class="w-full flex items-center justify-center gap-1 body-md relative overflow-hidden rounded-md transition-all duration-150 ease-in-out outline-offset-2 disabled:cursor-not-allowed"
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
				'disabled:text-neutral-900/70 ': props.mode === 'text' && props.disabled,
				'w-fit h-fit p-1': props.iconBtn,
				'px-4 py-1 ': !props.iconBtn
			}"
			:disabled="props.disabled"
		>
			<Icon v-if="props.icon" :name="props.icon" size="24" :class="{
				'text-on-primary': props.mode === 'filled' && props.variant === 'primary' && !props.disabled,
				'text-on-secondary-container': props.mode === 'filled' && props.variant === 'tonal' && !props.disabled,
				'text-primary': props.mode === 'outlined' && props.variant === 'primary' && !props.disabled,
				'text-secondary-light': props.mode === 'outlined' && props.variant === 'tonal' && !props.disabled,
				'text-primary': props.mode === 'text' && props.variant === 'primary' && !props.disabled,
				'text-secondary-light': props.mode === 'text' && props.variant === 'tonal' && !props.disabled,
				'text-on-surface': props.mode === 'text' && props.variant === 'normal' && !props.disabled,
				'text-neutral-900/70': props.mode === 'filled' && isDarkMode && props.disabled,
				'text-gray-900/80': props.mode === 'filled' && !isDarkMode && props.disabled,
				'text-neutral-900/70': props.mode === 'outlined' && isDarkMode && props.disabled,
				'text-gray-900/80': props.mode === 'outlined' && !isDarkMode && props.disabled,
				'text-neutral-900/70': props.mode === 'text' && isDarkMode && props.disabled,
				'text-gray-900/80': props.mode === 'text' && !isDarkMode && props.disabled
			}"/>
			<slot></slot>
		</button>
	</div>
</template>

<style scoped>

</style>
