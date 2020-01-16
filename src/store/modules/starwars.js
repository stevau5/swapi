import swapi from "../../api/swapi"

const state = {
    resources: []
}

const getters = {
    allResources(state) {
        return state.resources;
    }
}

const mutations = {
    setResources: (state, payload) => {
        state.resources = payload.resources;
    }
}

const actions = {
    async fetchResources({commit}, resource) {
        const response = await swapi.getResource(resource);
        // eslint-disable-next-line no-console
        console.log("hey")
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
    async loadItems({commit}, payload){
            const response = await swapi.loadMoreResourceItems(payload.resource, payload.page)
            commit({
                type: 'setResources',
                resources: response.data.results 
            });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

