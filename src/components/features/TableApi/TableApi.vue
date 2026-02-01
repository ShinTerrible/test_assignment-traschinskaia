<script lang="ts" setup>
import Table from "../../common/table/Table.vue";
import { onMounted, ref, watch } from "vue";
import api from "../../entities/school-list-api";

import { useFilterContext } from "../../composables/useFilterContext";
import { tSchoolLicense } from "./types";

const filterContext = useFilterContext();

const data = ref<tSchoolLicense[] | []>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const isFirstRequest = ref(true);
const hasFiltersChanged = ref(false);

async function getFirstTableData() {
  loading.value = true;
  error.value = null;

  try {
    const response = await api.get("/schools?count=10");

    // data.value = response.data.data.list;
    const list = response.data.data.list;
    filterContext.setTableDate(list);

    if (response.data.data.page) {
      filterContext.updateFilter("page", response.data.data.page);
    }
    if (response.data.data.per_page || response.data.data.limit) {
      const limit = response.data.data.per_page || response.data.data.limit;
      filterContext.updateFilter("count", limit);
    }
  } catch (err: any) {
    error.value = err.message;
    console.error("ОШИБКА: ", err);
    data.value = [];
  } finally {
    loading.value = false;
    isFirstRequest.value = false;
  }
}

async function getFilteredTableData() {
  loading.value = true;
  error.value = null;

  try {
    console.log("QUERY STRING: ", filterContext.queryString.value);
    const queryString = filterContext.queryString.value;
    const url = `/schools${queryString ? `?${queryString}` : ""}`;
    const response = await api.get(url);

    // data.value = response.data.data.list;
    const list = response.data.data.list;
    filterContext.setTableDate(list);

    filterContext.updateFilter("page", response.data.data.page);
  } catch (err: any) {
    error.value = err.message;
    console.error("ОШИБКА: ", err);
    data.value = [];
  } finally {
    loading.value = false;
    hasFiltersChanged.value = true;
  }
}

async function getTableData() {
  if (isFirstRequest.value) {
    await getFirstTableData();
  } else if (hasFiltersChanged.value) {
    await getFilteredTableData();
  }
}

watch(
() => filterContext.serverQueryString.value,
  (newQuery, oldQuery) => {
    if (newQuery !== oldQuery) {
      hasFiltersChanged.value = true;
      getTableData();
    }
  },
  { immediate: false },
);

watch(
  () => [
    filterContext.filterState.value.page,
    filterContext.filterState.value.count,
  ],
  ([newPage, newCount], [oldPage, oldCount]) => {
    if (isFirstRequest.value) return;

    if (newPage !== oldPage || newCount !== oldCount) {
      hasFiltersChanged.value = true;
      getTableData();
    }
  },
  { immediate: false },
);

onMounted(() => {
  getTableData();
});
</script>

<template>
  <div v-if="loading" class="loading">Загрузка данных...</div>

  <div v-else-if="error" class="error">Ошибка: {{ error }}</div>

  <Table
    v-if="filterContext.clientFilterData.value.length > 0"
    :data="filterContext.clientFilterData.value"
  />
</template>
