<script lang="ts" setup>
import { ref, watch } from "vue";
import Dropdown from "../dropdown/Dropdown.vue";
import { tFilerData } from "@/components/features/TbleFilterApi/types";

const status = ref(["Действующее", "Недействующее"]);

interface Props {
  subject: tFilerData;
}

const props = defineProps<Props>();

watch(
  () => props.subject,
  (newData) => {
    console.log("Table data обновлен:", newData);
  },
  { immediate: true },
);


</script>

<template>
  <div class="filterWrapper">
    <div>
      <Dropdown calendar="calendar" />
    </div>
    <div>
      <Dropdown :filter-by-data="props.subject"></Dropdown>
    </div>
    <div>
      <Dropdown :filter-by-status="status"></Dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
