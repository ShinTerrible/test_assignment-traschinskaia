<script lang="ts" setup>
interface Props {
  level: string;
}

const props = withDefaults(defineProps<Props>(), {
  level: "",
});
</script>

<template>
  <span class="levelWrapper">{{ level }}</span>
</template>

<style lang="scss" scoped>
.levelWrapper {
  display: inline-block;
  padding: 4px 6px;
  border-radius: 8px;
  border: 1px solid var(--vt-c-grey-1-tone);
  text-align: center;
  color: var(--vt-c-grey-1);
  font-family: "Gothampro-normal";
  line-height: 130%;
  font-size: 12px;
  margin-inline: 2px;
  margin-block-end: 4px;
}
</style>
