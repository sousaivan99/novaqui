<template>
	<NuiToast />
	<div
		class="flex flex-col gap-2 bg-surface w-screen h-screen overflow-x-hidden overflow-y-auto p-2"
	>
		<div class="w-fit flex items-center gap-3">
			<NuiButton
				type="filled"
				@click="showToast('success')"
				>Add success Toast</NuiButton
			>
			<NuiButton type="filled" variant="tonal" @click="showToast('info')"
				>Add info Toast</NuiButton
			>
			<NuiButton
				type="outlined"
				@click="showToast('warning')"
				>Add warning Toast</NuiButton
			>
			<NuiButton type="text" @click="showToast('error')"
				>Add error Toast</NuiButton
			>
		</div>

		<div
			class="fixed bottom-3 right-3 flex items-center gap-2 justify-between z-10"
		>
			<NuiModeSelector />
			<NuiThemeSelector />
		</div>
		<div>
			<NuiDatepicker
				label="Date"
				name="test"
				v-model="date"
			/>
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
				<span class="text-on-surface label-md">
					{{ section.title }}
				</span>
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
		<!-- Typography -->
		<div
			class="flex flex-col gap-3 w-full bg-surface-container p-3 rounded-xl border border-outline shadow-md"
		>
			<Typo />
		</div>
		<!-- charts -->
		<div
			class="flex flex-col gap-3 w-full bg-surface-container p-3 rounded-xl border border-outline shadow-md"
		>
			<span class="text-on-surface label-md"
				>Charts</span
			>
			<div class="grid grid-cols-3 gap-3">
				<template v-for="(chart, index) in chartData">
					<div
						class="w-full flex items-center justify-between flex-col p-3 rounded-xl border border-outline/70 shadow-md"
					>
						<span class="body-xs text-on-surface"
							>Chart {{ index + 1 }}</span
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
			<span class="text-on-surface label-md">
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
		<!-- btn / modals / toggle -->
		<div
			class="flex gap-3 w-full bg-surface-container p-3 rounded-xl border border-outline shadow-md"
		>
			<!-- Buttons -->
			<div
				class="flex flex-col gap-3 w-full border border-outline p-3 rounded-xl shadow-md"
			>
				<span class="text-on-surface label-md"
					>Button Showcase</span
				>

				<div
					class="flex flex-col gap-2 text-on-surface"
				>
					<h3 class="text-on-surface label-md">Filled Buttons</h3>
					<div class="grid grid-cols-2 gap-2">
						<NuiButton type="filled" variant="primary"
							>Filled Primary</NuiButton
						>
						<NuiButton
							type="filled"
							variant="primary"
							disabled
							>Filled Disabled</NuiButton
						>
						<NuiButton type="filled" variant="tonal"
							>Filled Tonal</NuiButton
						>
						<NuiButton
							type="filled"
							variant="tonal"
							disabled
							>Filled Tonal Disabled</NuiButton
						>
						<NuiButton type="text" variant="normal"
							>text Normal</NuiButton
						>
						<NuiButton
							type="text"
							variant="normal"
							disabled
							>Disabled</NuiButton
						>
					</div>
				</div>

				<div
					class="flex flex-col gap-2 text-on-surface"
				>
					<h3 class="text-on-surface label-md">Outlined Buttons</h3>
					<div class="grid grid-cols-2 gap-2">
						<NuiButton type="outlined" variant="primary"
							>Outlined Primary</NuiButton
						>
						<NuiButton
							type="outlined"
							variant="primary"
							disabled
							>Outlined Primary Disabled</NuiButton
						>
						<NuiButton type="outlined" variant="tonal"
							>Outlined Tonal</NuiButton
						>
						<NuiButton
							type="outlined"
							variant="tonal"
							disabled
							>Outlined Tonal Disabled</NuiButton
						>
						<NuiButton type="text" variant="normal"
							>Text Normal</NuiButton
						>
						<NuiButton
							type="outlined"
							variant="normal"
							disabled
							>Outlined Normal Disabled</NuiButton
						>
					</div>
				</div>

				<div
					class="flex flex-col gap-2 text-on-surface"
				>
					<h3 class="text-on-surface label-md">Text Buttons</h3>
					<div class="grid grid-cols-2 gap-2">
						<NuiButton type="text" variant="primary"
							>Text Primary</NuiButton
						>
						<NuiButton
							type="text"
							variant="primary"
							disabled
							>Text Primary Disabled</NuiButton
						>
						<NuiButton type="text" variant="tonal"
							>Text Tonal</NuiButton
						>
						<NuiButton
							type="text"
							variant="tonal"
							disabled
							>Text Tonal Disabled</NuiButton
						>
						<NuiButton type="text" variant="normal"
							>Text Normal</NuiButton
						>
						<NuiButton
							type="text"
							variant="normal"
							disabled
							>Text Normal Disabled</NuiButton
						>
					</div>
				</div>
			</div>
			<!-- Modals / toggle -->

			<div
				class="flex flex-col gap-3 w-full h-full justify-between"
			>
				<!-- Modals -->

				<div
					class="flex flex-col gap-3 w-full h-full border border-outline p-3 rounded-xl shadow-md"
				>
					<span class="text-on-surface label-md">
						Modals
					</span>
					<div class="flex items-center gap-3">
						<div class="flex flex-col gap-3 w-full">
							<NuiButton
								type="filled"
								@click="isOpenModal1 = !isOpenModal1"
								>Open Modal</NuiButton
							>
							<NuiModal
								title="Modal Title"
								v-model="isOpenModal1"
							>
								<template #body>
									<div class="flex flex-col gap-3">
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
								</template>
								<template #footer>
									<NuiButton type="filled" variant="primary"
										>Save</NuiButton
									>
								</template>
							</NuiModal>
						</div>
						<div class="flex flex-col gap-3 w-full">
							<NuiButton
								type="outlined"
								color="secondary"
								@click="isOpenModal2 = !isOpenModal2"
								>Open fullScreen Modal</NuiButton
							>
							<NuiModal
								title="Modal Title"
								full-screen
								v-model="isOpenModal2"
							>
								<template #body>
									<div class="flex flex-col gap-3">
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
								</template>
								<template #footer>
									<NuiButton type="filled"
										>Save</NuiButton
									>
								</template>
							</NuiModal>
						</div>
					</div>
				</div>
				<!-- toggle -->
				<div
					class="flex flex-col gap-3 w-full h-full border border-outline p-3 rounded-xl shadow-md"
				>
					<span class="text-on-surface label-md">
						Toggles
					</span>
					<div class="flex items-center gap-3">
						<NuiToggle name="toggle" size="sm" />
						<NuiToggle name="toggle" size="md" />
						<NuiToggle
							name="toggle"
							size="lg"
							disabled
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- avatar -->
		<div
			class="flex flex-col gap-3 w-full bg-surface-container p-3 rounded-xl border border-outline shadow-md"
		>
			<span class="text-on-surface label-md">
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
const isOpenModal1 = ref(false)
const isOpenModal2 = ref(false)
const date = ref<string>(new Date().toISOString())

const { addToast } = useToast()

function showToast(type: string) {
	addToast("This is a toast message!", type)
}

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

let intervalId: ReturnType<typeof setInterval>

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
