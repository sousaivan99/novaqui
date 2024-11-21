<template>
	<div
		class="w-full h-[25px] flex items-center justify-center relative profile-cont"
	>
		<div
			@click.stop="toggle"
			class="w-[25px] h-[25px] border border-outline rounded-full cursor-pointer flex items-center justify-center"
		>
			<span>img</span>
		</div>
		<Transition name="fade">
			<div
				v-if="isOpen"
				class="absolute profile left-full bottom-0 translate-x-3 rounded-xl w-[250px] h-fit bg-surface-container shadow-md border border-outline"
			>
				<!-- Profile -->
				<div class="w-full h-fit p-2">
					<div
						class="w-full h-fit px-3 py-4 bg-surface-container-high rounded-lg flex items-center gap-4"
					>
						<div
							class="min-w-[32px] min-h-[32px] flex items-center justify-center border border-outline rounded-full"
						>
							<span>img</span>
						</div>
						<div class="w-full flex flex-col">
							<span class="body-sm text-on-surface"
								>Name</span
							>
							<span
								class="body-xs opacity-70 text-on-surface"
								>Role</span
							>
						</div>
					</div>
				</div>

				<!-- selectors -->
				<div class="w-full h-full p-2 pt-10">
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
					@click="logout"
					class="w-full h-fit p-2 flex items-center justify-center bg-surface-container-high/70 border-t border-outline cursor-pointer rounded-b-xl"
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
const isOpen = ref(false)

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
const logout = async () => {
	const { error: _error } =
		await supabase.auth.signOut()
	if (_error) {
		error.value.push(_error.message)
	} else {
		// Handle successful logout, e.g., redirect to login page
		console.log("Logged out successfully")
		router.push("/login")
	}
}

// toggle darkmode
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
