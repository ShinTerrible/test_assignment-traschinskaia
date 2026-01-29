<script lang="ts" setup>
import { ref, watch } from "vue";
import Dropdown from "../dropdown/Dropdown.vue";
import { tFilerData } from "@/components/features/tableFilterApi/types";
import { useFilterContext } from "@/components/composables/useFilterContext";

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
    <div>
      <Dropdown calendar @date-selected="handleDateSelect" />
    </div>
    <div>
      <Dropdown :filter-by-data="subject" @data-selected="handleDataSelect" />
    </div>
    <div>
      <Dropdown
        :filter-by-status="status"
        @status-selected="handleStatusSelect"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filterWrapper {
  display: flex;
  justify-content: stretch;
  width: 100%;
  gap: 91px;

  div {
    display: flex;
    width: calc((100% / 3) - (16px * 3) - 13px);
  }
}
</style>
