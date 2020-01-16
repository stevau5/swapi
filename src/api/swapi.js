import axios from 'axios';
const ROOT_URL = "https://swapi.co/api";

export default {
    getHomeworld(home){
        return axios.get(home);
    },
    getStarships(ship){
        return axios.get(ship);
    },
    getPilots(pilot){
        return axios.get(pilot);
    },
    getResource(resource){
        return axios.get(`${ROOT_URL}/${resource}/`)
    },
    searchResource({searchTerm, resource}){
        return axios.get(`${ROOT_URL}/${resource}/?search=${searchTerm}`);
    },
    loadMoreResourceItems({resource, page}){
        return axios.get(`${ROOT_URL}/${resource}/?page=${page}`)
    }
}