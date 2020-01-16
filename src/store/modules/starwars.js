import swapi from "../../api/swapi"

const state = {
    resources: [],
    homeworld: '',
    starships: [],
    pilots: []
}

const getters = {
    allResources(state) {
        return state.resources;
    },
    allHomeworld(state) {
        return state.homeworld; 
    },
    allStarships(state) {
        return state.starships;
    },
    allPilots(state) {
        return state.pilots;
    }
}

const mutations = {
    setResources: (state, payload) => {
        state.resources = payload.resources;
    },
    setHomeworld: (state, payload) => {
        state.homeworld = payload.homeworld;
    },
    setStarships: (state, payload) => {
        state.starships.push(payload.starships);
    },
    setStarshipsToEmpty: (state) => state.starships = [],

    setPilots: (state, payload) => {
        state.pilots.push(payload.pilots)
    },
    setPilotsToEmpty: (state) => state.pilots = []
}

const actions = {
    async fetchResources({commit}, resource) {
        try {
            const response = await swapi.getResource(resource);
            commit({
                type: 'setResources', 
                resources: response.data.results}); 
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    },
    async searchResources({commit}, payload) {
        try {
            const response = await swapi.searchResource(payload.searchTerm, payload.resource); 
            commit({
                type: 'setResources',
                resources: response.data.results
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    },
    async loadItems({commit}, payload) {
        try {
            const response = await swapi.loadMoreResourceItems(payload.resource, payload.page)
            commit({
                type: 'setResources',
                resources: response.data.results 
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    },
    async getHomeworld({commit}, payload) {
        try {
            const response = await swapi.getHomeworld(payload.homeworld);
            commit({
                type: 'setHomeworld',
                homeworld: response.data.name
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    },
    getStarships({commit}, payload) {
        try {
            payload.ships.forEach(async i => {
                const response = await swapi.getStarships(i)
                commit({
                    type: 'setStarships',
                    starships: response.data.name
                });
            })
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        }
    },
    getPilots({commit}, payload) {
        payload.pilots.forEach(async i => {
            try {
                const response = await swapi.getPilots(i)
                commit({
                    type: 'setPilots',
                    pilots: response.data.name
                })
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error)
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

