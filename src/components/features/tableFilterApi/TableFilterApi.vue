<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import api from "@/components/entities/school-list-api";
import TableFilter from "@/components/common/tableFilter/TableFilter.vue";
import { tFederals, tFilerData, tRegions } from "./types";
import { useFilterContext } from "@/components/composables/useFilterContext";

const filterContext = useFilterContext();

const regions = ref<tRegions[]>();
const federals = ref<tFederals[]>();
const allSubjects = ref<tFilerData>({ regions: [], federals: [] });

const loading = ref(false);
const error = ref<string | null>(null);

async function getTableFilterData() {
  loading.value = true;
  error.value = null;

  try {
    const [responseRegions, responseFederals] = await Promise.all([
      api.get("/regions"),
      api.get("/federalDistricts"),
    ]);

    if (responseRegions.data.status) {
      regions.value = responseRegions.data.data;
    }

    if (responseFederals.data.status) {
      federals.value = responseFederals.data.data;
    }

    allSubjects.value = {
      regions: regions.value,
      federals: federals.value,
    };
  } catch (err) {
    error.value = err.message;
    console.error("ОШИБКА: ", err);
    regions.value = [];
    federals.value = [];
  } finally {
    loading.value = false;
  }
}

const regionsMap = computed(() => {
  const map = new Map<string, number>();
  regions.value?.forEach((region) => {
    map.set(region.name, region.id);
  });
  return map;
});

const federalsMap = computed(() => {
  const map = new Map<string, number>();
  federals.value?.forEach((federal) => {
    map.set(federal.name, federal.id);
  });
  return map;
});

function handleDateSelect(date: Date) {
  const formattedDate = date.toISOString().split("T")[0];
  filterContext.updateFilter("date", formattedDate);
}

function handleStatusSelect(statusValue: string) {
  const statusMap: Record<string, string> = {
    Действующее: "active",
    Недействующее: "inactive",
  };

  filterContext.updateFilter("status", statusMap[statusValue] || statusValue);
}

function handleDataSelect(item: string) {
  console.log("Выбран элемент:", item);

  // Проверяем наличие в картах
  const regionId = regionsMap.value.get(item);
  const federalId = federalsMap.value.get(item);

  if (regionId !== undefined) {
    filterContext.updateFilter("region_id", regionId);
    filterContext.updateFilter("federal_id", null);
  } else if (federalId !== undefined) {
    filterContext.updateFilter("federal_id", federalId);
    filterContext.updateFilter("region_id", null);
  } else {
    console.warn("Элемент не найден в картах:", item);
  }
}

watch(
  () => filterContext.filterState.value,
  (newFilters, oldFilters) => {
    console.log("🎯 filterState изменился:");
    console.log("Было:", oldFilters);
    console.log("Стало:", newFilters);
    console.log("Query String:", filterContext.queryString.value);
  },
  { deep: true }, // важно для отслеживания вложенных объектов
);

onMounted(() => {
  getTableFilterData();
});
</script>

<template>
  <TableFilter
    :subject="allSubjects"
    @date-selected="handleDateSelect"
    @data-selected="handleDataSelect"
    @status-selected="handleStatusSelect"
  />
</template>
