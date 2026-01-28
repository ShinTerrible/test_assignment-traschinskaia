<script lang="ts" setup>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import Button from "../buttons/Button.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";
</script>

<template>
  <nav aria-label="Pagination" class="navigation">
    <Button title="" variant="secondary" class="button">
      <template #icon><IconArrowLeft /></template>
    </Button>
    <ul class="pagination">
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#" class="active">3</a></li>
      <li><a href="#">...</a></li>
      <li><a href="#">10</a></li>
    </ul>
    <Button title="" variant="secondary"
      ><template #icon><IconArrowRight /></template
    ></Button>
  </nav>
</template>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: row;
}

.pagination {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  gap: 2px;

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    text-align: center;
    font-family: "Gothampro-normal";
    font-size: 12px;
    line-height: 130%;
    letter-spacing: 0;
    width: 36px;
    height: 36px;
    color: var(--vt-c-grey-1);
    background-color: transparent;
    cursor: pointer;
    padding: auto;
    border-radius: 8px;

    &:hover {
      background-color: var(--vt-f-white);
    }

    &:active {
      background-color: var(--vt-c-light-grey-4);
    }
  }
}

.button {
  color: var(--vt-c-dark-grey-2);
  padding: 12px 19px;

  &:first-of-type {
    margin-inline-end: 24px;
  }

  &:last-of-type {
    margin-inline-start: 24px;
  }
}
</style>
