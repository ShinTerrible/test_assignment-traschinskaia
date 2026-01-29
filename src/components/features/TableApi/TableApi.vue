<script lang="ts" setup>
import Table from "@/components/common/table/Table.vue";
import { onMounted, ref } from "vue";
import api from "@/components/entities/school-list-api";
import { iSchoolLicense } from "./types";

const data = ref<iSchoolLicense[] | []>();
const loading = ref(false);
const error = ref<string | null>(null);

async function getTableData() {
  loading.value = true;
  error.value = null;

  try {
    const response = await api.get("/schools");
    data.value = response.data.data.list;
    console.log("Данные получены:", response.data);
  } catch (err) {
    error.value = err.message;
    console.error("ОШИБКА: ", err);
    data.value = [];
  } finally {
    loading.value = false;
  }
}

// Выполнить при загрузке компонента
onMounted(() => {
  getTableData();
});
</script>

<template>
  <div v-if="loading" class="loading">Загрузка данных...</div>

  <div v-else-if="error" class="error">
    Ошибка: {{ error }}
    <button @click="getTableData">Повторить</button>
  </div>

  <Table v-else-if="data && data?.length > 0" :data="data" />

  <div v-else class="no-data">Нет данных для отображения</div>
</template>
