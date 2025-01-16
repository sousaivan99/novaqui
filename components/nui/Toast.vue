<script setup>
const { toasts, removeToast } = useToast()
const toastContainer = ref()
let intervalId = null
// Function to update the progress of each toast
function updateProgress() {
	toasts.value.forEach((toast) => {
		const timeElapsed = Date.now() - toast.startTime
		toast.progress = Math.max(
			100 - (timeElapsed / toast.duration) * 100,
			0,
		)
		if (toast.progress === 0) {
			removeToast(toast.id)
		}
	})
}

// Watch for toasts and start the interval when toasts are present
watch(
	toasts,
	() => {
		// Only start the interval in the browser
		if (toasts.value.length > 0 && !intervalId) {
			intervalId = setInterval(() => {
				if (toasts.value.length === 0) {
					clearInterval(intervalId)
					intervalId = null
				} else {
					updateProgress()
				}
			}, 100) // Update every 100ms
		}
	},
	{ deep: true, immediate: true },
)

// Clear the interval when the component is unmounted
onBeforeUnmount(() => {
	if (intervalId) {
		clearInterval(intervalId)
	}
})

</script>
<template>
	<div ref="toastContainer" v-auto-animate="{ duration: 150,disrespectUserMotionPreference: false }" class="toast-container">
		<div
			v-for="toast in toasts"
			:key="toast.id"
			class="toast flex items-center justify-between gap-4"
			:class="toast.type"
		>
			<Icon
				v-if="toast.type === 'info'"
				name="material-symbols:info"
			/>
			<Icon
				v-if="toast.type === 'success'"
				name="material-symbols:check"
			/>
			<Icon
				v-if="toast.type === 'warning'"
				name="material-symbols:warning-rounded"
			/>
			<Icon
				v-if="toast.type === 'error'"
				name="material-symbols:error"
			/>

			{{ toast.message }}
			<div
				class="progress-bar"
				:style="{ width: toast.progress + '%' }"
			></div>

			<button
				@click="removeToast(toast.id)"
				class="flex items-center justify-center p-1 rounded-full duration-150 transition-colors ease-in-out"
				:class="{
					'hover:bg-blue-300': toast.type === 'info',
					'hover:bg-success-light':
						toast.type === 'success',
					'hover:bg-amber-300':
						toast.type === 'warning',
					'hover:bg-error-light':
						toast.type === 'error',
				}"
			>
				<Icon name="material-symbols:close-rounded" />
			</button>
		</div>
	</div>
</template>
<style scoped>
.toast-container {
	position: fixed;
	top: 10px;
	right: 10px;
	z-index: 1000;
}

.toast {
	margin-bottom: 10px;
	padding: 10px 20px;
	border-radius: 4px;
	background-color: #333;
	color: white;
	position: relative;
}

.toast .progress-bar {
	position: absolute;
	bottom: 0;
	left: 0;
	height: 5px;
	background-color: rgba(255, 255, 255, 0.7);
	transition: width 0.1s linear;
}

.toast.info {
	@apply bg-blue-500;
}

.toast.success {
	@apply bg-success;
}
.toast.warning {
	@apply bg-amber-500;
}

.toast.error {
	@apply bg-error;
}

button {
	background: none;
	border: none;
	color: inherit;
	margin-left: 10px;
	cursor: pointer;
}
</style>
