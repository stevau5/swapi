<template>
  <div id="app">
    <LeftColumn v-on:item="onReceiveItem"/>
    <div v-if="this.hasBeenReceived">
      <Showcase :item="this.currentItem" :s_counter=0 :p_counter=0 />
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
      currentItem: Object
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
  display:flex;
  
}
</style>
