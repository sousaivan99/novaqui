import { ref, onMounted, onUnmounted } from "vue"

export function useBreakpoints() {
  const layout = ref("desktop")

  const updateLayout = () => {
    const width = window.innerWidth
    if (width < 600) {
      layout.value = "mobile"
    } else if (width < 840) {
      layout.value = "tablet"
    } else {
      layout.value = "desktop"
    }
  }

  onMounted(() => {
    updateLayout()
    window.addEventListener("resize", updateLayout)
  })

  onUnmounted(() => {
    window.removeEventListener("resize", updateLayout)
  })

  return {
    layout
  }
}
