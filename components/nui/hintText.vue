<script lang="ts" setup>
defineProps<{
  error?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-1">
    <Icon name="mdi:information" size="16" class="text-soft"
      :class="{ '!text-error': error, '!text-gray-300': disabled }" />
    <span class="body-xs text-soft" :class="{ '!text-error': error, '!text-softer': disabled }">
      <slot />
    </span>
  </div>
</template>

<style scoped></style>