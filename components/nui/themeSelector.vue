<template>
	<div
		@click="isOpen = !isOpen"
		class="relative max-w-[250px] h-fit select-none bg-surface-container px-2 py-1 rounded-full border border-outline cursor-pointer flex items-center justify-between gap-3 hover:bg-outline/70 duration-100 transition-color ease-in-out"
	>
		<div class="flex items-center gap-2 capitalize">
			<div
				class="w-3 h-3 border border-outline rounded-full"
				:style="{
					backgroundColor: themes[selectedTheme].color,
				}"
			></div>
			<span class="text-on-surface body-sm">{{
				themes[selectedTheme].name
			}}</span>
		</div>
		<Icon
			name="mdi:chevron-down"
			class="text-on-surface"
		/>
		<Transition name="fade">
			<div
				v-if="isOpen"
				class="absolute flex flex-col left-full translate-x-4 z-[2] top-1/2 -translate-y-1/2 w-[250px] bg-surface-container-high rounded-3xl p-2 border border-outline cursor-pointer duration-100 transition-color ease-in-out overflow-hidden"
			>
				<div
					v-for="(theme, index) in themes"
					:key="index"
					@click="handleSelectTheme(index)"
					class="flex items-center gap-3 capitalize rounded-full cursor-pointer p-2"
					:class="{
						'bg-primary/70': selectedTheme === index,
						'hover:bg-surface-container-highest':
							selectedTheme !== index,
					}"
				>
					<div class="w-5 h-5 drop-shadow rounded-full">
						<NuiThemesDefault
							v-if="index === 0"
							class="!fill-on-surface"
						/>
						<NuiThemesBlueberry v-if="index === 1" />
					</div>
					<span
						class="text-on-surface body-xs"
						:class="{
							'text-white': selectedTheme === index,
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

const themes = [
	{
		name: "default",
		class: "default",
		color: "#7D54F3",
	},
	{
		name: "Blueberry",
		class: "theme-blue",
		color: "#64A0FF",
	},
]

const selectedTheme = ref(
	localStorage.getItem("Themes")
		? parseInt(localStorage.getItem("Themes") as string)
		: 0,
)
console.log("Selected Theme:", selectedTheme.value)

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
