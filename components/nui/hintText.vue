<script lang="ts" setup>
defineProps<{
  error?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-1">
    <Icon
      name="mdi:information"
      size="16"
      class="text-gray-400"
      :class="{ '!text-[#FB3748]': error, '!text-gray-300': disabled }"
    />
    <span
      class="body-xs text-gray-400"
      :class="{ '!text-[#FB3748]': error, '!text-gray-300': disabled }"
    >
      <slot />
    </span>
  </div>
</template>

<style scoped></style>