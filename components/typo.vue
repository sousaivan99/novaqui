<script setup lang="ts">
const { myLayer } = useAppConfig();
</script>

<template>
  <div class="flex flex-col text-on-surface w-full gap-10">
    <h1 class="label-xl">Typography</h1>
    <div class="flex w-full gap-10">
      <div class="flex flex-col w-full gap-2">
        <h2 class="label-xl ">Title</h2>
        <hr />
        
        <span class="title-xl">title-xl</span>
        <span class="title-lg">title-lg</span>
        <span class="title-md">title-md</span>
        <span class="title-sm">title-sm</span>
        <span class="title-xs">title-xs</span>
      </div>
      <div class="flex flex-col w-full gap-2">
        <h2 class="label-xl ">body</h2>
        <hr />
        
        <span class="body-xl">body-xl</span>
        <span class="body-lg">body-lg</span>
        <span class="body-md">body-md</span>
        <span class="body-sm">body-sm</span>
        <span class="body-xs">body-xs</span>
      </div>
      
      <div class="flex flex-col w-full gap-2">
        <h2 class="label-xl ">label</h2>
        <hr />
        
        <span class="label-xl">label-xl</span>
        <span class="label-lg">label-lg</span>
        <span class="label-md">label-md</span>
        <span class="label-sm">label-sm</span>
        <span class="label-xs">label-xs</span>
      </div>
    </div>
  </div>
</template>
