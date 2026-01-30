<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  variant: "default" | "checked" | "empty";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "checked",
});

let color = ref("currentColor");
if (props.variant === "empty") {
  color.value = "#D3D3DE";
}
</script>

<template>
  <div class="iconContainer">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="checkboxWrapper"
    >
      <path
        d="M1.5 20H18.5L20 18.75V1.25L18.5 0H1.5L0 1.25V18.75L1.5 20Z"
        :fill="color"
      />
    </svg>

    <div v-if="variant === 'checked'" class="checked">
      <svg
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="check"
      >
        <path
          d="M0.52211 4.87661L4.27211 8.51297H5.14711L12.6471 0.51297"
          stroke="#F1F4FD"
          stroke-width="1.5"
          stroke-miterlimit="10"
        />
      </svg>
    </div>

    <div v-else-if="variant === 'default'" class="default">
      <svg
        width="11"
        height="2"
        viewBox="0 0 11 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="def"
      >
        <path
          d="M11 0.75H0"
          stroke="#F1F4FD"
          stroke-width="1.5"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
    <div v-else-if="variant === 'empty'"></div>
  </div>
</template>

<style lang="scss" scoped>
.checkboxWrapper {
  width: 20px;
  height: 20px;
  @media (min-width: 360px) and (max-width: 560px) {
    & {
      width: 14px;
      height: 14px;
    }
  }
}

.check {
  width: 14px;
  height: 10px;
  @media (min-width: 360px) and (max-width: 560px) {
    & {
      width: 10px;
      height: 6px;
    }
  }
}

.def {
  width: 11px;
  height: 2px;
  @media (min-width: 360px) and (max-width: 560px) {
    & {
      width: 10px;
      height: 1.5px;
    }
  }
}
.iconContainer {
  position: relative;
  cursor: pointer;
}

.checked {
  position: absolute;
  bottom: 5px;
  left: 3.5px;
  z-index: 2;
  @media (min-width: 360px) and (max-width: 560px) {
    & {
      bottom: 4px;
      left: 2.8px;
    }
  }
}
.default {
  position: absolute;
  bottom: 9px;
  left: 5px;
  z-index: 2;

  @media (min-width: 360px) and (max-width: 560px) {
    & {
      bottom: 6px;
      left: 2px;
    }
  }
}
</style>
