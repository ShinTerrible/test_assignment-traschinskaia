<script setup lang="ts">
import IconSearch from "../../icons/IconSearch.vue";
import { ref, watch } from "vue";
interface Props {
  modelValue?: string;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
  (e: "search-change", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
});

const emit = defineEmits<Emits>();
const inputState = ref<string>(props.modelValue);
watch(
  () => props.modelValue,
  (newValue) => {
    inputState.value = newValue;
  },
);
function emitFilters() {
  emit("update:modelValue", inputState.value);
  emit("search-change", inputState.value);
}
</script>

<template>
  <div class="inputContainer">
    <label for="search" class="label" @keyup.enter="emitFilters">
      <input
        placeholder="Поиск"
        id="search"
        class="input"
        v-model="inputState"
      />
    </label>
    <IconSearch class="searchIcon" @click="emitFilters" />
  </div>
</template>

<style lang="scss" scoped>
.inputContainer {
  box-sizing: content-box;
  border-radius: 10px;
  border: 1px solid var(--vt-c-light-grey-1);
  background-color: transparent;
  padding: 17.5px 24px;
  display: flex;
  min-width: 200px;
  align-items: center;
  font-size: 16px;
  font-family: "Gothampro-normal";
  max-height: 60px;
  cursor: pointer;

  svg {
    color: var(--vt-c-dark-grey);
    width: 22px;
    height: 22px;
    min-width: 22px;
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--vt-f-white);
    color: var(--vt-c-dark-grey);

    svg {
      color: var(--vt-c-grey-1);
    }
  }

  &:focus-within {
    background-color: var(--vt-f-white);
    color: var(--vt-c-dark-grey);

    svg {
      color: var(--vt-c-grey-1);
    }
  }

  @media (min-width: 360px) and (max-width: 560px) {
    & {
      padding: 12px 26px 12px 16px;
      flex-direction: row;

      svg {
        width: 16px;
        height: 16px;
        min-width: 16px;
      }
    }
  }
}

.label {
  border: 0px solid transparent;
  background-color: transparent;
  display: flex;
  line-height: 130%;

  @media (min-width: 360px) and (max-width: 560px) {
    & {
      width: 100%;
    }
  }
}

.input {
  border: 0;
  background-color: transparent;
  font-family: inherit;
  color: var(--vt-c-dark-grey);
  font-size: 16px;

  &:placeholder {
    color: var(--vt-c-dark-grey);
  }

  &:focus-visible {
    outline: none;
  }

  &focus {
    outline: none;
  }
}
</style>
