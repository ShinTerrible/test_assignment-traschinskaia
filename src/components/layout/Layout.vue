<script lang="ts" setup>
import { ref } from "vue";
import Button from "../common/buttons/Button.vue";
import Dropdown from "../common/dropdown/Dropdown.vue";
import Input from "../common/input/Input.vue";
import IconDocumentation from "../icons/IconDocumentation.vue";
import EduLevel from "../common/eduLevel/EduLevel.vue";
import IconSortDown from "../icons/IconSortDown.vue";
import IconSortUp from "../icons/IconSortUp.vue";
import Checkbox from "../common/check/Checkbox.vue";
import Pagination from "../common/pagination/Pagination.vue";
import Filter from "../common/filter/Filter.vue";
import Calendar from "../common/calender/Calendar.vue";

const mockTypes = ref(["Все виды", "Федеральные округа", "Регионы", "Школы"]);
const mockStatus = ref(["Действующее", "Недействующее"]);
const check = ref<"default" | "checked" | "empty">("default");

function toggleCheck() {
  check.value = check.value === "default" ? "checked" : "default";
}
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
          <Dropdown :data="['12.06.2020', '14.09.2019', '23.01.2022']"/>
        </div>
        <div>
          <Dropdown :data="mockTypes"></Dropdown>
        </div>
        <div>
          <Dropdown :data="mockStatus"></Dropdown>
        </div>
      </div>

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
          <div class="tableItem">
            <div class="regionWrapper">
              <div class="checkboxWrapper">
                <Checkbox variant="empty" @click="toggleCheck" />
              </div>
              Белгородская область
            </div>
            <div class="nameWrapper">
              МБОУ Средняя общеобразовательная школа №2
            </div>
            <div class="adressWrapper">
              ул. Николая Гондатти, д. 13 ул. Н. Гондатти 13 ; ул. Н. Зелинского
              22
            </div>
            <div class="levelWrapper">
              <EduLevel level="Среднее" /> <EduLevel level="Высшее" />
              <EduLevel level="Специальное" /> <EduLevel level="Проф" />
              <EduLevel level="Бакалавр" />
            </div>
          </div>

          <div class="tableItem">
            <div class="regionWrapper">
              <div class="checkboxWrapper">
                <Checkbox variant="empty" @click="toggleCheck" />
              </div>
              Брянская область
            </div>
            <div class="nameWrapper">
              МБОУ Основная общеобразовательная школа №3
            </div>
            <div class="adressWrapper">
              ул. Строителей, д.2а ул. Домостроителей 2а, ул. Камчатская, 154
            </div>
            <div class="levelWrapper">
              <EduLevel level="Среднее" /> <EduLevel level="Высшее" />
              <EduLevel level="Специальное" /> <EduLevel level="Проф" />
              <EduLevel level="Бакалавр" />
            </div>
          </div>

          <div class="tableItem">
            <div class="regionWrapper">
              <div class="checkboxWrapper">
                <Checkbox :variant="check" @click="toggleCheck" />
              </div>
              Владимирская область
            </div>
            <div class="nameWrapper">
              МБОУ СОШ №4 с. Засечное, ул. Изумрудная 8А
            </div>
            <div class="adressWrapper">
              пер. Красноармейский, дом 1, гор. Удомля, Тверская область, 171842
            </div>
            <div class="levelWrapper">
              <EduLevel level="Среднее" /> <EduLevel level="Высшее" />
              <EduLevel level="Специальное" /> <EduLevel level="Проф" />
              <EduLevel level="Бакалавр" />
            </div>
          </div>

          <div class="tableItem">
            <div class="regionWrapper">
              <div class="checkboxWrapper">
                <Checkbox :variant="check" @click="toggleCheck" />
              </div>
              Воронежская область
            </div>

            <div class="nameWrapper">
              МБОУ Средняя общеобразовательная школа №5
            </div>
            <div class="adressWrapper">
              Большая Очаковская улица, дом 42, корпус 2
            </div>

            <div class="levelWrapper">
              <EduLevel level="Среднее" /> <EduLevel level="Высшее" />
              <EduLevel level="Специальное" /> <EduLevel level="Проф" />
              <EduLevel level="Бакалавр" />
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <Pagination/>
        <Filter/>
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

.table {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}

.tableHeader {
  display: flex;
  flex-direction: row;
  background-color: var(--vt-c-light-grey);
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
}

.adressWrapper {
  @include fontStyle;
}

.levelWrapper {
  gap: 4px;
}

.checkboxWrapper {
  margin-inline-end: 11.6px;
}

.pagination{
  display: flex;
  justify-content: space-between;
}
</style>
