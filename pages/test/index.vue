<template>
	<div
		class="flex flex-col gap-2 bg-surface w-screen h-screen overflow-x-hidden overflow-y-auto p-5"
	>
		<NuiModeSelector class="fixed top-3 right-3" />
		<div>
			<NuiChart :type="type" :data="chartData" />
		</div>
		<!-- surfaces -->
		<div class="flex flex-col gap-3">
			<span class="text-on-surface">Surfaces</span>
			<div
				class="flex gap-3 items-center justify-between"
			>
				<div
					class="w-full h-24 rounded-xl bg-surface border border-outline flex items-center justify-center"
				>
					<span class="text-on-surface">surface</span>
				</div>
				<div
					class="w-full h-24 rounded-xl bg-surface-container border border-outline flex items-center justify-center"
				>
					<span class="text-on-surface"
						>surface-container</span
					>
				</div>
				<div
					class="w-full h-24 rounded-xl bg-surface-container-high border border-outline flex items-center justify-center"
				>
					<span class="text-on-surface"
						>surface-container-high</span
					>
				</div>
				<div
					class="w-full h-24 rounded-xl bg-surface-container-highest border border-outline flex items-center justify-center"
				>
					<span class="text-on-surface"
						>surface-container-highest</span
					>
				</div>
				<div
					class="w-full h-24 rounded-xl bg-surface-variant border border-outline flex items-center justify-center"
				>
					<span class="text-on-surface"
						>surface-container-variant</span
					>
				</div>
			</div>
		</div>
		<!-- primary colors -->
		<div class="flex flex-col gap-3">
			<span class="text-on-surface">Primary</span>
			<div
				class="flex gap-3 items-center justify-between"
			>
				<div
					class="w-full h-24 rounded-xl bg-primary text-on-primary flex items-center justify-center"
				>
					Primary
				</div>
				<div
					class="w-full h-24 rounded-xl bg-primary-light text-on-primary flex items-center justify-center"
				>
					Primary light
				</div>
				<div
					class="w-full h-24 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center"
				>
					Primary container
				</div>
			</div>

			<span class="text-on-surface">Secondary</span>
			<div
				class="flex gap-3 items-center justify-between"
			>
				<div
					class="w-full h-24 rounded-xl bg-secondary text-on-secondary flex items-center justify-center"
				>
					Secondary
				</div>
				<div
					class="w-full h-24 rounded-xl bg-secondary-light text-on-secondary flex items-center justify-center"
				>
					Secondary light
				</div>
				<div
					class="w-full h-24 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center"
				>
					Secondary container
				</div>
			</div>
			<span class="text-on-surface">Tertiary</span>
			<div
				class="flex gap-3 items-center justify-between"
			>
				<div
					class="w-full h-24 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center"
				>
					Tertiary
				</div>
				<div
					class="w-full h-24 rounded-xl bg-tertiary-light text-on-tertiary flex items-center justify-center"
				>
					Tertiary light
				</div>
				<div
					class="w-full h-24 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center"
				>
					Tertiary container
				</div>
			</div>
			<span class="text-on-surface">Error colors</span>
			<div
				class="flex gap-3 items-center justify-between"
			>
				<div
					class="w-full h-24 rounded-xl bg-error text-on-error flex items-center justify-center"
				>
					Error
				</div>
				<div
					class="w-full h-24 rounded-xl bg-error-light text-on-error flex items-center justify-center"
				>
					Error
				</div>
				<div
					class="w-full h-24 rounded-xl bg-error-container text-on-error-container flex items-center justify-center"
				>
					Error
				</div>
			</div>
		</div>
		<!-- input -->
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
		<!-- toggle -->
		<div class="flex items-center gap-3">
			<NuiToggle name="toggle" size="sm" />
			<NuiToggle name="toggle" size="md" />
			<NuiToggle name="toggle" size="lg" disabled />
		</div>
		<!-- avatar -->
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
</template>

<script setup lang="ts">
const type = "line"
const chartData = [2725, 2680, 2500, 2760, 2678]
</script>

<style scoped></style>
