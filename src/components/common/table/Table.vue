<script lang="ts" setup>
import EduLevel from "../eduLevel/EduLevel.vue";
import IconSortDown from "../../icons/IconSortDown.vue";
import IconSortUp from "../../icons/IconSortUp.vue";
import { watch } from "vue";
import { tSchoolLicense } from "../../features/tableApi/types";

interface Props {
  data: tSchoolLicense[];
}

const props = defineProps<Props>();

watch(
  () => props.data,
  () => {},
  { immediate: true },
);

function onEducationlevel(data: tSchoolLicense) {
  let levels = data.supplements[0]?.educational_programs.map((elem) =>
    elem.edu_level.name === "Не определен" ||
    elem.edu_level.name === null ||
    elem.edu_level.name === undefined
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

  @media (min-width: 561px) and (max-width: 760px) {
    & {
      font-size: 14px;
    }
  }

  @media (min-width: 360px) and (max-width: 760px) {
    font-size: 12px;
  }
}

@mixin wrapperSize {
  width: calc(100% / 4);
  cursor: default;

  @media (min-width: 360px) and (max-width: 760px) {
    width: 100%;
  }
}

@mixin columnFlow {
  display: flex;
  flex-direction: column;
}

@mixin rowFlow {
  display: flex;
  flex-direction: row;
}

.table {
  @include columnFlow;
  margin-top: 24px;
}

.tableHeader {
  @include rowFlow;
  background-color: var(--vt-f-white);

  @media (min-width: 360px) and (max-width: 760px) {
    display: none;
  }
}

.header {
  width: calc(100% / 4);
  font-family: "Gothampro-medium";
  color: var(--vt-c-dark-grey);
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0;
  @include rowFlow;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 18px 16px;

  @media (min-width: 360px) and (max-width: 760px) {
    display: none;
  }

  &:hover {
    color: var(--vt-c-grey-1);
  }
}

.icons {
  margin-inline-start: auto;
  @include columnFlow;
  gap: 4px;

  @media (min-width: 360px) and (max-width: 760px) {
    display: none;
  }
}

.tableBody {
  @include columnFlow;
}

.tableItem {
  @include rowFlow;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid var(--vt-c-light-grey-1);
  padding: 18px 16px;
  gap: 32px;
  cursor: unset;

  @media (min-width: 360px) and (max-width: 760px) {
    & {
      min-width: 300px;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      padding: 16px;
      margin-bottom: 12px;
      border-radius: 8px;
      border: 1px solid var(--vt-c-light-grey-1);
      background-color: var(--vt-f-white);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      div {
        display: flex;
        align-items: flex-start;
        min-height: 24px;
      }
    }
  }
}

.regionWrapper {
  @include fontStyle;
  font-family: "Gothampro-medium";
  @include rowFlow;
  justify-content: flex-start;
  @include wrapperSize;

  @media (min-width: 360px) and (max-width: 760px) {
    order: 1;
    font-size: 14px;
    font-weight: 500;
    color: var(--vt-c-dark-grey-1);
  }
}

.nameWrapper {
  @include fontStyle;
  @include wrapperSize;

  @media (min-width: 360px) and (max-width: 760px) {
    order: 2;
    position: relative;

    &::before {
      content: "Название: ";
      display: block;
      font-family: "Gothampro-medium";
      color: var(--vt-c-grey-1);
      margin-bottom: 4px;
    }
  }
}

.adressWrapper {
  @include fontStyle;
  @include wrapperSize;

  @media (min-width: 360px) and (max-width: 760px) {
    order: 3;

    &::before {
      content: "Адрес: ";
      display: block;
      font-family: "Gothampro-medium";
      color: var(--vt-c-grey-1);
      margin-bottom: 4px;
    }
  }
}

.levelWrapper {
  gap: 4px;
  overflow: hidden;
  @include wrapperSize;

  display: flex;
  flex-wrap: wrap;
  @media (min-width: 761px) {
    & {
      flex-direction: row;
    }
  }

  @media (min-width: 561px) and (max-width: 760px) {
    & {
      flex-direction: column;
    }
  }

  @media (min-width: 360px) and (max-width: 760px) {
    order: 4;
    &::before {
      content: "Уровни: ";
      display: block;
      width: 100%;
      font-family: "Gothampro-medium";
      color: var(--vt-c-grey-1);
      margin-bottom: 4px;
      font-size: 14px;
    }
  }
}

@media (min-width: 360px) and (max-width: 760px) {
  .tableWrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 -16px;
    padding: 0 16px;
  }

  .table {
    min-width: 340px;
  }

  .tableHeader,
  .tableItem {
    min-width: 340px;
  }

  .header,
  .regionWrapper,
  .nameWrapper,
  .adressWrapper,
  .levelWrapper {
    min-width: 140px; // 560px / 4
    flex-shrink: 0;
  }
}
</style>
