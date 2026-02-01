<script lang="ts" setup>
import Button from "../common/buttons/Button.vue";
import Input from "../common/input/Input.vue";
import IconDocumentation from "../icons/IconDocumentation.vue";
import Pagination from "../common/pagination/Pagination.vue";
import Filter from "../common/filter/Filter.vue";
import TableApi from "../features/tableApi/TableApi.vue";
import TableFilterApi from "../features/tableFilterApi/TableFilterApi.vue";
import { provideFilterContext } from "../composables/useFilterContext";
import { ref } from "vue";

const filterContext = provideFilterContext();

const pagination = ref({
  totalPages: filterContext.filterState.value.pages_count || 10,
  itemsPerPage: 10,
});
const isDownloading = ref(false);

const searchQuery = ref(filterContext.filterState.value.search || "");

function handleSearch() {
  filterContext.updateFilter("search", searchQuery.value);
}

function handleInputUpdate(value: string) {
  searchQuery.value = value;
}

function handleFiltersChanged(filters: any) {
  filterContext.updateFilters(filters);
}

function handlePageChange(page: number) {
  filterContext.updateFilter("page", page);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleLimitChange(limit: number) {
  filterContext.updateFilter("count", limit);
}

async function handleDownload() {
  isDownloading.value = true;
  await filterContext.downloadCSV();
  isDownloading.value = false;
}
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
          <Button
            icon="document"
            variant="accent"
            title="Скачать"
            @click="handleDownload"
          >
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
          :total-pages="pagination.totalPages"
          @page-change="handlePageChange"
          class="paginationItem"
        />
        <Filter
          :total-items="filterContext.filterState.value.total_items || 50"
          :limit="filterContext.filterState.value.count || 10"
          :curent-limit="pagination.itemsPerPage"
          @limit-change="handleLimitChange"
          class="filter"
        />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.tableWrapper {
  width: 100%;
  padding: 48px;
  box-sizing: border-box;

  @media (min-width: 360px) and (max-width: 768px) {
    & {
      padding: 25px;
    }
  }
}

.tableContainer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--vt-c-light-grey-3);
  border-radius: 16px;
  padding: 24px;
  gap: 24px;

  @media (min-width: 360px) and (max-width: 560px) {
    & {
      padding: 20px;
      gap: 20px;
    }
  }
}

.searchWrapper {
  display: flex;
  justify-content: space-between;

  @media (min-width: 761px) {
    line-height: 150%;
  }

  @media (min-width: 360px) and (max-width: 760px) {
    & {
      flex-direction: column;
      gap: 10px;
    }
  }

  h2 {
    font-family: "Gothampro-bold";
    color: var(--vt-f-dark-grey);
    font-size: 32px;

    @media (min-width: 360px) and (max-width: 560px) {
      & {
        font-size: 24px;
        line-height: 100%;
      }
    }
  }
}

.formWrapper {
  display: flex;
  gap: 16px;
  @media (min-width: 761px) {
    height: 60px;
  }
  @media (min-width: 360px) and (max-width: 560px) {
    & {
      flex-direction: column;
      gap: 12px;
    }
  }
}

.pagination {
  display: flex;
  justify-content: space-between;

  @media (min-width: 360px) and (max-width: 560px) {
    & {
      flex-direction: column;
      justify-content: stretch;
      .paginationItem {
        width: 100%;
      }
      gap: 12px;
      .filter {
        margin-inline-start: auto;
      }
    }
  }
}
</style>
