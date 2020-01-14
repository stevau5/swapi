<template>
  <div id="app">
    <h3>Swapi</h3>
    <LeftColumn v-on:item="onReceiveItem"/>
    <div v-if="this.hasBeenReceived">
      <Showcase :item="this.currentItem"/>
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
  data() {
    return {
      hasBeenReceived: false,
      currentItem: []
    }
  },
  methods: {
    onReceiveItem(item) {
      this.currentItem = item;
      this.hasBeenReceived = true; 
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
  display: block;
  
}
</style>
