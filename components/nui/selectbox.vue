<script setup lang="ts">


interface SelectOption {
  name: string
  slug?: string
  icon?: string
  value?: string | number
  children?: {
    label: string
    icon: string
    value: string
  }[]
}

export interface SelectboxProps {
  modelValue: string | null
  options: SelectOption[]
}

const props = defineProps<SelectboxProps>()
const emit = defineEmits(['update:modelValue'])
const selectedOption = ref(props.options.find(item => item.value === props.modelValue)?.name)

const isOpen = ref(false)

const handleSelect = (option: string) => {
  selectedOption.value = props.options.find(item => item.value === option)?.name
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
  <div class="relative w-full h-fit">
    <div
      @click="isOpen = !isOpen"
      class="flex items-center h-10 justify-between w-full gap-4 px-4 py-2 rounded-md border border-outline bg-surface-container-high text-on-surface cursor-pointer"
    >
      <div class="flex items-center gap-4">
        <Icon 
          v-if="options.find(item => item.value === modelValue)?.icon" 
          :name="options.find(item => item.value === modelValue)?.icon" 
          class="min-w-3 min-h-3"
        />
        <span class="label-sm select-none whitespace-nowrap">{{ selectedOption || 'Select an option' }}</span>
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
        class="absolute select-none flex flex-col gap-1 z-10 w-full mt-1 p-2 rounded-md border border-outline bg-surface-container-high shadow-lg"
    >
      <div
        v-for="option in options" 
        :key="option.name"
        @click="handleSelect(option.value)"
        class="flex items-center gap-2 p-2 rounded-md text-on-surface hover:bg-surface-container-highest cursor-pointer"
        :class="{ ' bg-surface-variant': option.value === options.find(item => item.name === selectedOption)?.value }"
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
