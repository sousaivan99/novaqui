<script setup lang="ts">

interface InputProps {
  label?: string;
  subLabel?: string;
  icon?: string;
  trailingIcon?: string;
  disabled?: boolean;
  hint?: string;
  error?: boolean
  required?: boolean;
}


const { label = 'label text here', subLabel = 'Sub label here', icon, trailingIcon, disabled, error, hint, required } = defineProps<InputProps>();

const modelValue = defineModel<string>();

</script>
<template>
  <div class="flex flex-col gap-[4px] max-w-[350px]">
    <div>
      <span class="label-small">
        <NuiLabel :label="label" :sub-label="subLabel" :required="required" />
      </span>
    </div>
    <div class="w-fit h-fit relative">
      <div v-if="icon" class="absolute left-[10px] top-1/2 -translate-y-1/2  flex items-center w-fit h-fit">
        <Icon :name="icon" class=" w-[21px] h-[21px] text-soft " />
      </div>
      <input v-model="modelValue" type="text" placeholder="Placeholder text..."
        class="rounded-[6px] border py-[12px] border-outline h-[40px] hover:bg-outline/70 focus:outline focus:outline-2  focus:outline-outline-variant duration-100 transition-color ease-in-out"
        :class="{
          'pl-[35px]': icon,
          'pl-[15px]': !icon,
          'pr-[35px]': trailingIcon,
          'pr-[15px]': !trailingIcon,

          'border-error': error,
          'border-gray-300': disabled
        }" :disabled="disabled" />

      <div v-if="trailingIcon"
        class="w-fit h-fit absolute right-[10px] top-1/2 flex items-center justify-center -translate-y-1/2">
        <slot name="trailingIcon">
          <Icon :name="trailingIcon" class=" w-[21px] h-[21px] text-soft " />
        </slot>
      </div>
    </div>
    <div v-if="hint">
      <NuiHintText :error="error" :disabled="disabled">{{ hint }}</NuiHintText>
    </div>
  </div>
</template>


<style scoped></style>
