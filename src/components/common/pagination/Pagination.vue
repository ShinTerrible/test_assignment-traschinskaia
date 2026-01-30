<script lang="ts" setup>
import IconArrowLeft from "../../icons/IconArrowLeft.vue";
import Button from "../buttons/Button.vue";
import IconArrowRight from "../../icons/IconArrowRight.vue";
import { computed } from "vue";

interface Props {
  currentPage: number;
  totalPages: number;
}

interface Emit {
  (e: "page-change", page: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5; 
  const half = Math.floor(maxVisible / 2); // 2

  let start = props.currentPage - half;
  let end = props.currentPage + half;

  if (start < 1) {
    start = 1;
    end = Math.min(props.totalPages, start + maxVisible - 1);
  }

  if (end > props.totalPages) {
    end = props.totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

function goToPage(page: number) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("page-change", page);
  }
}

function goToPrevPage() {
  if (props.currentPage > 1) {
    emit("page-change", props.currentPage - 1);
  }
}

function goToNextPage() {
  if (props.currentPage < props.totalPages) {
    emit("page-change", props.currentPage + 1);
  }
}

function goToFirstPage() {
  if (props.currentPage !== 1) {
    emit("page-change", 1);
  }
}

function goToLastPage() {
  if (props.currentPage !== props.totalPages) {
    emit("page-change", props.totalPages);
  }
}
</script>

<template>
  <nav aria-label="Pagination" class="navigation">
    <Button
      variant="secondary"
      class="button first-page"
      :disabled="currentPage === 1"
      @click="goToFirstPage"
    >
      <template #icon>
        <IconArrowLeft />
        <IconArrowLeft style="margin-left: -8px" />
      </template>
    </Button>

    <Button
      variant="secondary"
      class="button"
      :disabled="currentPage === 1"
      @click="goToPrevPage"
    >
      <template #icon><IconArrowLeft /></template>
    </Button>

    <ul class="pagination">
      <li v-for="page in visiblePages" :key="page">
        <a
          href="#"
          @click.prevent="goToPage(page)"
          :class="{ active: currentPage === page }"
          >{{ page }}</a
        >
      </li>
    </ul>

    <Button
      variant="secondary"
      class="button next-page"
      :disabled="currentPage === totalPages"
      @click="goToNextPage"
    >
      <template #icon><IconArrowRight /></template>
    </Button>

    <Button
      variant="secondary"
      class="button last-page"
      :disabled="currentPage === totalPages"
      @click="goToLastPage"
    >
      <template #icon>
        <IconArrowRight />
        <IconArrowRight style="margin-left: -8px" />
      </template>
    </Button>
  </nav>
</template>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: row;

  @media (min-width: 360px) and (max-width: 768px) {
    & {
      justify-content: space-between;
      width: 100%;
    }
  }
}

.pagination {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  gap: 2px;
  margin-inline: 6px;

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    text-align: center;
    font-family: "Gothampro-normal";
    font-size: 12px;
    line-height: 130%;
    letter-spacing: 0;
    width: 36px;
    height: 36px;
    color: var(--vt-c-grey-1);
    background-color: transparent;
    cursor: pointer;
    padding: auto;
    border-radius: 8px;

    &:hover {
      background-color: var(--vt-f-white);
    }

    &:active {
      background-color: var(--vt-c-light-grey-4);
    }
  }
}

.button {
  color: var(--vt-c-dark-grey-2);
  padding: 12px 16px;

  &:first-of-type {
    margin-inline-end: 24px;
  }

  &:last-of-type {
    margin-inline-start: 24px;
  }
}
</style>
