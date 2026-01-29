<script lang="ts" setup>
import EduLevel from "../eduLevel/EduLevel.vue";
import IconSortDown from "@/components/icons/IconSortDown.vue";
import IconSortUp from "@/components/icons/IconSortUp.vue";
import Checkbox from "../check/Checkbox.vue";
import { ref, watch } from "vue";
import { iSchoolLicense } from "@/components/features/tableApi/types";

interface Props {
  data: iSchoolLicense[];
}

const props = defineProps<Props>();

watch(
  () => props.data,
  (newData) => {
    console.log("Table data обновлен:", newData);
  },
  { immediate: true },
);

const check = ref<"default" | "checked" | "empty">("default");

function toggleCheck() {
  check.value = check.value === "default" ? "checked" : "default";
}

function onEducationlevel(data: iSchoolLicense) {
  let levels = data.supplements[0].educational_programs.map((elem) =>
    elem.edu_level.name === "Не определен"
      ? ""
      : elem.edu_level.name.split(" ")[0],
  );

  levels = levels.filter(function (item, pos) {
    return levels.indexOf(item) == pos;
  });
  levels = levels.filter((elem) => {
    return Boolean(elem);
  });

  return levels;
}

const levels = onEducationlevel;
</script>

<template>
  <div class="table">
    <div class="tableHeader">
      <div class="header">
        <div class="checkboxWrapper">
          <Checkbox :variant="check" @click="toggleCheck" />
        </div>
        Регион
        <div class="icons">
          <IconSortUp data-activ="false" />
          <IconSortDown />
        </div>
      </div>
      <div class="header">
        Название
        <div class="icons">
          <div class="icons">
            <IconSortUp />
            <IconSortDown />
          </div>
        </div>
      </div>
      <div class="header">
        Адрес
        <div class="icons">
          <IconSortUp />
          <IconSortDown />
        </div>
      </div>
      <div class="header">
        Уровень образования
        <div class="icons">
          <IconSortUp />

          <IconSortDown />
        </div>
      </div>
    </div>

    <div class="tableBody">
      <div class="tableItem" v-for="data in props.data" :key="data.uuid">
        <div class="regionWrapper">
          <div class="checkboxWrapper">
            <Checkbox variant="empty" @click="toggleCheck" />
          </div>
          {{ data.edu_org.region.name }}
        </div>
        <div class="nameWrapper">
          {{ data.edu_org.short_name ?? data.edu_org.full_name }}
        </div>
        <div class="adressWrapper">
          {{ data.edu_org.contact_info.post_address }}
        </div>
        <div class="levelWrapper">
          <EduLevel
            :level="level"
            v-for="(level, index) in levels(data)"
            :key="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin fontStyle {
  width: calc(100% / 4);
  font-family: "Gothampro-normal";
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
}

.table {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}

.tableHeader {
  display: flex;
  flex-direction: row;
  background-color: var(--vt-f-white);
}

.header {
  width: calc(100% / 4);
  font-family: "Gothampro-medium";
  color: var(--vt-c-dark-grey);
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 18px 16px;

  &:hover {
    color: var(--vt-c-grey-1);
  }
}

.icons {
  margin-inline-start: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tableBody {
  display: flex;
  flex-direction: column;
}

.tableItem {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid var(--vt-c-light-grey-1);
  padding: 18px 16px;
  gap: 32px;
}

.regionWrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: calc(100% / 4);
}

.nameWrapper {
  @include fontStyle;
  width: calc(100% / 4);
}

.adressWrapper {
  @include fontStyle;
  width: calc(100% / 4);
}

.levelWrapper {
  gap: 4px;
  overflow: hidden;
  width: calc(100% / 4);
}

.checkboxWrapper {
  margin-inline-end: 11.6px;
}
</style>
