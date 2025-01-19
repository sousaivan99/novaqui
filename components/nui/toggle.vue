<script setup lang="ts">
interface Props {
    disabled?: boolean;
    name: string;
    size?: 'sm' | 'md' | 'lg';
}

const { disabled, size = 'md' } = defineProps<Props>();
const model = defineModel();

const toggleCheckbox = () => {
    if (!disabled) {
        model.value = !model.value;
    }
};
</script>

<template>
    <div class="light group/item transition-all duration-150 ease-in-out flex items-center justify-center rounded-full"
        :class="{
            'bg-soft border border-soft box-content': disabled,
            'bg-primary': model && !disabled,
            'bg-softer': !model && !disabled,
            'w-[28px] h-[16px]': size === 'sm',
            'w-[34px] h-[20px]': size === 'md',
            'w-[36px] h-[20px]': size === 'lg',
        }">
        <label
            class="group/content  transition-all duration-150 ease-in-out relative rounded-full overflow-hidden  focus:outline-none focus:ring-1 ring-offset-1"
            :class="{
                'group-hover/item:bg-primary  hover:cursor-pointer focus:ring-primary active:shadow-md':
                    model && !disabled,
                'group-hover/item:bg-softer  hover:cursor-pointer focus:ring-softer ':
                    !model && !disabled,
                'border-softer ': disabled,
                'w-[28px] h-[16px] p-[2px]': size === 'sm',
                'w-[34px] h-[20px] p-[3px]': size === 'md',
                'w-[36px] h-[20px] p-[2px]': size === 'lg',
            }" :tabindex="disabled ? '-1' : '0'" @keydown.enter.prevent="toggleCheckbox">
            <input hidden type="checkbox" v-model="model" :disabled="disabled" tabindex="-1" :name="name" :id="name" />

            <div class="h-full transition-all duration-150 ease-in-out aspect-square rounded-full flex items-center justify-center p-1"
                :class="{
                    'translate-x-full bg-white': model,
                    'translate-x-0 bg-white shadow-xl': !model,
                    '!bg-softer': disabled,
                }">

            </div>
        </label>
    </div>
</template>

<style scoped>
.hidden {
    opacity: 0;
    width: 0;
    height: 0;
}
</style>