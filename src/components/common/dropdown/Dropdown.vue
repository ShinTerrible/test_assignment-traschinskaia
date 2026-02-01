<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import Calendar from "../calender/Calendar.vue";
import { tFilerData } from "../../features/tableFilterApi/types";

interface Props {
  filterByData?: tFilerData;
  filterByStatus?: string[];
  calendar?: boolean;
}

const props = defineProps<Props>();

const dropdownType = computed(() => {
  if (props.calendar) return "calendar";
  if (props.filterByStatus) return "status";
  if (props.filterByData) return "data";
  return "unknown";
});

const emit = defineEmits<{
  "date-selected": [value: Date];
  "data-selected": [value: string];
  "status-selected": [value: string];
}>();

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

const dataState = ref(
  dropdownType.value === "status"
    ? props.filterByStatus?.[0] || "Все статусы"
    : dropdownType.value === "data"
      ? "Все виды"
      : initialDate,
);

function updateDisplayFromDate(date: Date) {
  selectedDateDisplay.value = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

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

  switch (dropdownType.value) {
    case "calendar":
      try {
        const date = new Date(item);
        if (!isNaN(date.getTime())) {
          emit("date-selected", date);
        }
      } catch (e) {
        console.error("Ошибка парсинга даты:", e);
      }
      break;

    case "status":
      emit("status-selected", item);
      break;

    case "data":
      emit("data-selected", item);
      break;
  }
};

function handleClose() {
  selectState.value = "";
}

function handleSaveDate(date: Date) {
  selectedDate.value = date;
  updateDisplayFromDate(date);
  selectState.value = "";
  emit("date-selected", date);
}

const handleCloseOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (selectElement.value && !selectElement.value.contains(target)) {
    selectState.value = "";
  }
};

onMounted(() => {
  document.addEventListener("click", handleCloseOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleCloseOutside);
});
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
          :for="'federal-' + index"
          class="selectLabel"
          v-for="(item, index) in props.filterByStatus"
          :key="'federal-' + index"
          @click.prevent="selectItem(item)"
        >
          <input
            :id="'federal-' + index"
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
          :for="'region-' + index"
          class="selectLabel"
          v-for="(item, index) in props.filterByData.federals"
          :key="'region-' + index"
          @click.prevent="selectItem(item.name)"
        >
          <input
            :id="'region-' + index"
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
          v-for="(item, index) in props.filterByData.regions.filter(
            (item) => item.id !== 86,
          )"
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
          v-model="selectedDate"
          @save="handleSaveDate"
          @close="handleClose"
        />
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.select {
  min-width: 208px;
  width: 100%;
  height: 40px;
  font-family: "Gothampro-normal";
  font-size: 16px;
  line-height: 130%;
  border: var(--vt-c-light-grey-1);

  @media (min-width: 561px) and (max-width: 760px) {
    & {
      min-width: 120px;
      max-width: 100%;
    }
  }

  @media (min-width: 360px) and (max-width: 560px) {
    & {
      min-width: 100%;
      width: 100%;
    }
  }

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
  overflow: hidden;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;

  @media (min-width: 561px) and (max-width: 760px) {
    & {
      padding: 12px 30px 12px 12px;
      font-size: 14px;
      padding-right: 30px;
    }
  }

  @media (min-width: 360px) and (max-width: 560px) {
    & {
      padding: 12px 40px 12px 16px;
      font-size: 14px;
    }
  }

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

    @media (min-width: 561px) and (max-width: 760px) {
      & {
        top: 60%;
        right: 13px;
      }
    }

    @media (min-width: 360px) and (max-width: 560px) {
      & {
        top: 60%;
        right: 20px;
      }
    }
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

  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

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
  min-width: 360px;
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

  @media (min-width: 561px) and (max-width: 760px) {
    & {
      font-size: 12px;
    }
  }

  @media (min-width: 360px) and (max-width: 560px) {
    & {
      font-size: 12px;
    }
  }
}
</style>
