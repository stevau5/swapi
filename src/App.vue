<template>
  <div id="app">
    <LeftColumn />
    <div v-if="isShowingShowcase">
      <Showcase/> 
    </div>
  </div>
</template>

<script>
import LeftColumn from './components/LeftColumn.vue'
import Showcase from './components/Showcase'
import { mapState } from 'vuex'


export default {
  name: 'app',
  components: {
    LeftColumn,
    Showcase,
    
  },
  computed:{
      ...mapState(['item', 'isShowingShowcase'])
    },
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
