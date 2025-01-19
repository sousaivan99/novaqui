// composables/useToast.js
import NotificationSound from "~/assets/sounds/notification.mp3" // Import the notification sound file

// Define the structure of a Toast object
interface Toast {
	id: number
	message: string
	type: string
	startTime: number
	duration: number
	progress: number
}

// Define the shared toasts array, which will hold all active toasts
const toasts = ref<Toast[]>([])

export function useToast() {
	// Function to add a new toast
	function addToast(
		message: string,
		type: string = "info",
		duration: number = 5000,
		playSound: boolean = true,
	): void {
		const id: number = Date.now()
		const startTime = Date.now()

		// Play the notification sound only if 'playSound' is true
		if (playSound) {
			playNotificationSound()
		}

		// Push the new toast into the toasts array
		toasts.value.push({
			id,
			message,
			type,
			startTime,
			duration,
			progress: 100,
		})

		// Automatically remove the toast after the specified duration
		setTimeout(() => {
			removeToast(id)
		}, duration)
	}

	// Function to play the notification sound
	const playNotificationSound = () => {
		const dingSound = new Audio(NotificationSound)
		dingSound.play()
	}

	// Function to remove a toast from the array based on its id
	function removeToast(id: number): void {
		toasts.value = toasts.value.filter(
			(toast: Toast) => toast.id !== id,
		)
	}

	// Return the functions and reactive data that need to be accessed outside
	return {
		addToast,
		removeToast,
		toasts: computed(() => toasts.value),
	}
}
