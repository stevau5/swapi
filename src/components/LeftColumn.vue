<template>
  <div class="column">
    <button @click="getPeople"> GET PEOPLE </button>
    <button @click="getStarship"> GET STARSHIP </button>
    <br>
    <br>

    <div v-if="this.lastClicked == 0">
      <p 
        v-for="name in this.people" 
        :key="name" 
        @click="test"
      > {{ name.name }} </p>
    </div>

    <div v-if="this.lastClicked == 1">
      <p
        v-for="ship in this.starships"
        :key="ship"
        @click="test"
      > {{ship.name}}</p>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';

const ROOT_URL = "https://swapi.co/api";

export default {

  name: 'LeftColumn',
  props: {
    
  },
  data() {
    return {
      people: [],
      starships: [],
      lastClicked: null
    }
  },

  methods: {
    getPeople() {
      // eslint-disable-next-line no-console
      console.log("getPeople");
      this.lastClicked = 0
      // call swapi api for people
      axios.get(`${ROOT_URL}/people/`).then((response) => {
        //store in local data    
        this.people = response.data.results;
      })
    },
    getStarship() {
      // eslint-disable-next-line no-console
      console.log("getStarship");
      this.lastClicked = 1
      // call swapi api for starship
      axios.get(`${ROOT_URL}/starships/`).then((response) => {
        this.starships = response.data.results;
      })
    },
    test() {
      // eslint-disable-next-line no-console
      console.log("hello")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .column {
    width: 25%;
    background-color: #eee;
  }
</style>
