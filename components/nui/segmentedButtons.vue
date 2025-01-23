<script setup lang="ts">
interface Tab {
  name: string;
  icon?: string;
}

interface Props {
  modelValue: number;
  options: Tab[];
  class?: string;
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
    class="flex items-center gap-2 p-2 rounded-xl bg-surface relative"
    :class="props.class"
  >
    <div
      class="absolute bg-surface-container rounded-md transition-all duration-150 ease-in-out"
      :style="{
        left: `${(modelValue * 100) / options.length + 4}%`,
        width: `${100 / options.length - 8}%`,
        height: 'calc(100% - 16px)',
      }"
    />
    <button
      v-for="(option, index) in options"
      :key="option.name"
      class="flex items-center gap-2 px-3 py-1 rounded-md transition-colors duration-150 relative z-10 flex-1"
      :class="{
        'text-on-surface': modelValue === index,
        'hover:bg-surface-container/50 text-on-surface': modelValue !== index,
      }"
      @click="updateValue(index)"
    >
      <Icon v-if="option.icon" :name="option.icon" />
      <span class="label-lg">{{ option.name }}</span>
    </button>
  </div>
</template>