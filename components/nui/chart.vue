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
	showAxes?: boolean
}

const {
	type = "line",
	labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
	],
	label = "Value",
	data = [],
	showAxes = false,
} = defineProps<ChartProps>()

const chart = ref(null)
const chartData = defineModel()

if (data.length > 0) {
	chartData.value = data
}

watch(
	() => data,
	(newData) => {
		if (newData.length > 0) {
			chartData.value = newData
		}
	},
)

const getPrimaryColor = () => {
	return `rgb(${getComputedStyle(
		document.documentElement.className.includes(
			"theme-",
		) ||
			document.documentElement.classList.contains(
				"dark",
			)
			? document.querySelector("[class*='theme-']") ||
					document.querySelector(".dark")
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

		if (!['pie', 'doughnut'].includes(type)) {
			chartInstance.data.datasets.forEach((dataset) => {
				dataset.borderColor = getPrimaryColor()
				dataset.backgroundColor = type === "bar"
					? getPrimaryColor()
					: getGradient(ctx)
			})
			chartInstance.options.elements.line.backgroundColor = getGradient(ctx)
			chartInstance.update()
		}
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
	gradient.addColorStop(
		0,
		getPrimaryColor()
			.replace("rgb", "rgba")
			.replace(")", ", 0.5)"),
	)

	gradient.addColorStop(
		1,
		getPrimaryColor()
			.replace("rgb", "rgba")
			.replace(")", ", 0.001)"),
	)
	return gradient
}

const getRandomColors = (count: number) => {
	const colors = [
		'#FF6B6B', // Coral red
		'#4ECDC4', // Turquoise
		'#45B7D1', // Sky blue
		'#96CEB4', // Sage green
		'#FFEEAD', // Cream yellow
		'#D4A5A5', // Dusty rose
		'#9B5DE5', // Purple
		'#F15BB5', // Pink
		'#00BBF9', // Bright blue
		'#00F5D4'  // Mint
	];
	return colors.slice(0, count);
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
							backgroundColor: ['pie', 'doughnut'].includes(type)
								? getRandomColors(chartData.value.length)
								: type === 'bar'
									? getPrimaryColor()
									: getGradient(ctx),
							borderColor: ['pie', 'doughnut'].includes(type)
								? 'transparent'
								: getPrimaryColor(),
							borderWidth: ['pie', 'doughnut'].includes(type) ? 0 : 2,
						},
					],
				},
				options: {
					elements: {
						line: {
							fill: true,
							backgroundColor: type === 'bar'
								? getPrimaryColor()
								: getGradient(ctx),
							tension: 0.4,
						},
					},
					responsive: true,
					plugins: {
						tooltip: {
							enabled: true,
							intersect: false,
						},
						legend: {
							display: ['pie', 'doughnut'].includes(type),
							position: 'bottom',
						},
					},
					maintainAspectRatio: false,
					scales: {
						x: {
							display: showAxes,
							grid: {
								display: false,
							},
						},
						y: {
							display: showAxes,
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
