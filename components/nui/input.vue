<script setup lang="ts">
interface InputProps {
	label?: string
	subLabel?: string
	type?: string
	icon?: string
	trailingIcon?: string
	disabled?: boolean
	hint?: string
	error?: boolean
	required?: boolean
	placeholder?: string
}

const {
	label = "",
	subLabel = "",
	type = "text",
	icon,
	trailingIcon,
	disabled,
	error,
	hint,
	required,
} = defineProps<InputProps>()

const modelValue = defineModel<string>()

const isDark = useIsDarkmode()
</script>
<template>
	<div class="flex flex-col gap-[4px] w-full z-0 ">
		<div v-if="label">
			<span class="label-sm">
				<NuiLabel
					:label="label"
					:sub-label="subLabel"
					:required="required"
				/>
			</span>
		</div>
		<div class="w-full h-fit relative ">
			<div
				v-if="icon"
				class="absolute left-[10px] top-1/2 -translate-y-1/2 flex items-center w-fit h-fit"
			>
				<Icon
					:name="icon"
					class="w-[21px] h-[21px] text-on-surface-variant"
				/>
			</div>
			<input
				v-model="modelValue"
				:type="type"
				:placeholder="placeholder"
				class="rounded-[6px]  body-xs w-full text-on-surface border py-[12px] border-outline h-[40px] focus:outline focus:outline-2 focus:outline-outline duration-100 transition-color ease-in-out"
				:class="{
					'pl-[35px]': icon,
					'pl-[15px]': !icon,
					'pr-[35px]': trailingIcon,
					'pr-[15px]': !trailingIcon,

					'border-error': error,
					'border-gray-300 bg-neutral-700/70 ':
						disabled && isDark,
					'border-gray-300 bg-neutral-300 ':
						disabled && !isDark,
					'bg-surface-variant hover:bg-surface-container-highest/70':
						!disabled,
				}"
				:disabled="disabled"
			/>

			<div
				v-if="trailingIcon"
				class="w-fit h-fit absolute right-[10px] top-1/2 flex items-center justify-center -translate-y-1/2"
			>
				<slot name="trailingIcon">
					<Icon
						:name="trailingIcon"
						class="w-[21px] h-[21px] text-on-surface-variant"
					/>
				</slot>
			</div>
		</div>
		<div v-if="hint">
			<NuiHintText
				:error="error"
				:disabled="disabled"
				>{{ hint }}</NuiHintText
			>
		</div>
	</div>
</template>

<style scoped>

</style>
