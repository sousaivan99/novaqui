<script setup lang="ts">
// Utility functions for handling localStorage
const setTheme = (theme) => {
	localStorage.setItem("theme", theme)
}

const getTheme = () => {
	return localStorage.getItem("theme")
}

const isDarkMode = ref(false) // Default to false

if (typeof window !== "undefined") {
	const savedTheme = getTheme()
	if (
		savedTheme === "dark" ||
		(!savedTheme &&
			window.matchMedia("(prefers-color-scheme: dark)")
				.matches)
	) {
		isDarkMode.value = true
	} else {
		isDarkMode.value = false
	}
}

const toggleMode = () => {
	isDarkMode.value = !isDarkMode.value
	if (isDarkMode.value) {
		document.documentElement.classList.add("dark")
		setTheme("dark")
	} else {
		document.documentElement.classList.remove("dark")
		setTheme("light")
	}
}

// Initialize the mode based on localStorage
onMounted(() => {
	const savedTheme = getTheme()
	if (savedTheme) {
		isDarkMode.value = savedTheme === "dark"
		if (isDarkMode.value) {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}
	}
})

useHead({
	script: [
		{
			children: `if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                document.documentElement.classList.add("dark");

        } else {
            document.documentElement.removeAttribute("data-theme")
                document.documentElement.classList.remove("dark");

        }`,
		},
	],
})
</script>

<template>
	<div
		@click="toggleMode"
		class="bg-surface border border-outline hover:bg-surface-container-highest hover:border hover:border-outline/70 cursor-pointer rounded-lg p-[0.35rem] w-7 h-7 flex items-center justify-center"
	>
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
	</div>
</template>

<style scoped></style>
