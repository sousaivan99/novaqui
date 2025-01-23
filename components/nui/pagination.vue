<script setup>
const props = defineProps({
  pagination: {
    type: Object,
    required: true,
    default: () => ({
      total: 0,
      per_page: 10,
      current_page: 1,
      last_page: 1,
      next_page_url: null,
      prev_page_url: null
    })
  }
})

const emit = defineEmits(['page-changed'])

const changePage = (page) => {
  if (page >= 1 && page <= props.pagination.last_page) {
    emit('page-changed', page)
  }
}
</script>

<template>
  <div class="flex items-center justify-center gap-2 p-4">
    <!-- First page button (only show when not on first page) -->
    <NuiButton
      mode="text"
      variant="normal"
      icon="material-symbols:first-page"
      @click="changePage(1)"
      :disabled="pagination.current_page === 1"
    />

    <!-- Previous button -->
    <NuiButton
      mode="text"
      variant="normal"
      icon="material-symbols:chevron-left"
      :disabled="!pagination.prev_page_url"
      @click="changePage(pagination.current_page - 1)"
    />

    <!-- Page indicator -->
    <span class="min-w-[80px] text-center label-xs">
      {{ pagination.current_page }} OF {{ pagination.last_page }}
    </span>

    <!-- Next button -->
    <NuiButton
      mode="text"
      variant="normal"
      icon="material-symbols:chevron-right"
      :disabled="!pagination.next_page_url"
      @click="changePage(pagination.current_page + 1)"
    />
  </div>
</template>
