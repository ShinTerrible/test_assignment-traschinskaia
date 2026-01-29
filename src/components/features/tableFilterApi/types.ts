export type tRegions = {
  id: number;
  name: string;
};

export type tFederals = {
  id: number;
  name: string;
  short_name: string;
  code: string;
};

export type tFilerData = {
  regions: tRegions[];
  federals: tFederals[];
};

export interface FilterState {
  date?: string | null; // Дата в формате YYYY-MM-DD
  region_id?: number | null; // ID региона
  federal_id?: number | null; // ID или код федерального округа
  status?: string | null; // Статус лицензии
  page?: number; // Пагинация
  limit?: number; // Количество элементов на странице
  search?: string;
}

export interface ApiFilters {
  date?: string;
  region_id?: number;
  federal_district?: string; // API ожидает federal_district
  status?: string;
  page?: number;
  per_page?: number;
}
