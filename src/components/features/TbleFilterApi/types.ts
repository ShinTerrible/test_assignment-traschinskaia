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
