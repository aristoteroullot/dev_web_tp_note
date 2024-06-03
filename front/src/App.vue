<template>
  <div class=" container ">
    <MeNu></MeNu>
    <IndexPage></IndexPage>
  </div>
</template>

<script>
import MeNu from "./components/MeNu.vue"
import IndexPage from "./components/IndexPage.vue";

export default {
  name: 'App',
  components: {
    IndexPage,
    MeNu
  }
}
</script>

<style></style>