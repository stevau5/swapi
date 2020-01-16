<template>
  <div class="column">
    <h3>Swapi</h3>
    <button @click="getResource('people')" :disabled="isPeopleButtonDisabled"> GET PEOPLE </button>
    <button @click="getResource('starships')" :disabled="isStarshipButtonDisabled"> GET STARSHIP </button>
    

    <form @submit.prevent="searchResource('people')" v-if="resource === 'people'">
      <label for="name"> Search People: </label>
      <input type="text" name="name" v-model="searchTerm">
      <input type="submit" value="Search"> {{searchResult}}
    </form>

    <form @submit.prevent="searchResource('starships')" v-if="resource === 'starships'">
      <label for="name"> Search Ship: </label>
      <input type="text" name="name" v-model="searchTerm">
      <input type="submit" value="Search"> {{searchResult}}
    </form>

    <div v-if="resource !== null">
      <p
      v-for="resource in resourceItems"
      :key="resource.name"
      @click="showItem(resource)"
      >{{resource.name}}</p>
    </div>

    <div class="loadMoreButton" v-if="resource !== null">
      <button @click="loadMoreResourceItems(resource)" :disabled="isLoadMoreBUttonDisabled"> LOAD MORE </button>
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
      resource: null,
      resourceItems: [],

      people: [],
      starships: [],

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
    async getResource(resource) {
      try {
        this.resource = resource;
        this.toggleButton(resource)
        const response = await swapi.getResource(resource);
        this.resourceItems = response.data.results;
        this[resource] = response.data.results;
        this.toggleButton(resource)
      } catch(error){
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },

    showItem(item) {
      //emit item to component above.
      this.$emit('item', item);
    },

    async searchResource(resource){
      try {
        const response = await swapi.searchResource(this.searchTerm, resource);
        if(response.data.results < 1) {
          this.searchResult = "no results found"
        } else {
          this.searchResult = `${response.data.results.length} results found`
          this.resourceItems = response.data.results;
          this[resource] = response.data.results;
        }
      } catch(error){
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },

    async loadMoreResourceItems(resource){
      try{
        this.isLoadMoreBUttonDisabled = true;
        if(resource === "people" && this.currentPeoplePage < 9){
          const response = await swapi.loadMoreResourceItems(resource, this.currentPeoplePage);
          this.resourceItems = response.data.results; 
          this[resource] = response.data.results;
          this.currentPeoplePage++
        } else if(resource === "starships" && this.currentStarshipPage < 5){
            const response = await swapi.loadMoreResourceItems(resource, this.currentStarshipPage);
            this.resourceItems = response.data.results; 
            this[resource] = response.data.results;
            this.currentStarshipPage++;
        }
        this.isLoadMoreBUttonDisabled = false; 
      } catch(error){
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },

    toggleButton(resource){
      if(resource === 'people' && !this.isPeopleButtonDisabled){
        this.isPeopleButtonDisabled = true
      } else if(resource === 'starships' && !this.isStarshipButtonDisabled){
          this.isStarshipButtonDisabled = true
      } else if(resource === 'people' && this.isPeopleButtonDisabled){
        this.isPeopleButtonDisabled = false
      } else if(resource === 'starships' && this.isPeopleButtonDisabled)
      this.isStarshipButtonDisabled = false; 
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
