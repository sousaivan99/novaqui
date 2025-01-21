<script setup lang="ts">
interface SelectOption {
  name: string
  link: string
  icon?: string
  children?: {
    label: string
    icon: string
    link: string
  }[]
}

export interface SelectboxProps {
  modelValue: SelectOption | null
  options: SelectOption[]
}

const props = defineProps<SelectboxProps>()
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const handleSelect = (option: SelectOption) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside) 
})

</script>

<template>
  <div class="relative w-full">
    <div
      @click="isOpen = !isOpen"
      class="flex items-center justify-between min-w-[230px] px-4 py-2 rounded-lg border border-outline bg-surface-container-high text-on-surface cursor-pointer"
    >
      <div class="flex items-center gap-2">
        <Icon 
          v-if="modelValue?.icon" 
          :name="modelValue.icon" 
          class="min-w-3 min-h-3"
        />
        <span class="label-sm">{{ modelValue?.name || 'Select an option' }}</span>
      </div>
      <Icon
        name="material-symbols:keyboard-arrow-down-rounded"
        class="min-w-5 min-h-5 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </div>
    <Transition name="selectbox">
      <div
        v-if="isOpen"
        class="absolute flex flex-col gap-1 z-10 w-full mt-1 p-2 rounded-xl border border-outline bg-surface-container-high shadow-lg"
    >
      <div
        v-for="option in options" 
        :key="option.link"
        @click="handleSelect(option)"
        class="flex items-center gap-2 p-2 rounded-lg text-on-surface hover:bg-surface-container-highest cursor-pointer"
        :class="{ ' bg-surface-variant': option.name === modelValue?.name }"
      >
        <Icon 
          v-if="option.icon" 
          :name="option.icon" 
          class="min-w-3 min-h-3"
        />
        <span class="label-sm">{{ option.name }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.selectbox-enter-active,
.selectbox-leave-active {
  transition: opacity 0.15s ease, scale 0.15s ease, transform 0.15s ease;
}

.selectbox-enter-from,
.selectbox-leave-to {
  opacity: 0;
  scale: 0.9;
  transform: translateY(-10px);
}
</style>
