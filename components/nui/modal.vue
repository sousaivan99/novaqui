<script setup lang="ts">
interface Props {
	title: string
	fullScreen?: boolean
}

const { title, fullScreen = false } =
	defineProps<Props>()

const model = defineModel()
const { layout } = useBreakpoints()

const handleKeydown = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		model.value = false
	}
}

onMounted(() => {
	window.addEventListener("keydown", handleKeydown)
})

onBeforeUnmount(() => {
	window.removeEventListener("keydown", handleKeydown)
})
</script>

<template>
	<div
		v-show="model"
		class="fixed flex items-center bg-black/70 backdrop-blur-[2px] w-full h-full justify-center top-0 left-0 z-20 duration-150 transition-all ease-in-out modal-container"
		:class="{
			'opacity-0 scale-out-center': !model,
			'opacity-100 ': model,
		}"
		
	></div>
	<transition name="modal">
		<div
			v-if="model"
			class="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-30"
			@click="model = false"
		>
			<div
				class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface-container flex flex-col shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 ease-out"
				:class="{
					'min-w-[700px] max-w-[90%] h-[450px] max-h-[70%]':
						!fullScreen && layout !== 'mobile',
					'w-full h-full rounded-none border-0':
						!fullScreen && layout === 'mobile',
					' w-full h-full rounded-none border-0':
						fullScreen,
				}"
				 @click.stop
			>
				<!-- header -->
				<div
					class="w-full flex items-center justify-between p-3 border-b border-outline"
				>
					<span class="label-lg text-on-surface">{{
						title
							? title
							: "add title to prop named: title"
					}}</span>

					<div
						@click="model = false"
						class="flex items-center justify-center w-[32px] h-[32px] hover:bg-surface-container-high rounded-full cursor-pointer"
					>
						<Icon
							name="mdi:close"
							class="text-on-surface"
						/>
					</div>
				</div>
				<!-- body -->
				<div
					class="flex flex-col w-full h-full p-4 text-on-surface overflow-x-hidden overflow-y-auto"
				>
					<slot name="body">
						add content to #body
					</slot>
				</div>
				<!-- footer -->
				<div
					class="w-full h-fit flex items-center justify-end p-3 border-t border-outline"
				>
					<slot name="footer">
						<NuiButton type="filled">
							add your button to #footer
						</NuiButton>
					</slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
	transition: all 0.2s;
}

.modal-enter-from,
.modal-leave-to {
	transform: scale(0.9);
	opacity: 0;
}
</style>
