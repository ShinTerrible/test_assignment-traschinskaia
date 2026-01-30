<script setup lang="ts">
import { computed } from "vue";

interface Props {
  icon?: string;
  title?: string;
  disabled?: boolean;
  variant: "accent" | "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  disabled: false,
  variant: "primary",
});

const buttonClasses = computed(() => ["button", props.variant, props.icon]);
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled">
    <slot name="icon"></slot>
    <span name="title">{{ props.title }}</span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  font-family: "Gothampro-medium";
  font-size: 16px;
  line-height: 130%;
  border-radius: 10px;
  padding: 16px 24px;
  display: flex;
  gap: 5px;
  align-items: center;
  border: 0px solid transparent;
  background-color: transparent;
  cursor: pointer;
  color: var(--vt-f-black);

  @media (min-width: 769px) {
    & {
    padding: 16px 24px;
  line-height: 100%;

    }
  }

    @media (min-width: 360px) and (max-width: 768px) {
    & {
      padding: 11px 24px;
    }
  }
}

.accent {
  background-color: var(--vt-c-corp);

  &:not(:disabled):hover {
    background-color: var(--vt-c-corp-hovered);
  }

  &:not(:disabled):active {
    background-color: var(--vt-c-corp-pressed);
  }
}

.primary {
  background-color: var(--vt-c-black);
  color: var(--vt-f-white);

  &:not(:disabled):hover {
    background-color: var(--vt-c-corp-hovered);
    color: var(--vt-f-black);
  }

  &:not(:disabled):active {
    background-color: var(--vt-c-corp-pressed);
    color: var(--vt-f-black);
  }
}

.secondary {
  background-color: transparent;
  border: 1px solid var(--vt-c-dark-grey);

  &:not(:disabled):hover {
    border: 1px solid var(--vt-c-black);
    background-color: var(--vt-c-light-grey-4);
  }

  &:not(:disabled):active {
    border: 1px solid var(--vt-c-black);
    background-color: var(--vt-c-light-grey);
  }
}
</style>
