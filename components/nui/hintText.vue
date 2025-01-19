<script lang="ts" setup>
defineProps<{
	error?: boolean
	disabled?: boolean
}>()
</script>

<template>
	<div class="flex items-center gap-1">
		<Icon
			name="mdi:information"
			size="16"
			class="text-on-surface/70"
			:class="{
				'!text-error-light': error,
				'!text-on-surface/70': disabled,
			}"
		/>
		<span
			class="body-xs text-soft"
			:class="{
				'!text-error-light': error,
				'!text-on-surface/70': disabled,
			}"
		>
			<slot />
		</span>
	</div>
</template>

<style scoped></style>
