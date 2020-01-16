<template>
  <div class="column">
    <h3>Swapi</h3>
    <button @click="getResources('people')" :disabled="isPeopleButtonDisabled"> GET PEOPLE </button>
    <button @click="getResources('starships')" :disabled="isStarshipButtonDisabled"> GET STARSHIP </button>
    

    <form @submit.prevent="searchResources('people')" v-if="resource === 'people'">
      <label for="name"> Search People: </label>
      <input type="text" name="name" v-model="searchTerm">
      <input type="submit" value="Search"> {{searchResult}}
    </form>

    <form @submit.prevent="searchResources('starships')" v-if="resource === 'starships'">
      <label for="name"> Search Ship: </label>
      <input type="text" name="name" v-model="searchTerm">
      <input type="submit" value="Search"> {{searchResult}}
    </form>

    <div v-if="resource !== null">
      <p
      v-for="resource in resources"
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
import { mapGetters, mapState } from 'vuex';

export default {

  name: 'LeftColumn',
  props: {
    
  },
  data() {
    return {
      resource: null,

      searchTerm: '',
      searchResult: '',

      currentPeoplePage: 2,
      currentStarshipPage: 2,

      isPeopleButtonDisabled: false,
      isStarshipButtonDisabled: false,
      isLoadMoreBUttonDisabled: false  
    }
  },
  computed: {
    ...mapGetters(['allResources']),
    ...mapState(['resources']),
  },

  methods: {
    getResources(resource) {
      this.toggleButton(resource, true)
      this.resource = resource;
      this.$store.dispatch('fetchResources', resource);
      this.toggleButton(resource, false)
    },

    showItem(item) {
      //emit item to component above.
      this.$emit('item', item);
    },

    searchResources(resource){
      const payload = {
        searchTerm: this.searchTerm,
        resource,
      }
      this.$store.dispatch('searchResources', payload);
    },

    loadMoreResourceItems(resource){
      if(this.currentPeoplePage < 9 && resource === "people"){
        const payload = {
          resource, 
          page: this.currentPeoplePage
        }
        this.$store.dispatch('loadItems', payload);
        this.currentPeoplePage++
      } else if(this.currentStarshipPage < 5 && resource === "starships") {
        const payload = {
          resource, 
          page: this.currentStarshipPage
        }
        this.$store.dispatch('loadItems', payload)
        this.currentStarshipPage++
      }
    },

    toggleButton(resource, status){
      if(resource === 'people'){
        this.isPeopleButtonDisabled = status
      } else if(resource === 'starships'){
        this.isStarshipButtonDisabled = status
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
