<template>
	<div>
		<canvas v-if="chartData" ref="chart"></canvas>
		<p v-else>No Data</p>
	</div>
</template>

<script setup lang="ts">
import {
	ref,
	onMounted,
	onBeforeUnmount,
	watch,
	nextTick,
} from "vue"
import Chart from "chart.js/auto"

interface ChartProps {
	type: string
	demo?: boolean
	labels?: string[]
	label?: string
	data?: number[]
}

const {
	type = "line",
	data,
	labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
	],
	label = "Value",
} = defineProps<ChartProps>()

const chart = ref(null)
const chartData = defineModel()

const getTheme = () => {
	return localStorage.getItem("theme")
}

const getPrimaryColor = () => {
	return `rgb(${getComputedStyle(
		document.documentElement.classList.contains("dark")
			? document.querySelector(".dark")
			: document.documentElement,
	)
		.getPropertyValue("--color-primary")
		.trim()
		.split(" ")
		.join(",")})`
}

const updateChartColors = () => {
	if (chart.value && chart.value.chartInstance) {
		const chartInstance = chart.value.chartInstance
		const ctx = chart.value.getContext("2d")

		chartInstance.data.datasets.forEach((dataset) => {
			dataset.borderColor = getPrimaryColor()
		})
		chartInstance.options.elements.line.backgroundColor =
			getGradient(ctx)
		chartInstance.update()
	}
}

const getGradient = (ctx: CanvasRenderingContext2D) => {
	const height =
		ctx.canvas.clientHeight || ctx.canvas.height
	const gradient = ctx.createLinearGradient(
		0,
		0,
		0,
		height,
	)
	gradient.addColorStop(0, getPrimaryColor())

	gradient.addColorStop(
		1,
		getPrimaryColor()
			.replace("rgb", "rgba")
			.replace(")", ", 0.001)"),
	)
	return gradient
}
onMounted(() => {
	if (chartData.value) {
		nextTick(() => {
			const ctx = chart.value.getContext("2d")
			const chartInstance = new Chart(chart.value, {
				type: type,
				data: {
					labels: labels,
					datasets: [
						{
							label: label,
							data: chartData.value,
                            backgroundColor: type === "bar" ? getPrimaryColor() : getGradient(ctx),
							borderColor: getPrimaryColor(),
							borderWidth: 1,
						},
					],
				},
				options: {
					elements: {
						line: {
							fill: true,
							backgroundColor: getGradient(ctx),
							tension: 0.4, // Smooth the line
						},
					},
					responsive: true,
					plugins: {
						tooltip: {
							enabled: true,
							intersect: false,
						},
						legend: {
							display: false,
						},
					},
					maintainAspectRatio: false,
					scales: {
						x: {
							grid: {
								display: false,
							},
						},
						y: {
							grid: {
								display: false,
							},
						},
					},
				},
			})
			chart.value.chartInstance = chartInstance
		})
	}
})

watch(
	() => chartData.value,
	(newData) => {
		if (chart.value && chart.value.chartInstance) {
			const chartInstance = chart.value.chartInstance
			chartInstance.data.datasets[0].data = newData
			chartInstance.update()
		}
	},
)

onMounted(() => {
	const observer = new MutationObserver(() => {
		updateChartColors()
	})

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class"],
	})

	onBeforeUnmount(() => {
		observer.disconnect()
	})
})
</script>

<style scoped></style>
