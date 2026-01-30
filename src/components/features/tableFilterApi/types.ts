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
  updated_at?: string | null;
  region_id?: number | null;
  federal_district_id?: number | null;
  status?: string | null;
  page?: number;
  count?: number;
  search?: string;
  download?: boolean;
  total_items?: null | number;
  pages_count?: null;
}

export interface ApiFilters {
  updated_at?: string;
  region_id?: number;
  federal_district_id?: string;
  status?: string;
  page?: number;
  per_page?: number;
  download?: boolean;
  total_items?: null | number;
  pages_count?: null | number;
}
