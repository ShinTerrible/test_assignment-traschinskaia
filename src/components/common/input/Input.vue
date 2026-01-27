<template>
  <div class="inputContainer">
    <label :for="type" class="label">
      <input :placeholder="placeholder" :id="type" class="input" />
      <IconSearch />
    </label>
  </div>
</template>

<script setup lang="ts">
import IconSearch from "@/components/icons/IconSearch.vue";

interface Props {
  type: "search" | "filter";
  placeholder: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "search",
  placeholder: "Поиск",
});
</script>

<style lang="scss" scoped>
.inputContainer {
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
