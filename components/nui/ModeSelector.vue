<script setup lang="ts">
interface ModeSelectorProps {
	size?: 'xs' | 'sm' | 'md' | 'lg'
	variant?: 'none' | 'outlined'
}
const {size = 'sm', variant = 'none'} = defineProps<ModeSelectorProps>()

const colorMode = useColorMode()

const isDarkMode = computed(() => colorMode.value === 'dark')

const toggleMode = () => {
	colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	
}

</script>

<template>
	<div
		@click="toggleMode"
		:class="[
			'hover:scale-105 cursor-pointer rounded-md p-[0.35rem] flex items-center justify-center',
			{
				'w-7 h-7': size === 'xs',
				'w-8 h-8': size === 'sm', 
				'w-9 h-9': size === 'md',
				'w-10 h-10': size === 'lg',
				'border-transparent': variant === 'none',
				'border-outline': variant === 'outlined',
			}
		]"
	>
	<ClientOnly>
		<Icon
			v-if="isDarkMode"
			name="line-md:moon-filled-alt-to-sunny-filled-loop-transition"
			class="w-full h-full text-amber-300"
		/>
		<Icon
			v-else
			name="line-md:sunny-filled-loop-to-moon-filled-loop-transition"
			class="w-full h-full text-slate-500"
		/>
	</ClientOnly>
	</div>
</template>

<style scoped></style>
