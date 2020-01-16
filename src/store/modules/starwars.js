import swapi from "../../api/swapi"

const state = {
    resources: [],
    homeworld: ''
}

const getters = {
    allResources(state) {
        return state.resources;
    },
    allHomeworld(state) {
        return state.homeworld; 
    }
}

const mutations = {
    setResources: (state, payload) => {
        state.resources = payload.resources;
    },
    setHomeworld: (state, payload) => {
        state.homeworld = payload.homeworld;
    }
}

const actions = {
    async fetchResources({commit}, resource) {
        const response = await swapi.getResource(resource);
        // set resources to resource by committing mutation.
        commit({
            type: 'setResources', 
            resources: response.data.results}); 
    },
    async searchResources({commit}, payload) {
        const response = await swapi.searchResource(payload.searchTerm, payload.resource); 
        // once i have my response i need to set it to my resources. 
        commit({
            type: 'setResources',
            resources: response.data.results
        });
    },
    async loadItems({commit}, payload) {
        const response = await swapi.loadMoreResourceItems(payload.resource, payload.page)
        commit({
            type: 'setResources',
            resources: response.data.results 
        });
    },
    async getHomeworld({commit}, payload) {
        const response = await swapi.getHomeworld(payload.homeworld);
        commit({
            type: 'setHomeworld',
            homeworld: response.data.name
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

