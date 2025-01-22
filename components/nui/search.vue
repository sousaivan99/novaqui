<template>
  <div class="relative">
    <div class="w-full h-fit relative">
      <div class="absolute left-[10px] top-1/2 -translate-y-1/2 flex items-center w-fit h-fit">
        <Icon
          v-if="!modelValue" 
          name="heroicons:magnifying-glass-20-solid"
          class="w-[21px] h-[21px] text-on-surface-variant"
        />
        <Icon
          v-else
          name="heroicons:x-mark-20-solid" 
          class="w-[21px] h-[21px] text-on-surface-variant cursor-pointer"
          @click="$emit('update:modelValue', '')"
        />
      </div>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        type="text"
        class="rounded-lg body-xs w-full text-on-surface border py-[12px] border-outline h-[40px] focus:outline focus:outline-2 focus:outline-outline duration-100 transition-color ease-in-out pl-[35px] pr-[35px] bg-surface hover:bg-surface-variant"
        v-bind="$attrs"
      />
      <div 
        v-if="trailingIcon"
        class="w-fit h-fit absolute right-[10px] top-1/2 flex items-center justify-center -translate-y-1/2"
      >
        <slot name="trailing-icon">
          <Icon
            :name="trailingIcon"
            class="w-[21px] h-[21px] text-on-surface-variant"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  trailingIcon: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>
