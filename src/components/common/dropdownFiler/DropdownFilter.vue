<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Props {
  data: string[];
}

interface Emit {
  (e: "change-limit", limit: string): void;
}
const props = defineProps<Props>();

const emit = defineEmits<Emit>();

const dataState = ref(props.data[0]);
const selectState = ref("");
const selectElement = ref<HTMLElement | null>(null);

const toggleSelect = () => {
  selectState.value = selectState.value === "active" ? "" : "active";
};

const selectItem = (item: string) => {
  dataState.value = item;
  selectState.value = "";


  emit("change-limit", item);
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
      >
        {{ dataState }}
      </div>

      <div class="selectContent">
        <label
          :for="'singleSelect' + index"
          class="selectLabel"
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
  width: 73px;

  height: 40px;
  font-family: "Gothampro-normal";
  font-size: 12px;
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
  font-size: 12px;
  line-height: 130%;
  padding: 10px 16px;
  color: var(--vt-c-grey-1);

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
    top: 50%;
    right: 20px;

    display: block;
    width: 9px;
    height: 1px;

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
  top: -218px;
  left: 0px;
  width: 100%;
  padding: 6px;
  display: flex;
  flex-direction: column-reverse;
  gap: 1px;
  width: 73px;
  border-radius: 8px;
  background-color: var(--vt-f-white);
  display: none;
  max-height: fit-content;
  overflow-y: scroll;

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  transition: all 0.3s ease-out;

  z-index: 0;
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
  font-size: 12px;

  &:hover {
    background-color: var(--vt-c-light-grey-1);
  }
}
</style>
