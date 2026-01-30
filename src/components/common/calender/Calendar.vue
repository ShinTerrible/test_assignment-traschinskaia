<script setup lang="ts">
import IconArrowLeft from "../../icons/IconArrowLeft.vue";
import IconArrowRight from "../../icons/IconArrowRight.vue";
import { computed, ref } from "vue";
import Button from "../buttons/Button.vue";


const emit = defineEmits<{
  save: [value: Date];
}>();


let today = new Date();
let currentMonth = ref(today.getMonth());
let currentYear = ref(today.getFullYear());
let selectedDate = ref<Date | null>(null);

let startDate = ref<Date | null>(null);
let endDate = ref<Date | null>(null);

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const calendarDays = computed(() => generateCalendar());

function generateCalendar() {
  const firstDayOfTheMonth = new Date(currentYear.value, currentMonth.value, 1);
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);

  let startDay = ref(firstDayOfTheMonth.getDay());

  startDay.value = (startDay.value + 6) % 7;
  const days = [];

  for (let i = 0; i < startDay.value; i++) {
    const date = new Date(
      currentYear.value,
      currentMonth.value,
      -(startDay.value - i - 1),
    );

    days.push({
      date,
      currentMonth: false,
      isToday: isToday(date),
      isSelected: isSelected(date),
    });
  }
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i);

    days.push({
      date,
      currentMonth: true,
      isToday: isToday(date),
      isSelected: isSelected(date),
    });
  }

  while (days.length % 7 !== 0) {
    const date: Date = new Date(
      currentYear.value,
      currentMonth.value + 1,
      days.length - lastDayOfMonth.getDate() - startDay.value + 1,
    );

    days.push({
      date,
      currentMonth: false,
      isToday: isToday(date),
      isSelected: isSelected(date),
    });
  }

  return days;
}

function isToday(date: Date) {
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isSelected(date: Date) {
  const normalizeDate = (d: Date) => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  };

  const currentDateNormalized = normalizeDate(date);

  if (
    startDate.value &&
    currentDateNormalized === normalizeDate(startDate.value)
  ) {
    return true;
  }

  if (endDate.value && currentDateNormalized === normalizeDate(endDate.value)) {
    return true;
  }

  return false;
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
}

function selectDate(day: any) {
  const clickedDate = day.date;

  selectedDate.value = null;


  if (!startDate.value || endDate.value) {
    startDate.value = clickedDate;
    endDate.value = null;
    return;
  }

  if (startDate.value && !endDate.value) {
    if (clickedDate >= startDate.value) {
      endDate.value = clickedDate;
    }
    else {
      endDate.value = startDate.value;
      startDate.value = clickedDate;
    }
  }
}

function isInRange(date: Date) {
  if (!startDate.value || !endDate.value) return false;

  const normalizeDate = (d: Date) => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const current = normalizeDate(date);
  const start = normalizeDate(startDate.value);
  const end = normalizeDate(endDate.value);

  return current > start && current < end;
}

function clearDataState() {
  selectedDate.value = null;
  startDate.value = null;
  endDate.value = null;
}

function onSaveData() {
  emit("save", startDate.value as Date);
}
</script>

<template>
  <div class="calendarContainer">
    <div class="header">
      <h3>Выбрать период</h3>
      <div class="headerButtonConatiner">
        <Button title="" variant="secondary" @click.stop.prevent="prevMonth"
          ><template #icon> <IconArrowLeft /></template
        ></Button>
        <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
        <Button title="" variant="secondary" @click="nextMonth"
          ><template #icon><IconArrowRight /></template
        ></Button>
      </div>
    </div>
    <div class="calendarGrid">
      <div class="calendarWeekDays">
        <div v-for="wday in weekDays" :key="wday">
          <span>{{ wday }}</span>
        </div>
      </div>
      <div class="calendarDays">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="{
            notCurrentMonth: !day.currentMonth,
            today: day.isToday,
            selected: day.isSelected,
            range: isInRange(day.date),
          }"
          @click="selectDate(day)"
        >
          {{ day.date.getDate() }}
        </div>
      </div>
    </div>
    <div class="buttonContainer">
      <Button variant="secondary" title="Отмена" @click.stop.prevent="clearDataState" />
      <Button
        variant="primary"
        title="Сохранить"
        @click.stop.prevent="onSaveData"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

@mixin alignContent {
  display: flex;
  flex-direction: column;
}

.calendarContainer {
  @include alignContent;
  height: 482px;
  width: 364px;
  border-radius: 16px;
  background-color: var(--vt-f-white);
  padding: 24px;
  gap: 16px;
  margin: auto;
  margin-block-end: 16px;
}

.header {
  @include alignContent;

  font-family: "Gothampro-medium";
  font-size: 20px;
  line-height: 140%;

  h3 {
    display: block;
    padding-block-end: 16px;
    border-bottom: 1px solid var(--vt-c-light-grey-1);
  }
}

.headerButtonConatiner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: "Gothampro-medium";
  font-size: 16px;
  line-height: 140%;
  font-weight: 600;
  height: 40px;
  margin-block-start: 10px;

  button {
    border: 1px solid transparent;

    &:hover {
      border: none;
    }
  }
}

.calendarGrid {
  @include alignContent;

  flex-wrap: wrap;
  gap: 10px;
}

.calendarWeekDays {
  display: flex;
  flex-direction: row;
  gap: 10px;

  div {
    @include alignContent;
    width: 34px;
    height: 34px;

    justify-content: center;
    text-align: center;
  }
}

.calendarDays {
  gap: 13px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 34px;

  div {
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    font-family: "Gothampro-normal";
    color: var(--vt-c-grey-1);
    font-size: 14px;

    &:hover {
      background-color: var(--vt-c-corp-selected);
    }

    &.today {
      background-color: var(--vt-c-corp-selected);
    }

    &.selected {
      background-color: var(--vt-c-corp);
    }

    &.notCurrentMonth {
      color: var(--vt-c-grey);
    }

    &.range {
      background-color: var(--vt-c-corp-selected);
    }
  }
}

.buttonContainer {
  display: flex;
  gap: 20px;

  button {
    min-width: 148px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
