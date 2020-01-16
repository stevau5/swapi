<template>
    <div class="showcase">
        <h3>Results</h3>
        <div class="slots">
            <Pilot :item="item" v-if="isPerson"></Pilot>
            <Starship :item="item" v-else></Starship>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Pilot from './Pilot';
import Starship from './Starship';

export default {
    name: "Showcase",
    components: {
        Pilot,
        Starship
    },
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
            if(this.isPerson){
                this.getStarships(this.item.starships)
            } else {
                this.getPilots(this.item.pilots)
            }
        }
    },
    data() {
        return {
            s_counter: 0,
            p_counter: 0
        }
    },
    computed: {
        isPerson() {
            return this.item.hasOwnProperty("birth_year");
        },
        ...mapState(['homeworld', 'starships', 'pilots'])
    },
    methods: {
        getHomeworld() {
            const payload = {
                homeworld: this.item.homeworld 
            }
            this.$store.dispatch('getHomeworld', payload);
        },
        getStarships(ships){
            if(this.s_counter === 0) {
                this.$store.commit('setStarshipsToEmpty')
                const payload = {
                    ships
                }
                this.$store.dispatch('getStarships', payload)
                this.s_counter = 1
            }
        },

        getPilots(pilots) {
            if(this.p_counter == 0) {
                this.$store.commit('setPilotsToEmpty')
                const payload = {
                    pilots
                }
                this.$store.dispatch('getPilots', payload)
                this.p_counter = 1
            }
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
.slots {
    width: 100%;
    padding: 10px;
}
h3{
    text-align: center;
}
</style>