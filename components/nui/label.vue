<script lang="ts" setup>
defineProps<{
  label: string;
  subLabel?: string;
  required?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <div class="flex gap-1 items-center w-fit">
    <span
      class="label-sm"
      :class="{ '!text-gray-300': disabled }"
    >
      {{ label }}
    </span>
    <span
      v-if="required"
      class="text-red-500 label-sm"
      :class="{ '!text-gray-300': disabled }"
      >*</span
    >
    <span
      class="text-slate-600 body-sm"
      :class="{ '!text-gray-300': disabled }"
    >
      {{ subLabel }}
    </span>
    <div :class="{ '!text-gray-300': disabled }">
      <slot name="extra" />
    </div>
  </div>
</template>

<style scoped></style>