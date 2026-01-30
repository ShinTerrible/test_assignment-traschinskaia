<script lang="ts" setup>
import { ref, watch } from "vue";
import Dropdown from "../dropdown/Dropdown.vue";
import { useFilterContext } from "../../composables/useFilterContext";
import { tFilerData } from "../../features/tableFilterApi/types";

const filterContext = useFilterContext();

const status = ref(["Действующее", "Недействующее"]);

interface Props {
  subject: tFilerData;
}

interface Emits {
  (e: "date-selected", date: Date): void;
  (e: "data-selected", data: string): void;
  (e: "status-selected", status: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const filterState = ref({
  date: null,
  region_id: null,
  federal_id: null,
});

watch(
  filterState,
  (newFilters) => {
    console.log("Фильтры обновлены:", newFilters);
  },
  { deep: true },
);

watch(
  () => props.subject,
  (newData) => {
    console.log("Table data обновлен:", newData);
  },
  { immediate: true },
);
function handleDateSelect(date: Date) {
  emit("date-selected", date);
}

function handleStatusSelect(status: string) {
  emit("status-selected", status);
}

function handleDataSelect(data: string) {
  emit("data-selected", data);
}
</script>

<template>
  <div class="filterWrapper">
    <Dropdown
      class="dropdown-item"
      calendar
      @date-selected="handleDateSelect"
    />
    <Dropdown
      class="dropdown-item"
      :filter-by-data="subject"
      @data-selected="handleDataSelect"
    />
    <Dropdown
      class="dropdown-item"
      :filter-by-status="status"
      @status-selected="handleStatusSelect"
    />
  </div>
</template>

<style lang="scss" scoped>
.filterWrapper {
  display: flex;
  justify-content: stretch;
  width: 100%;
  gap: 16px;

  @media (min-width: 561px) and (max-width: 760px) {
    gap: 8px;
  }

  @media (min-width: 360px) and (max-width: 560px) {
    flex-direction: column;
    gap: 12px;
  }
}

.dropdown-item {
  flex: 1;
  min-width: 0; // Важно для сжатия текста
}
</style>
