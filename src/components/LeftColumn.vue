<template>
  <div class="column">
    <h3>Swapi</h3>
    <button @click="getPeople" :disabled="isPeopleButtonDisabled"> GET PEOPLE </button>
    <button @click="getStarship" :disabled="isStarshipButtonDisabled"> GET STARSHIP </button>
    

    <form @submit.prevent="searchPeople" v-if="this.lastClicked == 0">
      <label for="name"> Search People: </label>
      <input type="text" name="name" v-model="searchTerm">
      <input type="submit" value="Search"> {{this.searchResult}}
    </form>

    <form @submit.prevent="searchShip" v-if="this.lastClicked == 1">
      <label for="name"> Search Ship: </label>
      <input type="text" name="name" v-model="searchTerm">
      <input type="submit" value="Search"> {{this.searchResult}}
    </form>

    <div v-if="this.lastClicked == 0">
      <p 
        v-for="name in this.people" 
        :key="name" 
        @click="showItem(name)"
      > {{ name.name }} </p>
    </div>

    <div v-if="this.lastClicked == 1">
      <p
        v-for="ship in this.starships"
        :key="ship"
        @click="showItem(ship)"
      > {{ship.name}}</p>
    </div>

    <div class="loadMoreButton" v-if="this.lastClicked === 0 || this.lastClicked === 1">
      <button @click="loadMoreItems" :disabled="this.isLoadMoreBUttonDisabled"> LOAD MORE </button>
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
      lastClicked: null,
      searchTerm: '',
      searchResult: '',
      currentPeoplePage: 2,
      currentStarshipPage: 2,
      isPeopleButtonDisabled: false,
      isStarshipButtonDisabled: false,
      isLoadMoreBUttonDisabled: false  
    }
  },

  methods: {
    getPeople() {
      this.lastClicked = 0
      this.isPeopleButtonDisabled = true
        // call swapi api for people
        axios.get(`${ROOT_URL}/people/`).then((response) => {
          //store in local data    
          this.people =response.data.results;
          this.isPeopleButtonDisabled = false
        })
      
    },
    getStarship() {
      this.lastClicked = 1
      this.isStarshipButtonDisabled = true
      // call swapi api for starship
      axios.get(`${ROOT_URL}/starships/`).then((response) => {
        this.starships = response.data.results;
        this.isStarshipButtonDisabled = false
      })
    },
    showItem(item) {
      //emit item to component above.
      this.$emit('item', item);
    },
    searchShip(){
      axios.get(`${ROOT_URL}/starships/?search=${this.searchTerm}`).then((response) => {
        this.starships = response.data.results;
      })
    },
    searchPeople(){      
      axios.get(`${ROOT_URL}/people/?search=${this.searchTerm}`).then((response) => {
        if(response.data.results < 1) {
          this.searchResult = "no results found"
        } else {
          this.searchResult = `${response.data.results.length} results found`
          this.people = response.data.results;
        }
        
      });
    },
    loadMoreItems(){
      this.isLoadMoreBUttonDisabled = true
      if(this.lastClicked == 0 && this.currentPeoplePage < 8){      
          axios.get(`${ROOT_URL}/people/?page=${this.currentPeoplePage}`).then((response) => {
            this.people = response.data.results; 
            this.currentPeoplePage++; 
            this.isLoadMoreBUttonDisabled = false; 
          })
      } else if(this.lastClicked == 1 && this.currentStarshipPage < 5){
            axios.get(`${ROOT_URL}/starships/?page=${this.currentStarshipPage}`).then((response) => {
              this.starships = response.data.results
              this.currentStarshipPage++;
              this.isLoadMoreBUttonDisabled = false; 
            }) 
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .column {
    width: 25%;
    background-color: #eee;
    margin-right: 50px;
  }
  button{
    margin-right: 20px;
    margin-bottom: 20px;
  }
  form {
    margin-bottom: 20px;
  }
  p:hover {
    background-color: white;
    cursor: pointer;
  }
  h3{
    text-align: center;
  }

</style>
