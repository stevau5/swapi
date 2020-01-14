<template>
    <div class="showcase">
        <div v-if="item.birth_year">
            <p>Name: {{item.name}}</p>
            <p>Birth Year: {{item.birth_year}}</p>
            <p>Homeworld: {{getHomeworld(item.homeworld)}} {{this.homeworld}}</p>
        </div>
        <div v-else>
            <p>Model: {{item.model}}</p>
            <p>Manufacturer: {{item.manufacturer}}</p>
            <p>Starship Class: {{item.starship_class}}</p>
            <p>Pilots: {{item.pilots}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Showcase",
    props: {
        item: {
            type: []
        }
    },
    data() {
        return {
            homeworld: ''
        }
    },
    methods: {
        getHomeworld(home){
            axios.get(home).then((response) => {
                this.homeworld = response.data.name;
            });
        }
    }
}
</script>

<style scoped>
.showcase{
    background-color: lightblue;
    width: 70%;
}
</style>