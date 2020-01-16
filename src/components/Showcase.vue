<template>
    <div class="showcase">
        <h3>Results</h3>
        <!-- <component :is="getResourceDetailView"  /> -->
        <div v-if="isPerson">
            <p>Name: {{item.name}}</p>
            <p>Birth Year: {{item.birth_year}}</p>
            <p>Homeworld: {{homeworld}}</p>
            <p >Starships: {{getStarships(item.starships)}} {{starships}}</p>
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
import swapi from '../api/swapi';
import { mapState } from 'vuex';

// import Person....;

export default {
    name: "Showcase",
    props: {
        item: {
            type: Object
        },
    },
    watch: {
        item() {
            // eslint-disable-next-line no-console
            console.log("change on item");
            this.getHomeworld();
            this.s_counter = 0;
            this.p_counter = 0; 
        }
    },
    data() {
        return {
            starships: [],
            pilots: [],
            s_counter: 0,
            p_counter: 0
        }
    },
    computed: {
        isPerson() {
            return this.item.hasOwnProperty("birth_year");
        },
        ...mapState(['homeworld'])
    },
    methods: {
        async getHomeworldx(){
            try {
                const response = await swapi.getHomeworld(this.item.homeworld);
                this.homeworld = response.data.name;
                // eslint-disable-next-line no-console
                console.log(response.data.name)
            } catch(error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }
        },

        getHomeworld() {
            const payload = {
                homeworld: this.item.homeworld 
            }
            this.$store.dispatch('getHomeworld', payload);
        },

        // getResourceDetailedView() {
        //     if (this.currentResource === "person") {
        //         return PersonDetailView;
        //     }
        // },

        getStarships(ships){
            if(this.s_counter == 0){
                this.starships = []
                ships.forEach(async i => {
                    try {
                        const response = await swapi.getStarships(i);
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
                pilot.forEach(async i => {
                    const response = await swapi.getPilots(i);
                    this.pilots.push(response.data);
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