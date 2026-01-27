<script setup>
import Button from "./components/common/buttons/Button.vue";
import Dropdown from "./components/common/dropdown/Dropdown.vue";
import Input from "./components/common/input/Input.vue";
import IconDocumentation from "./components/icons/IconDocumentation.vue";
import Header from "./components/layout/Header.vue";
import Layout from "./components/layout/Layout.vue";
</script>

<template>
  <Header />

  <main class="main">
    <Layout />
  </main>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
}
</style>

<!-- <Button variant="primary" icon="document" title="Button" />
    <br />
    <Button variant="secondary" icon="document" title="Button" />
    <br />

    <Button variant="accent" icon="document" title="Button">
      <template #icon>
        <IconDocumentation />
      </template>
    </Button>
    <br />

    <Input />

    <br />

    <Input type="filter" placeholder="Name" />

    <br />

    <Dropdown />
    <br />
    <br /> -->
