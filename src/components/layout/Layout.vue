<script lang="ts" setup>
import { ref } from "vue";
import Button from "../common/buttons/Button.vue";
import Dropdown from "../common/dropdown/Dropdown.vue";
import Input from "../common/input/Input.vue";
import IconDocumentation from "../icons/IconDocumentation.vue";
// import EduLevel from "../common/eduLevel/EduLevel.vue";
// import IconSortDown from "../icons/IconSortDown.vue";
// import IconSortUp from "../icons/IconSortUp.vue";
// import Checkbox from "../common/check/Checkbox.vue";
import Pagination from "../common/pagination/Pagination.vue";
import Filter from "../common/filter/Filter.vue";
import Table from "../common/table/Table.vue";
import TableApi from "../features/TableApi/TableApi.vue";

const mockTypes = ref(["Все виды", "Федеральные округа", "Регионы", "Школы"]);
const mockStatus = ref(["Действующее", "Недействующее"]);

</script>

<template>
  <article class="tableWrapper">
    <div class="tableContainer">
      <div class="searchWrapper">
        <h2>Таблица учреждений</h2>
        <div class="formWrapper">
          <Input type="search" placeholder="Поиск" />
          <Button icon="document" variant="accent" title="Скачать">
            <template #icon>
              <IconDocumentation />
            </template>
          </Button>
        </div>
      </div>

      <div class="filterWrapper">
        <div>
          <Dropdown data="calendar" />
        </div>
        <div>
          <Dropdown :data="mockTypes"></Dropdown>
        </div>
        <div>
          <Dropdown :data="mockStatus"></Dropdown>
        </div>
      </div>

      <TableApi/>

      <div class="pagination">
        <Pagination />
        <Filter />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@mixin fontStyle {
  width: calc(100% / 4);
  font-family: "Gothampro-normal";
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0;
}

.tableWrapper {
  width: 100%;
  padding: 48px;
  box-sizing: border-box;
}

.tableContainer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: var(--vt-c-light-grey-3);
  border-radius: 16px;
  padding: 24px;
  gap: 24px;
}

.searchWrapper {
  display: flex;
  justify-content: space-between;

  h2 {
    font-family: "Gothampro-bold";
    color: var(--vt-f-dark-grey);
    font-size: 32px;
  }
}

.formWrapper {
  display: flex;
  gap: 16px;
}

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

// .table {
//   display: flex;
//   flex-direction: column;
//   margin-top: 24px;
// }
// 
// .tableHeader {
//   display: flex;
//   flex-direction: row;
//   background-color: var(--vt-c-light-grey);
// }
// 
// .header {
//   width: calc(100% / 4);
//   font-family: "Gothampro-medium";
//   color: var(--vt-c-dark-grey);
//   font-size: 16px;
//   line-height: 130%;
//   letter-spacing: 0;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   cursor: pointer;
//   padding: 18px 16px;
// 
//   &:hover {
//     color: var(--vt-c-grey-1);
//   }
// }
// 
// .icons {
//   margin-inline-start: auto;
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
// }
// 
// .tableBody {
//   display: flex;
//   flex-direction: column;
// }
// 
// .tableItem {
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   border-bottom: 1px solid var(--vt-c-light-grey-1);
//   padding: 18px 16px;
//   gap: 32px;
// }
// 
// .regionWrapper {
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   width: calc(100% / 4);
// }
// 
// .nameWrapper {
//   @include fontStyle;
// }
// 
// .adressWrapper {
//   @include fontStyle;
// }
// 
// .levelWrapper {
//   gap: 4px;
// }
// 
// .checkboxWrapper {
//   margin-inline-end: 11.6px;
// }

.pagination {
  display: flex;
  justify-content: space-between;
}
</style>
