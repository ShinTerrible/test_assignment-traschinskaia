<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import Calendar from "../calender/Calendar.vue";
import { tFilerData } from "@/components/features/TbleFilterApi/types";

interface Props {
  filterByData?: tFilerData;
  filterByStatus?: string[];
  calendar?: "calendar";
}

const props = defineProps<Props>();

const dataState = ref(
  props.filterByData ? "Все виды" : props.filterByStatus?.[0] || "",
);

const selectState = ref("");
const selectElement = ref<HTMLElement | null>(null);
const monthNames = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const today = new Date();
const initialDate = `${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;

let selectedDateDisplay = ref(initialDate);
const selectedDate = ref<Date>(today);

function updateDisplayFromDate(date: Date) {
  selectedDateDisplay.value = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function handleSaveDate(date) {
  selectedDate.value = date;
  updateDisplayFromDate(date);
  selectState.value = "";
  // date.push(startDate.value.toISOString().split('T')[0]) //для запроса
  // emit('date-selected', date); эмит события родителю для запроса
}

watch(
  () => props,
  (newData) => {
    console.log("Table data обновлен:", newData);
  },
  { immediate: true },
);

watch(
  selectedDate,
  (newDate) => {
    updateDisplayFromDate(newDate);
  },
  { immediate: true },
);

const toggleSelect = () => {
  selectState.value = selectState.value === "active" ? "" : "active";
};

const selectItem = (item: string) => {
  dataState.value = item;
  selectState.value = "";
};

const handleCloseOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (selectElement.value && !selectElement.value.contains(target)) {
    selectState.value = "";
  }

  onMounted(() => {
    document.addEventListener("click", handleCloseOutside);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleCloseOutside);
  });
};
</script>

<template>
  <form class="form">
    <div class="select" :data-state="selectState" ref="selectElement">
      <div
        class="selectTitle"
        :data-default="'Все статусы'"
        @click="toggleSelect"
        v-if="props.filterByStatus"
      >
        {{ dataState }}
      </div>

      <div
        class="selectTitle"
        :data-default="'Все виды'"
        @click="toggleSelect"
        v-if="props.filterByData"
      >
        {{ dataState }}
      </div>

      <div
        class="selectTitle"
        :data-default="initialDate"
        @click="toggleSelect"
        v-if="props.calendar"
      >
        {{ selectedDateDisplay }}
      </div>

      <div class="selectContent" v-if="props.filterByStatus">
        <label
          :for="'singleSelect' + index"
          class="selectLabel"
          v-for="(item, index) in props.filterByStatus"
          :key="index"
          @click="selectItem(item)"
        >
          <input
            :id="'singleSelect' + index"
            class="selectInput"
            type="radio"
            name="singleSelect"
            :checked="dataState === item"
          />{{ item }}</label
        >
      </div>

      <div class="selectContent" v-if="props.filterByData">
        <span>Федеральные округа</span>
        <label
          :for="'singleSelect' + index"
          class="selectLabel"
          v-for="(item, index) in props.filterByData.federals"
          :key="index"
          @click="selectItem(item.name)"
        >
          <input
            :id="'singleSelect' + index"
            class="selectInput"
            type="radio"
            name="singleSelect"
            :checked="dataState === item.name"
          />{{ item.name }}</label
        >
        <span>Регионы</span>

        <label
          :for="'singleSelect' + index"
          class="selectLabel"
          v-for="(item, index) in props.filterByData.regions.filter((item) => item.id !== 86)"
          :key="index"
          @click="selectItem(item.name)"
        >
          <input
            :id="'singleSelect' + index"
            class="selectInput"
            type="radio"
            name="singleSelect"
            :checked="dataState === item.name"
          />{{ item.name }}</label
        >
      </div>

      <div class="selectContent calendar" v-if="props.calendar">
        <Calendar
          class="calendar"
          v-model="selectedDate"
          @save="handleSaveDate"
        />
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  width: 100%;
  position: relative;
  box-sizing: border-box;
}

.select {
  width: 100%;
  min-width: 230px;
  height: 40px;
  font-family: "Gothampro-normal";
  font-size: 16px;
  line-height: 130%;
  border: var(--vt-c-light-grey-1);

  &[data-state="active"] {
    .selectTitle {
      &::before {
        transform: translate(-3px, -50%) rotate(-45deg);
      }

      &::after {
        transform: translate(3px, -50%) rotate(45deg);
      }
    }

    .selectContent {
      display: flex;
    }
  }
}

.selectTitle {
  display: flex;
  align-items: center;
  width: 100%;
  font-family: "Gothampro-normal";
  font-size: 16px;
  line-height: 130%;
  padding: 17.5px 24px 17.5px 24px;
  border-radius: 8px;
  border: 1px solid var(--vt-c-light-grey-1);
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: var(--vt-f-white);
  }

  &::before,
  &::after {
    content: "";

    position: absolute;
    top: 70%;
    right: 30px;

    display: block;
    width: 10px;
    height: 2px;

    transition: all 0.3s ease-out;

    background-color: var(--vt-c-grey-1);

    transform: translate(-3px, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(3px, -50%) rotate(-45deg);
  }
}

.selectContent {
  position: absolute;
  top: 59px;
  left: 0px;
  width: 100%;
  padding: 6px 24px 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
  border-radius: 8px;
  background-color: var(--vt-f-white);
  display: none;
  max-height: 400px;
  overflow-y: scroll;
  border-top: 10px solid transparent;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  transition: all 0.3s ease-out;

  z-index: 1;

  span {
    display: block;
    margin-block: 6px;
    font-family: "Gothampro-bold";
    font-size: 18px;
    line-height: 130%;
    padding-inline-start: 16px;
  }
}

.calendar {
  max-height: unset;
}

.selectInput {
  display: none;

  &:checked + label {
    background-color: var(--vt-f-white);
  }

  .disabled {
    color: var(--vt-c-grey);
    background-color: var(--vt-c-light-grey-2);
    pointer-events: none;
  }
}

.selectLabel {
  padding: 18px 16px;
  display: flex;
  align-items: center;
  min-height: 50px;
  background-color: var(--vt-c-light-grey-2);
  border-radius: 8px;
  transition: all 0.2s ease-out;

  cursor: pointer;

  border-radius: 8px;
  border: transparent;
  color: var(--vt-c-grey-1);
  font-family: "Gothampro-normal";

  &:hover {
    background-color: var(--vt-c-light-grey-1);
  }
}
</style>
