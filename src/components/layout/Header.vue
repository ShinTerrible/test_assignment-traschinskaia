<script setup lang="ts">
import Logo from "../icons/Logo.vue";
import LogoInfo from "../icons/LogoInfo.vue";
</script>

<template>
  <header class="header">
    <div class="logoWrapper">
      <Logo />
      <div class="adressWrapper">
        <LogoInfo />
        <address class="address">
          <a href="tel:+79622532037">+7 962 253 20 37</a>
          <a href="mailto:sales@skillline.ru">sales@skillline.ru</a>
          <a href="skillline.ru">skillline.ru</a>
        </address>
      </div>
    </div>
    <h1 class="title">Tестовое задание</h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--vt-c-grey-1);
  padding: 48px;
  display: flex;
  flex-direction: column;
  height: 372px;
  gap: 48px;
}

.logoWrapper {
  display: flex;
  justify-content: space-between;
}

.adressWrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
  width: fit-content;
}

.address {
  display: flex;
  flex-direction: column;
  font:
    normal 700 14px "Gothampro-bold",
    sans-serif;
  line-height: 130%;
  color: var(--vt-c-dark-grey);
  text-align: end;
}

.title {
  font-family: "Gothampro-bold";
  font-size: 60px;
  color: var(--vt-f-white);
  flex-grow: 1;
  font-weight: 700;
  align-content: end;
}
</style>
