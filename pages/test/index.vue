<template>
	<div
		class="flex flex-col gap-2 bg-surface w-screen h-screen overflow-x-hidden overflow-y-auto p-2"
	>
		<div
			class="fixed bottom-3 right-3 flex items-center gap-2 justify-between z-10"
		>
			<NuiModeSelector />
			<NuiThemeSelector />
		</div>

		<!-- colors -->
		<div
			class="flex gap-3 w-full bg-surface-container p-3 rounded-xl border border-outline shadow-md"
		>
			<div
				v-for="(section, index) in sections"
				:key="index"
				class="flex flex-col gap-3 w-full"
			>
				<span class="text-on-surface body-md">{{
					section.title
				}}</span>
				<div
					class="flex flex-col gap-3 items-center justify-between"
				>
					<div
						v-for="(item, idx) in section.items"
						:key="idx"
						:class="`w-full h-24 rounded-xl ${item.class} flex items-center justify-center border border-outline shadow-md text-balance`"
					>
						<span class="text-center">{{
							item.text
						}}</span>
					</div>
				</div>
			</div>
		</div>
		<div
			class="flex flex-col gap-3 w-full bg-surface-container p-3 rounded-xl border border-outline shadow-md"
		>
			<span class="text-on-surface body-md"
				>Charts</span
			>
			<div class="grid grid-cols-3 gap-3">
				<template v-for="(chart, index) in chartData">
					<div
						class="w-full flex items-center justify-between flex-col p-3 rounded-xl border border-outline/70 shadow-md"
					>
						<span class="body-xs text-on-surface"
							>Chart {{ index }}</span
						>
						<NuiChart
							:type="type"
							:labels="labels"
							:data="chart"
							class="w-full"
						/>
					</div>
				</template>
			</div>
		</div>
		<!-- input -->
		<div
			class="flex flex-col gap-3 w-full bg-surface-container p-3 rounded-xl border border-outline shadow-md"
		>
			<span class="text-on-surface body-md">
				Inputs
			</span>
			<div class="flex items-center gap-3">
				<NuiInput
					iscon="material-symbols:person"
					trailing-icon="material-symbols:person"
					required
					hint="test"
				/>
				<NuiInput
					iscon="material-symbols:person"
					trailing-icon="material-symbols:person"
					error
					hint="Error not filled"
				/>
				<NuiInput
					icon="material-symbols:person"
					required
					hint="test"
					disabled
				/>
			</div>
		</div>
		<!-- toggle -->
		<div
			class="flex flex-col gap-3 w-full bg-surface-container p-3 rounded-xl border border-outline shadow-md"
		>
			<span class="text-on-surface body-md">
				Toggles
			</span>
			<div class="flex items-center gap-3">
				<NuiToggle name="toggle" size="sm" />
				<NuiToggle name="toggle" size="md" />
				<NuiToggle name="toggle" size="lg" disabled />
			</div>
		</div>
		<!-- avatar -->
		<div
			class="flex flex-col gap-3 w-full bg-surface-container p-3 rounded-xl border border-outline shadow-md"
		>
			<span class="text-on-surface body-md">
				Avatar
			</span>
			<div class="flex items-end gap-3">
				<NuiAvatar
					size="xs"
					src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
					top-status="verified"
					bottom-status="online"
				/>
				<NuiAvatar
					size="sm"
					src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
					top-status="pin"
					bottom-status="offline"
				/>
				<NuiAvatar
					size="md"
					src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
					top-status="favorite"
					bottom-status="busy"
				/>

				<NuiAvatar
					size="lg"
					src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
					top-status="add"
					bottom-status="away"
				/>
				<NuiAvatar
					size="xl"
					src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
					top-status="remove"
					bottom-status="company"
				/>
				<NuiAvatar
					size="2xl"
					src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
					top-status="notification"
					bottom-status="online"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const type = "line"

const sections = [
	{
		title: "Surfaces",
		items: [
			{
				class: "bg-surface text-on-surface",
				text: "surface",
			},
			{
				class: "bg-surface-container text-on-surface",
				text: "surface-container",
			},
			{
				class:
					"bg-surface-container-high text-on-surface",
				text: "surface-container-high",
			},
			{
				class:
					"bg-surface-container-highest text-on-surface",
				text: "surface-container-highest",
			},
			{
				class: "bg-surface-variant text-on-surface",
				text: "surface-container-variant",
			},
		],
	},
	{
		title: "Primary",
		items: [
			{
				class: "bg-primary text-on-primary",
				text: "Primary",
			},
			{
				class: "bg-primary-light text-on-primary",
				text: "Primary light",
			},
			{
				class:
					"bg-primary-container text-on-primary-container",
				text: "Primary container",
			},
		],
	},
	{
		title: "Secondary",
		items: [
			{
				class: "bg-secondary text-on-secondary",
				text: "Secondary",
			},
			{
				class: "bg-secondary-light text-on-secondary",
				text: "Secondary light",
			},
			{
				class:
					"bg-secondary-container text-on-secondary-container",
				text: "Secondary container",
			},
		],
	},
	{
		title: "Tertiary",
		items: [
			{
				class: "bg-tertiary text-on-tertiary",
				text: "Tertiary",
			},
			{
				class: "bg-tertiary-light text-on-tertiary",
				text: "Tertiary light",
			},
			{
				class:
					"bg-tertiary-container text-on-tertiary-container",
				text: "Tertiary container",
			},
		],
	},
	{
		title: "Error colors",
		items: [
			{
				class: "bg-error text-on-error",
				text: "Error",
			},
			{
				class: "bg-error-light text-on-error",
				text: "Error light",
			},
			{
				class:
					"bg-error-container text-on-error-container",
				text: "Error container",
			},
		],
	},
	{
		title: "Success colors",
		items: [
			{
				class: "bg-success text-on-success",
				text: "Success",
			},
			{
				class: "bg-success-light text-on-success",
				text: "Success light",
			},
			{
				class:
					"bg-success-container text-on-success-container",
				text: "Success container",
			},
		],
	},
]
const chartData = ref(
	Array.from({ length: 6 }, () =>
		getRandomValues(5, 2000, 5000),
	),
)
const labels = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
]

let intervalId: number

function getRandomValues(
	count: number,
	min: number,
	max: number,
): number[] {
	return Array.from(
		{ length: count },
		() =>
			Math.floor(Math.random() * (max - min + 1)) + min,
	)
}

onMounted(() => {
	intervalId = setInterval(() => {
		chartData.value = Array.from({ length: 6 }, () =>
			getRandomValues(12, 2000, 5000),
		)
	}, 5000)
})

onUnmounted(() => {
	clearInterval(intervalId)
})
</script>

<style scoped></style>
