<script setup lang="ts">

interface InputProps {
  label?: string;
  icon?: string;
  trailingIcon?: string;
  disabled?: boolean;
  hint?: string;
  error?:boolean
}


const {label= 'label text', icon, trailingIcon, disabled, error, hint = 'hint text'} = defineProps<InputProps>();
</script>
<template>
  <div class="flex flex-col gap-[4px] max-w-[300px]">
    <div>
      <span class="label-small"><NuiLabel :label="label" /></span>
    </div>
    <div class="w-fit h-fit relative">
        <Icon v-if="icon" :name="icon"  class="absolute left-[10px] top-1/2 -translate-y-1/2 w-[21px] h-full text-[#99A0AE] " />
        <input type="text" placeholder="Placeholder text..." class="rounded-[6px] border px-[15px] py-[12px] border-[#F5F7FA]  h-[40px] hover:bg-[#F5F7FA]" 
        :class="{ 'pl-[35px]' : icon }" :disabled="disabled"
        />
    </div>
    <div>
      <NuiHintText :error="error" :disabled="disabled">{{ hint }}</NuiHintText>
    </div>
  </div>
</template>


<style scoped></style>
