<template>
    <div class="showcase">
        <h3>Results</h3>
        <div v-if="item.birth_year">
            <p>Name: {{item.name}}</p>
            <p>Birth Year: {{item.birth_year}}</p>
            <p>Homeworld: {{homeworld}}</p>
            <p >Starships: {{getStarships(item.starships)}} {{this.starships}}</p>
        </div>
        <div v-else>
            <p>Model: {{item.model}}</p>
            <p>Manufacturer: {{item.manufacturer}}</p>
            <p>Starship Class: {{item.starship_class}}</p>
            <!-- <p>Pilots: {{getPilots(item.pilots)}} {{this.pilots}}</p> -->
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
    },
    watch: {
        item() {
            this.getHomeworld();
            this.s_counter = 0;
            this.p_counter = 0; 
        }
    },
    data() {
        return {
            homeworld: '',
            starships: [],
            pilots: [],
            s_counter: 0,
            p_counter: 0
        }
    },
    methods: {
        async getHomeworld(){
            try {
                const response = await axios.get(this.item.homeworld);
                this.homeworld = response.data.name;
                // eslint-disable-next-line no-console
                console.log(response.data.name)
            } catch(error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }
        },
        getStarships(ships){
            if(this.s_counter == 0){
                this.starships = []
                ships.forEach(async i => {
                    try {
                        const response = await axios.get(i)
                        this.starships.push(response.data.name); 
                    } catch(error){
                        // eslint-disable-next-line no-console
                        console.log(error)
                    }
                });
            }
            this.s_counter = 1;
        },
        getPilots(pilot){
            if(this.p_counter == 0){
                this.pilots = []
                pilot.forEach(i => {
                    axios.get(i).then((response) => {
                        this.pilots.push(response.data);
                    })
                })
            }
            this.p_counter == 1;
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