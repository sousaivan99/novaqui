<template>
	<div
		class="w-fit h-fit flex items-center justify-center relative profile-cont"
	>
		<div
			class="w-fit h-fit flex items-center cursor-pointer justify-center relative profile-cont gap-2 hover:bg-surface-container p-1 rounded-full"
			@click.stop="toggle"
		>
			<NuiAvatar
				:src="
					user?.src ||
					`https://ui-avatars.com/api/?background=random&name=${user?.name}`
				"
				:bottomStatus="user?.status"
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
						class="w-full h-fit px-3 py-4 bg-primary/20 rounded-lg flex items-center gap-4"
					>
						<NuiAvatar
							:src="
								user?.src ||
								`https://ui-avatars.com/api/?background=random&name=${user?.name}`
							"
							:bottomStatus="user?.status"
						/>
						<div class="w-full flex flex-col">
							<span class="body-sm text-on-surface">
								{{ user?.name }}
							</span>
							<span
								class="body-xs opacity-70 text-on-surface"
								>{{ user?.email }}</span
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
								@change="toggleMode"
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
interface Props {
	user?: User
	function?: () => void
}
interface User {
	name?: string
	src?: string
	email?: string
}

const { user, function: userFunction } =
	defineProps<Props>()

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

const colorMode = useColorMode()

const isDarkMode = computed(() => colorMode.value === 'dark')

const toggleMode = () => {
	colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	
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
