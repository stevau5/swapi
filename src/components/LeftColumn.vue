<template>
  <div class="column">
    <h3>Swapi</h3>
    <button @click="getPeople" :disabled="isPeopleButtonDisabled"> GET PEOPLE </button>
    <button @click="getStarship" :disabled="isStarshipButtonDisabled"> GET STARSHIP </button>
    

    <form @submit.prevent="searchPeople" v-if="lastClicked == 0">
      <label for="name"> Search People: </label>
      <input type="text" name="name" v-model="searchTerm">
      <input type="submit" value="Search"> {{searchResult}}
    </form>

    <form @submit.prevent="searchShip" v-if="lastClicked == 1">
      <label for="name"> Search Ship: </label>
      <input type="text" name="name" v-model="searchTerm">
      <input type="submit" value="Search"> {{searchResult}}
    </form>

    <div v-if="lastClicked == 0">
      <p 
        v-for="person in people" 
        :key="person.name" 
        @click="showItem(person)"
      > {{ person.name }} </p>
    </div>

    <div v-if="lastClicked == 1">
      <p
        v-for="ship in starships"
        :key="ship.name"
        @click="showItem(ship)"
      > {{ship.name}}</p>
    </div>

    <div class="loadMoreButton" v-if="lastClicked === 0 || lastClicked === 1">
      <button @click="loadMoreItems" :disabled="isLoadMoreBUttonDisabled"> LOAD MORE </button>
    </div>
  </div>
</template>

<script>
import swapi from '../api/swapi';

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
    async getPeople() {
      try {
        this.lastClicked = 0
        this.isPeopleButtonDisabled = true
        const response = await swapi.fetchPeople();
        this.people =response.data.results;
        this.isPeopleButtonDisabled = false
      } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
      }
    },
    async getStarship() {
      try {
        this.lastClicked = 1
        this.isStarshipButtonDisabled = true
        const response = await swapi.fetchShip();
        this.starships = response.data.results;
        this.isStarshipButtonDisabled = false
      } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
    },
    showItem(item) {
      //emit item to component above.
      this.$emit('item', item);
    },
    async searchShip(){
      try {
        const response = await swapi.searchShip(this.searchTerm);
        this.starships = response.data.results;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    async searchPeople(){      
      try {
        const response = await swapi.searchPeople(this.searchTerm);
        if(response.data.results < 1) {
          this.searchResult = "no results found"
        } else {
          this.searchResult = `${response.data.results.length} results found`
          this.people = response.data.results;
        }
      } catch(error){
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    async loadMoreItems(){
      try {
        this.isLoadMoreBUttonDisabled = true
        if(this.lastClicked == 0 && this.currentPeoplePage < 8){      
            const response = await swapi.loadMorePeopleItems(this.currentPeoplePage);
            this.people = response.data.results; 
            this.currentPeoplePage++; 
            this.isLoadMoreBUttonDisabled = false; 
        
        } else if(this.lastClicked == 1 && this.currentStarshipPage < 5){
            const response = await swapi.loadMoreStarshipItems(this.currentStarshipPage);
            this.starships = response.data.results
            this.currentStarshipPage++;
            this.isLoadMoreBUttonDisabled = false;  
          }
      } catch(error) {
        // eslint-disable-next-line no-console
        console.log(error)
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
