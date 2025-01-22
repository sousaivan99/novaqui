<template>
	<div>
		<!-- Activation slot -->
		<div @click="handleOpen">
			<slot name="activator"></slot>
		</div>

		<Transition name="fade">
			<!-- Scrim and sidesheet -->
			<div v-show="isOpen" class="fixed inset-0">
				<!-- Scrim -->
				<div
					class="fixed inset-0 bg-black/30"
					@click="handleClose"
				></div>
			</div>
		</Transition>

		<!-- Sidesheet container -->
		<div
			class="fixed inset-y-0 right-0 flex max-w-full w-[450px] overflow-hidden p-2"
		>
			<Transition name="slide">
				<!-- Changed v-if to v-show for the sidesheet -->
				<div
					v-show="isOpen"
					class="w-full overflow-hidden flex flex-col h-full bg-surface-container-high rounded-lg border border-outline/20 shadow-lg"
				>
					<div
						class="flex px-3 h-[60px] items-center justify-between border-b border-outline title-xs"
					>
						<slot name="header"></slot>
						<div
							class="flex items-center justify-center w-7 h-7 hover:bg-surface-container-highest p-1 cursor-pointer rounded-full transition-all duration-100 ease-in-out"
							@click="handleClose"
						>
							<Icon
								name="material-symbols:close-rounded"
								size="28"
							/>
						</div>
					</div>
					<div
						class="flex flex-col h-full overflow-y-auto p-3 body-md"
					>
						<slot name="body"></slot>
					</div>
					<div
						class="flex flex-col h-20 items-end justify-center px-3 border-t border-outline"
					>
						<slot name="footer"></slot>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

const emit = defineEmits(["close"])

function handleOpen() {
	isOpen.value = true
}

function handleClose() {
	isOpen.value = false
	emit("close")
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.15s ease-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.slide-enter-active {
	transition: transform 0.15s ease-out;
}

.slide-leave-active {
	transition: transform 0.15s ease-in;
}

.slide-enter-from,
.slide-leave-to {
	transform: translateX(100%);
}
</style>
