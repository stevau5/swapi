<template>
  <div id="app">
    <LeftColumn v-on:item="test"/>
    <div v-if="true">
      <Showcase />
    </div>
  </div>
</template>

<script>
import LeftColumn from './components/LeftColumn.vue'
import Showcase from './components/Showcase'

export default {
  name: 'app',
  components: {
    LeftColumn,
    Showcase
  },
  props: {
    currentItem: {
      type: []
    }
  },
  methods: {
    test(item) {
      // eslint-disable-next-line no-console
      console.log(item);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  
}
</style>
