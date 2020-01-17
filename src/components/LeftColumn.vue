<template>
  <div class="column">
    <div class="container">
      <h3>Swapi</h3>
      <button class="btn btn-primary" @click="getResources('people')" :disabled="isPeopleButtonHidden"> GET PEOPLE </button>
      <button class="btn btn-primary" @click="getResources('starships')" :disabled="isStarshipButtonHidden"> GET STARSHIP </button>
      

      <form @submit.prevent="searchResources('people')" v-if="resource === 'people'">
        <label for="name"> Search People: </label>
        <input type="text" name="name" v-model="searchTerm">
        <input class="btn btn-info" type="submit" value="Search"> {{searchResult}}
      </form>

      <form @submit.prevent="searchResources('starships')" v-if="resource === 'starships'">
        <label for="name"> Search Ship: </label>
        <input type="text" name="name" v-model="searchTerm">
        <input class="btn btn-info" type="submit" value="Search"> {{searchResult}}
      </form>

      <div v-if="resource !== null">
        <p
        v-for="resource in resources"
        :key="resource.name"
        @click="showItem(resource)"
        >{{resource.name}}</p>
      </div>

      <nav aria-label="..." v-if="resource === 'people'">
        <ul class="pagination pagination-sm">
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(1, 'people')">1</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(2, 'people')">2</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(3, 'people')">3</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(4, 'people')">4</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(5, 'people')">5</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(6, 'people')">6</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(7, 'people')">7</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(8, 'people')">8</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(9, 'people')">9</a></li>
        </ul>
      </nav>

      <nav aria-label="..." v-else-if="resource === 'starships'">
        <ul class="pagination pagination-sm">
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(1, 'starships')">1</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(2, 'starships')">2</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(3, 'starships')">3</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(4, 'starships')">4</a></li>
          <li class="page-item"><a class="page-link" @click="loadMoreResourceItems(5, 'starships')">5</a></li>
        </ul>
      </nav>
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

      isPeopleButtonHidden: false, 
      isStarshipButtonHidden: false,
    }
  },
  watch: {
    resources() {
      this.buttonToggle(this.resource)
    }
  },

  computed: {
    ...mapGetters(['allResources']),
    ...mapState(['resources']),
  },

  methods: {
    getResources(resource) {
      this.resource = resource;
      this.$store.dispatch('fetchResources', resource);
    },

    showItem(item) {
      this.$store.commit('setItem', item);
    },

    searchResources(resource){
      this.$store.dispatch('searchResources', {
        searchTerm: this.searchTerm,
        resource,
      });
    },

    loadMoreResourceItems(page, resource){
      this.$store.dispatch('loadItems', {
        resource, 
        page
      });
    },
    buttonToggle(resource){
      if(resource === 'people') {
        this.isPeopleButtonHidden = true,
        this.isStarshipButtonHidden = false
      } else if(resource === 'starships') {
        this.isPeopleButtonHidden = false,
        this.isStarshipButtonHidden = true
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
  nav {
    cursor: pointer;
  }

</style>
