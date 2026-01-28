<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import Calendar from "../calender/Calendar.vue";

interface Props {
  data: string[] | "calendar";
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [
    "Астана",
    "Берлин",
    "Владивосток",
    "Катар",
    "Астана",
    "Берлин",
    "Владивосток",
    "Катар",
  ],
});

const dataState = ref(props.data[0]);
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
        :data-default="props.data[0]"
        @click="toggleSelect"
        v-if="Array.isArray(props.data)"
      >
        {{ dataState }}
      </div>

      <div
        class="selectTitle"
        :data-default="props.data[0]"
        @click="toggleSelect"
        v-if="props.data === 'calendar'"
      >
        {{ selectedDateDisplay }}
      </div>

      <div class="selectContent">
        <label
          :for="'singleSelect' + index"
          class="selectLabel"
          v-if="Array.isArray(props.data)"
          v-for="(item, index) in props.data"
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

        <Calendar
          v-if="props.data === 'calendar'"
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
  // max-height: 150px;
  overflow-y: scroll;
  border-top: 10px solid transparent;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  transition: all 0.3s ease-out;

  z-index: 1;
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
  padding: 13px 16px;
  display: flex;
  align-items: center;
  height: 40px;
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
