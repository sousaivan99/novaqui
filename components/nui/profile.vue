<template>
	<div
		class="w-full h-[25px] flex items-center justify-center relative profile-cont"
	>
		<div
			@click.stop="toggle"
			class="hover:opacity-70 w-[32px] h-[32px] border border-outline rounded-full cursor-pointer flex items-center justify-center overflow-hidden transition-all duration-100 ease-in-out"
		>
			<img
				v-if="first_name"
				:src="src"
				:alt="first_name"
				class="w-full h-full rounded-full"
			/>
			<div
				v-else
				class="w-full h-full bg-surface-container"
			/>
		</div>
		<Transition name="fade">
			<div
				v-if="isOpen"
				class="absolute profile right-0 top-full translate-y-3 rounded-xl w-[270px] h-fit bg-surface-container z-[1] shadow-md border border-outline flex flex-col justify-between"
			>
				<!-- Profile -->
				<div class="w-full h-fit p-2">
					<div
						class="w-full h-fit px-3 py-4 bg-primary rounded-lg flex items-center gap-4"
					>
						<div
							class="max-w-[32px] max-h-[32px] flex items-center justify-center rounded-full"
						>
							<img
								:src="src"
								:alt="first_name"
								class="w-full h-full rounded-full"
							/>
						</div>
						<div class="w-full flex flex-col">
							<span class="body-sm text-white">
								{{ first_name }} {{ last_name }}
							</span>
							<span
								class="body-xs opacity-70 text-white"
								>{{ email }}</span
							>
						</div>
					</div>
				</div>

				<!-- selectors -->
				<div
					class="w-full flex flex-col justify-end p-2"
				>
					<div class="flex flex-col py-2 gap-2">
						<div
							class="flex items-center justify-between"
						>
							<span class="body-xs text-on-surface"
								>Darkmode</span
							>
							<NuiToggle
								name="darkmode"
								v-model="isDarkMode"
							/>
						</div>
						<div
							class="flex items-center justify-between"
						>
							<span class="body-xs text-on-surface"
								>Theme</span
							>
							<NuiThemeSelector />
						</div>
					</div>
				</div>
				<!-- logout -->
				<div
					@click="userFunction"
					class="w-full h-fit p-2 flex items-center justify-center bg-surface-container-high/70 border-t border-outline cursor-pointer rounded-b-xl hover:bg-surface-container-highest"
				>
					<span class="body-sm text-on-surface"
						>Logout</span
					>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
interface User {
	first_name: string
	last_name: string
	src: string
	email: string
	function?: () => void
}

const {
	first_name,
	last_name,
	src,
	email,
	function: userFunction,
} = defineProps<User>()

const isOpen = ref(false)

const isDarkMode = ref(false) // Default to false
const router = useRouter()

const toggle = () => {
	isOpen.value = !isOpen.value
}

const handleClickOutside = (event) => {
	if (!event.target.closest(".profile")) {
		isOpen.value = false
	}
}

onMounted(() => {
	document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
	document.removeEventListener(
		"click",
		handleClickOutside,
	)
})

// logout

// toggle darkmode
// Utility functions for handling localStorage
const setTheme = (theme) => {
	localStorage.setItem("theme", theme)
}

const getTheme = () => {
	return localStorage.getItem("theme")
}

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

watch(isDarkMode, (value) => {
	if (value) {
		document.documentElement.classList.add("dark")
		setTheme("dark")
	} else {
		document.documentElement.classList.remove("dark")
		setTheme("light")
	}
})

// Initialize the mode based on localStorage
onMounted(() => {
	if (typeof window !== "undefined") {
		const savedTheme = getTheme()
		if (savedTheme) {
			isDarkMode.value = savedTheme === "dark"
			if (isDarkMode.value) {
				document.documentElement.classList.add("dark")
			} else {
				document.documentElement.classList.remove(
					"dark",
				)
			}
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
