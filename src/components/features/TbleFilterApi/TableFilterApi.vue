<script lang="ts" setup>
import { onMounted, ref } from "vue";
import api from "@/components/entities/school-list-api";
import TableFilter from "@/components/common/tableFilter/TableFilter.vue";
import { tFilerData } from "./types";

const regions = ref();
const federals = ref();
const allSubjects = ref<tFilerData>({ regions: [], federals: [] });

const loading = ref(false);
const error = ref<string | null>(null);

async function getTableFilterData() {
  loading.value = true;
  error.value = null;

  try {
    const responseRegions = await api.get("/regions");
    const responseFederals = await api.get("/federalDistricts");

    regions.value = responseRegions.data.data;
    federals.value = responseFederals.data.data;

    // console.log("Данные регионов получены:", responseRegions.data.data);
    // console.log(
    //   "Данные федеральных округов получены:",
    //   responseFederals.data.data,
    // );

    allSubjects.value = {
      regions: regions.value,
      federals: federals.value,
    };

  } catch (err) {
    error.value = err.message;
    console.error("ОШИБКА: ", err);
    regions.value = [];
    federals.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getTableFilterData();
});
</script>

<template>
  <TableFilter :subject="allSubjects as tFilerData" />
</template>
