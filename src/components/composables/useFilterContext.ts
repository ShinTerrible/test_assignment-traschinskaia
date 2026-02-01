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
import api from "../entities/school-list-api";

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
  downloadCSV: () => void;
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
    let data = [...tableData.value];
    const { status, search } = filterState.value;

    if (status && status !== "all") {
      data = data.filter((item) => {
        return item.supplements?.[0]?.status?.name === status;
      });
    }

    if (search && search.trim() !== "") {
      const searchQuery = search.toLowerCase().trim();

      data = data.filter((item) => {
        const name = (item.edu_org?.full_name || "").toLowerCase();
        const shortName = (item.edu_org?.short_name || "").toLowerCase();

        const address = (
          item.edu_org?.contact_info?.post_address || ""
        ).toLowerCase();
        const email = (item.edu_org?.contact_info?.email || "").toLowerCase();
        const phone = (item.edu_org?.contact_info?.phone || "").toLowerCase();

        const headName = (item.edu_org?.head?.name || "").toLowerCase();

        return (
          name.includes(searchQuery) ||
          shortName.includes(searchQuery) ||
          address.includes(searchQuery) ||
          email.includes(searchQuery) ||
          phone.includes(searchQuery) ||
          headName.includes(searchQuery)
        );
      });
    }

    return data;
  });

  function setTableDate(data: tSchoolLicense[]) {
    tableData.value = data;
  }
  
  const queryString = computed(() => {
    const params = new URLSearchParams();

    Object.entries(filterState.value).forEach(([key, value]) => {
      if (
        key !== "status" &&
        key !== "search" &&
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
        key !== "search" &&
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

  async function downloadCSV() {
    try {
      const query = queryString.value;
      const url = query ? `/schools?${query}&download=true` : "download=true";
      const response = await api.get(`/schools?${url}`, { timeout: 60000 });

      if (response.data.status && response.data.data) {
        const fileUrl = response.data.data;
        console.log(fileUrl);

        await triggerFileDownload(fileUrl);
      } else {
        throw new Error("Ссылка не получена");
      }
    } catch (err) {
      console.log("Ошибка скачивания: ", err);
    }

    async function triggerFileDownload(fileUrl: string) {
      try {
        const response = await api.get(fileUrl, {
          responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        const fileName = fileUrl.split("/").pop() || "export.csv";

        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        window.open(fileUrl, "_blank");
        console.log("Ошибка скачивания: ", err);
      }
    }
  }

  const contextValue: FilterContextValue = {
    filterState: readonly(filterState),
    defaultFilters: DEFAULT_FILTERS,
    queryString: readonly(queryString),
    serverQueryString: readonly(serverQueryString),
    isInitialized: readonly(isInitialized),
    tableData: tableData,
    downloadCSV,
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
    throw new Error("Функция должна использоваться внутри компонента");
  }

  return context;
}
