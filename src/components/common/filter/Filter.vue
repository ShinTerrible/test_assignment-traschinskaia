<script setup lang="ts">
import { ref } from "vue";
import DropdownFilter from "../dropdownFiler/DropdownFilter.vue";
const pages = ["10", "20", "30", "40", "50"];
const activeFilter = ref("10");

interface Props {
  limit: number;
  totalItems: number
}

interface Emit {
  (e: "limit-change", page: number): void;
}

const emit = defineEmits<Emit>();

const props = withDefaults(defineProps<Props>(), {
  limit: 10,
});

function handleFilterData(limit: string) {
  emit("limit-change", Number(limit));
}
</script>

<template>
  <form class="filter">
    <span class="info">{{ activeFilter }} из {{ totalItems }} записей</span>
    <div class="dropdownFilter">
      <span>Показывать </span>
      <DropdownFilter
        :data="pages"
        class="dropdown"
        @change-limit="handleFilterData"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  font-family: "Gothampro-normal";
  font-size: 12px;
  line-height: 130%;
  color: var(--vt-c-grey-2-tone);
}

.info {
  text-align: center;
}

.dropdownFilter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  span {
    margin-inline-end: 6px;
  }
}
</style>
