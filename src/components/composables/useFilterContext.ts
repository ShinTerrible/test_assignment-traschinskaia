import {
  provide,
  inject,
  ref,
  readonly,
  computed,
  type Ref,
  type InjectionKey,
  ComputedRef,
} from "vue";
import { FilterState } from "../features/tableFilterApi/types";
import { tSchoolLicense } from "../features/tableApi/types";

const DEFAULT_FILTERS: FilterState = {
  page: 1,
  count: 10,
  search: "",
  updated_at: null,
  region_id: null,
  federal_district_id: null,
  status: null,
  total_items: null,
  pages_count: null,
};

interface FilterContextValue {
  filterState: Readonly<Ref<FilterState>>;

  tableData: Readonly<Ref<tSchoolLicense[] | []>>;
  setTableDate: (data: tSchoolLicense[]) => void;
  clientFilterData: ComputedRef<tSchoolLicense[]>;

  defaultFilters: FilterState;

  queryString: Readonly<Ref<string>>;
  serverQueryString: Readonly<Ref<string>>;

  updateFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;

  isInitialized: Readonly<Ref<boolean>>;

  initializeWithData: (data: any) => void;
}

const FilterContextKey: InjectionKey<FilterContextValue> =
  Symbol("filter-context");

export function provideFilterContext(initialFilters?: Partial<FilterState>) {
  const filterState = ref<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const isInitialized = ref(false);
  const tableData = ref<tSchoolLicense[] | []>([]);

  const clientFilterData = computed(() => {
    const sourceData = tableData.value;
    const currentStatus = filterState.value.status;

    if (!currentStatus || currentStatus === "all") {
      return sourceData;
    }

    return sourceData.filter((item) => {
      const itemStatus = item.supplements?.[0]?.status?.name;
      return itemStatus === currentStatus;
    });
  });

  function setTableDate(data: tSchoolLicense[]) {
    tableData.value = data;
  }
  const queryString = computed(() => {
    const params = new URLSearchParams();

    Object.entries(filterState.value).forEach(([key, value]) => {
      if (
        key !== "status" &&
        value !== null &&
        value !== undefined &&
        value !== ""
      ) {
        if (key === "date" && value instanceof Date) {
          params.append(key, value.toISOString().split("T")[0]);
        } else {
          params.append(key, String(value));
        }
      }
    });

    return params.toString();
  });

  const serverQueryString = computed(() => {
    const params = new URLSearchParams();
    Object.entries(filterState.value).forEach(([key, value]) => {
      if (
        key !== "status" &&
        value !== null &&
        value !== undefined &&
        value !== ""
      ) {
        params.append(key, String(value));
      }
    });
    return params.toString();
  });

  function initializeWithData(apiData: any) {
    if (apiData?.data?.page) {
      updateFilter("page", apiData.data.page);
    }

    if (apiData?.data?.per_page) {
      updateFilter("count", apiData.data.per_page);
    }

    isInitialized.value = true;
  }

  function updateFilters(newFilters: Partial<FilterState>) {
    filterState.value = {
      ...filterState.value,
      ...newFilters,
    };
  }

  function resetFilters() {
    filterState.value = { ...DEFAULT_FILTERS };
    isInitialized.value = false;
  }

  function updateFilter<K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) {
    filterState.value[key] = value;

    if (key !== "page" && key !== "count") {
      filterState.value.page = 1;
    }
  }

  const contextValue: FilterContextValue = {
    filterState: readonly(filterState),
    defaultFilters: DEFAULT_FILTERS,
    queryString: readonly(queryString),
    serverQueryString: readonly(serverQueryString),
    isInitialized: readonly(isInitialized),
    tableData: tableData,
    setTableDate,
    clientFilterData,
    updateFilters,
    resetFilters,
    updateFilter,
    initializeWithData,
  };

  provide(FilterContextKey, contextValue);

  return contextValue;
}

export function useFilterContext() {
  const context = inject(FilterContextKey);

  if (!context) {
    throw new Error(
      "useFilterContext must be used within a component that calls provideFilterContext",
    );
  }

  return context;
}
