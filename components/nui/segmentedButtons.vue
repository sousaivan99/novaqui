<script setup lang="ts">
interface Tab {
  name: string;
  icon?: string;
}

interface Props {
  modelValue: number;
  options: Tab[];
  class?: string;
  hasLabel?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const updateValue = (index: number) => {
  emit('update:modelValue', index);
};
</script>

<template>
  <div
    class="flex items-center gap-2  h-10 rounded-md p-1 relative bg-surface-container shadow z-0 overflow-hidden"
    :class="props.class"
  >
    <button
      v-for="(option, index) in options"
      :key="option.name"
      class="flex items-center justify-center gap-2 px-4 py-2 h-full rounded-md transition-colors duration-150 relative z-10"
      :class="{
        'text-on-surface bg-surface-container-high': modelValue === index,
        'hover:bg-surface-container-highest text-on-surface/70': modelValue !== index,
      }"
      @click="updateValue(index)"
    >
      <Icon 
        v-if="option.icon" 
        :name="option.icon" 
        size="18" 
        :class="{
          'text-on-surface': modelValue === index,
          'text-on-surface/70': modelValue !== index
        }"
      />
      <span 
        v-if="props.hasLabel" 
        class="label-sm"
        :class="{
          'text-on-surface': modelValue === index,
          'text-on-surface/70': modelValue !== index
        }"
      >
        {{ option.name }}
      </span>
    </button>
  </div>
</template>