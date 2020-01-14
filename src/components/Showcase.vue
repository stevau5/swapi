<template>
    <div class="showcase">
        <h3>Results</h3>
        <div v-if="item.birth_year">
            <p>Name: {{item.name}}</p>
            <p>Birth Year: {{item.birth_year}}</p>
            <p>Homeworld: {{getHomeworld()}} {{this.homeworld}}</p>
            <p>Starships: {{getStarships(item.starships)}} {{this.starships}}</p>
        </div>
        <div v-else>
            <p>Model: {{item.model}}</p>
            <p>Manufacturer: {{item.manufacturer}}</p>
            <p>Starship Class: {{item.starship_class}}</p>
            <p>Pilots: </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Showcase",
    props: {
        item: {
            type: Object
        },
        counter: {
            type: Number
        }
    },
    data() {
        return {
            homeworld: '',
            starships: [],
        }
    },
    methods: {
        getHomeworld(){
                axios.get(this.item.homeworld).then((response) => {
                    this.homeworld = response.data.name;
                });
            
        },
        getStarships(ships){
            if(this.counter == 0){
                this.starships = []
                ships.forEach(i => {
                    axios.get(i).then((response) => {
                        this.starships.push(response.data.name);
                    })
                });
            }

            this.counter = 1;
        }
    }
}
</script>

<style scoped>
.showcase{
    background-color: lightblue;
    width: 100%;
    padding: 10px;
}
h3{
    text-align: center;
}
</style>