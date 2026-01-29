<script lang="ts" setup>
import Button from "../common/buttons/Button.vue";
import Input from "../common/input/Input.vue";
import IconDocumentation from "../icons/IconDocumentation.vue";
import Pagination from "../common/pagination/Pagination.vue";
import Filter from "../common/filter/Filter.vue";
import TableApi from "../features/tableApi/TableApi.vue";
import TableFilterApi from "../features/tableFilterApi/TableFilterApi.vue";
import { provideFilterContext } from "../composables/useFilterContext";
import { ref, watch } from "vue";

const filterContext = provideFilterContext();

const searchQuery = ref(filterContext.filterState.value.search || "");

function handleSearch() {
  filterContext.updateFilter("search", searchQuery.value);
}

function handleInputUpdate(value: string) {
  searchQuery.value = value;
}

function handleFiltersChanged(filters: any) {
  console.log('Фильтр изменился: ', filters)
  filterContext.updateFilters(filters);
}

function handlePageChange(page: number) {
  filterContext.updateFilter("page", page);
}

function handleLimitChange(limit: number) {
  filterContext.updateFilter("limit", limit);
}

watch(
  () => filterContext.queryString.value,
  (newQuery) => {
    console.log("Запрос изменился: ", newQuery);
  },
  { deep: true },
);

watch(
  () => filterContext.filterState.value.federal_id,
  (newFilterStatus) => {
    console.log("Запрос изменился: ", newFilterStatus);
  },
  { deep: true },
);

watch(
  () => filterContext.filterState.value.search,
  (newSearch) => {
    console.log("Поиск изменился: ", newSearch);

    if (newSearch !== searchQuery.value) {
      searchQuery.value = newSearch || "";
    }
  },
);
</script>

<template>
  <article class="tableWrapper">
    <div class="tableContainer">
      <div class="searchWrapper">
        <h2>Таблица учреждений</h2>
        <div class="formWrapper">
          <Input
            :modelValue="searchQuery"
            @update:modelValue="handleInputUpdate"
            @search-change="handleSearch"
          />
          <Button icon="document" variant="accent" title="Скачать">
            <template #icon>
              <IconDocumentation />
            </template>
          </Button>
        </div>
      </div>

      <TableFilterApi @filters-changed="handleFiltersChanged" />

      <TableApi />

      <div class="pagination">
        <Pagination
          :current-page="filterContext.filterState.value.page || 1"
          @page-change="handlePageChange"
        />
        <Filter
          :limit="filterContext.filterState.value.limit || 10"
          @limit-change="handleLimitChange"
        />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@mixin fontStyle {
  width: calc(100% / 4);
  font-family: "Gothampro-normal";
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
}

.tableWrapper {
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
}

.tableContainer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--vt-c-light-grey-3);
  border-radius: 16px;
  padding: 24px;
  gap: 24px;
}

.searchWrapper {
  display: flex;
  justify-content: space-between;

  h2 {
    font-family: "Gothampro-bold";
    color: var(--vt-f-dark-grey);
    font-size: 32px;
  }
}

.formWrapper {
  display: flex;
  gap: 16px;
}

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

.pagination {
  display: flex;
  justify-content: space-between;
}
</style>
