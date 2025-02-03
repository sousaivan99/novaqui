<template>
	<div
		@click="isOpen = !isOpen"
		class="relative max-w-[250px] h-7 select-none  px-3 py-1.5 rounded-md border border-outline cursor-pointer flex items-center justify-between gap-3 hover:bg-surface-container duration-100 transition-color ease-in-out"
	>
		<div class="flex items-center gap-2 capitalize">
			<div
				class="w-3 h-3 rounded-full bg-primary"
				:class="[themes[selectedTheme].class]"
			></div>
			<span class="text-on-surface body-xs">
				{{ themes[selectedTheme].name }}
			</span>
		</div>
		<Icon
			name="mdi:chevron-down"
			class="text-on-surface"
		/>
		<Transition name="fade">
			<div
				v-if="isOpen"
				ref="dropdown"
				class="absolute flex flex-col gap-1 min-w-[150px] bg-surface-container-high shadow-md rounded-md p-1 border border-outline cursor-pointer duration-100 transition-color ease-in-out overflow-hidden"
				:style="dropdownStyle"
			>
				<div
					v-for="(theme, index) in themes"
					:key="index"
					@click="handleSelectTheme(index)"
					class="flex items-center gap-3 capitalize rounded-md cursor-pointer p-2"
					:class="{
						'bg-primary/20': selectedTheme === index,
						'hover:bg-surface-container-highest':
							selectedTheme !== index,
						[theme.class]: true,
					}"
				>
					<div
						class="w-3 h-3 rounded-full bg-primary shadow"
					></div>
					<span
						class="text-on-surface body-xs"
						:class="{
							'!text-on-primary':
								selectedTheme === index,
						}"
						>{{ theme.name }}</span
					>
				</div>
			</div>
		</Transition>
	</div>
</template>
<script setup lang="ts">
const isOpen = ref(false)
const dropdown = ref(null)

const themes = [
	{
		name: "default",
		class: "theme-blue",
	},
	{
		name: "Purple",
		class: "theme-purple",
	},
	{
		name: "Teal",
		class: "theme-teal",
	},
]

const selectedTheme = ref(0)
onMounted(() => {
	selectedTheme.value = localStorage.getItem("Themes")
		? parseInt(localStorage.getItem("Themes") as string)
		: 0
})
const handleSelectTheme = (index: number) => {
	selectedTheme.value = index
	localStorage.setItem("Themes", index.toString())
	applyTheme()
}

const applyTheme = () => {
	const root = document.documentElement
	root.className = root.className
		.split(" ")
		.filter(
			(className) => !className.startsWith("theme-"),
		)
		.join(" ")
	root.classList.add(themes[selectedTheme.value].class)
}
const dropdownStyle = computed(() => {
	if (!dropdown.value) return {}
	const { top, height, left, width } =
		dropdown.value.getBoundingClientRect()
	const windowHeight = window.innerHeight
	const windowWidth = window.innerWidth
	const dropdownHeight = dropdown.value.scrollHeight
	const dropdownWidth = dropdown.value.scrollWidth
	const isOverflowingY =
		top + height + dropdownHeight > windowHeight
	const isOverflowingX =
		left + width + dropdownWidth > windowWidth

	return {
		top: isOverflowingY ? "auto" : "calc(100% + 3px)",
		bottom: isOverflowingY
			? "calc(100% + 3px)"
			: "auto",
		left: isOverflowingX ? "auto" : "0",
		right: isOverflowingX ? "0" : "auto",
	}
})

onMounted(() => {
	applyTheme()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: all 0.15s;
}
.fade-enter-from,
.fade-leave-to {
	transform: scale(0.9);
	opacity: 0;
}
</style>
