<script lang="ts" setup>
import Table from "../../common/table/Table.vue";
import { onMounted, ref, watch } from "vue";
import api from "../../entities/school-list-api";
import { tSchoolLicense } from "./types";

import { useFilterContext } from "../../composables/useFilterContext";

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
    data.value = response.data.data.list;

    if (response.data.data.page) {
      filterContext.updateFilter("page", response.data.data.page);
      filterContext.updateFilter("total_items", response.data.data.total_count);
      filterContext.updateFilter("pages_count", response.data.data.pages_count);
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
    const queryString = filterContext.queryString.value;
    const url = `/schools${queryString ? `?${queryString}` : "?count=10"}`;
    const response = await api.get(url);
    filterContext.updateFilter("page", response.data.data.page);
    filterContext.updateFilter("total_items", response.data.data.total_count);
    filterContext.updateFilter("pages_count", response.data.data.pages_count);

    data.value = response.data.data.list;
  } catch (err: any) {
    error.value = err.message;
    console.error("ОШИБКА: ", err);
    data.value = [];
  } finally {
    loading.value = false;
    hasFiltersChanged.value = false;
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
  () => filterContext.queryString.value,
  (newQuery, oldQuery) => {
    if (isFirstRequest.value) {
      return;
    }

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
  getFirstTableData();
});
</script>

<template>
  <div v-if="loading" class="loading">Загрузка данных...</div>

  <div v-else-if="error" class="error">
    Ошибка: {{ error }}
  </div>

  <Table v-else-if="data && data?.length > 0" :data="data" />

  <div v-else class="no-data">Нет данных для отображения</div>
</template>
