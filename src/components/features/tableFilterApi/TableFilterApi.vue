<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import api from "../../entities/school-list-api";
import TableFilter from "../../common/tableFilter/TableFilter.vue";
import { tFederals, tFilerData, tRegions } from "./types";
import { useFilterContext } from "../../composables/useFilterContext";

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
      regions: regions.value as tRegions[],
      federals: federals.value as tFederals[],
    };
  } catch (err: any) {
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
  filterContext.updateFilter("updated_at", formattedDate);
}

function handleStatusSelect(statusValue: string) {
  const statusMap: Record<string, string> = {
    Все: "all",
    Действующее: "active",
    Недействующее: "inactive",
  };
}

function handleDataSelect(item: string) {
  // Проверяем наличие в картах
  const regionId = regionsMap.value.get(item);
  const federalId = federalsMap.value.get(item);

  if (regionId !== undefined) {
    filterContext.updateFilter("region_id", regionId);
    filterContext.updateFilter("federal_district_id", null);
  } else if (federalId !== undefined) {
    filterContext.updateFilter("federal_district_id", federalId);
    filterContext.updateFilter("region_id", null);
  } else {
    console.warn("Элемент не найден в картах:", item);
  }
}

watch(
  () => filterContext.filterState.value,
  () => {},
  { deep: true }, 
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
