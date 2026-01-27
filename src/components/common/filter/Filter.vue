<script setup lang="ts">
import { ref } from "vue";
import DropdownFilter from "../dropdownFiler/DropdownFilter.vue";
const pages = ["10", "20", "30", "40", "50"];
const activeFilter = ref("10");
</script>

<template>
  <form class="filter">
    <span class="info">{{ activeFilter }} из 50 записей</span>
    <div class="dropdownFilter">
      <span>Показывать </span> <DropdownFilter :data="pages" class="dropdown" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  font-family: "Gothampro-normal";
  font-size: 12px;
  line-height: 130%;
  color: var(--vt-c-grey-2-tone);
}

.info {
  text-align: center;
}

.dropdownFilter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  span {
    margin-inline-end: 6px;
  }
}

</style>
