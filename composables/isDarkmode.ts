import { ref, onMounted, onUnmounted } from "vue"

export function useIsDarkmode() {
	const isDark = ref(false)

	const checkDarkMode = () => {
		isDark.value =
			document.documentElement.classList.contains(
				"dark",
			)
	}

	let observer

	onMounted(() => {
		checkDarkMode() // Initial check

		// Create a MutationObserver to observe changes to the class attribute of the html element
		observer = new MutationObserver(() => {
			checkDarkMode()
		})

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		})
	})

	onUnmounted(() => {
		if (observer) {
			observer.disconnect() // Disconnect the observer when the component is unmounted
		}
	})

	return isDark
}
