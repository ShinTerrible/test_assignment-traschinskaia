import {
  computed,
  inject,
  InjectionKey,
  provide,
  readonly,
  ref,
  Ref,
} from "vue";
import { FilterState } from "../features/tableFilterApi/types";


interface FilterContextValue {
  filterState: Readonly<Ref<FilterState>>;

  updateFilters: (newFilter: Partial<FilterState>) => void; //update

  resetFilters: () => void;

  updateFilter: <k extends keyof FilterState>(
    key: k,
    value: FilterState[k],
  ) => void;
  queryString: Readonly<Ref<string>>;

  activeFilters: Readonly<Ref<Record<string, any>>>;
}

const FilterContextKey: InjectionKey<FilterContextValue> =
  Symbol("filter-context");

export function provideFilterContext() {
  const filterState = ref<FilterState>({
    page: 1,
    limit: 20,
    search: "",
    date: null,
    region_id: null,
    federal_id: null,
  });

  const queryString = computed(() => {
    const params = new URLSearchParams();

    Object.entries(filterState.value).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params.append(key, String(value));
      }
    });
    return URLSearchParams.toString();
  });

  const activeFilters = computed(() => {
    const { page, limit, ...rest } = filterState.value;
    return rest;
  });

  function updateFilters(newFilters: Partial<FilterState>) {
    filterState.value = {
      ...filterState.value,
      ...newFilters,
    };
  }

  function resetFilters() {
    filterState.value = {
      page: 1,
      limit: 10,
      search: "",
      date: null,
      region_id: null,
      federal_id: null,
    };
  }

  function updateFilter<K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) {
    filterState.value[key] = value;

    if (key !== "page" && key !== "limit") {
      filterState.value.page = 1;
    }
  }

  const contextValue: FilterContextValue = {
    filterState: readonly(filterState),
    queryString: readonly(queryString),
    activeFilters: readonly(activeFilters),
    updateFilters,
    resetFilters,
    updateFilter,
  };

  provide(FilterContextKey, contextValue);

  return contextValue;
}

export function useFilterContext() {
  const context = inject(FilterContextKey);

  if (!context) {
    throw new Error("Ошибка контекста");
  }
  return context;
}

export function useFilterContextSafe() {
  const context = inject(FilterContextKey, null);
  return context;
}
