<template>
  <div class="inputContainer">
    <label for="search" class="label">
      <input
        placeholder="Поиск"
        id="search"
        class="input"
        v-model="inputState"
        @keyup.enter="emitFilters"
        @click="emitFilters"
      />
      <IconSearch />
    </label>
  </div>
</template>

<script setup lang="ts">
import IconSearch from "@/components/icons/IconSearch.vue";
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

<style lang="scss" scoped>
.inputContainer {
  box-sizing: content-box;
  border-radius: 10px;
  border: 1px solid var(--vt-c-light-grey-1);
  background-color: transparent;
  padding: 17.5px 24px;

  width: 300px;
  align-items: center;
  font-size: 16px;
  font-family: "Gothampro-normal";

  svg {
    color: var(--vt-c-dark-grey);
    cursor: pointer;
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
}

.label {
  border: 0px solid transparent;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  line-height: 130%;
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
