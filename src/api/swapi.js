import axios from 'axios';
const ROOT_URL = "https://swapi.co/api";

export default {
    fetchPeople(){
        return axios.get(`${ROOT_URL}/people/`);
    },
    fetchShip(){
        return axios.get(`${ROOT_URL}/starships/`);
    },
    searchShip(searchTerm){
        return axios.get(`${ROOT_URL}/starships/?search=${searchTerm}`);
    },
    searchPeople(searchTerm){
        return axios.get(`${ROOT_URL}/people/?search=${searchTerm}`);
    },
    loadMorePeopleItems(currentPage){
        return axios.get(`${ROOT_URL}/people/?page=${currentPage}`);
    },
    loadMoreStarshipItems(currentPage){
        return axios.get(`${ROOT_URL}/starships/?page=${currentPage}`);
    },
    getHomeworld(home){
        return axios.get(home);
    },
    getStarships(ship){
        return axios.get(ship);
    },
    getPilots(pilot){
        return axios.get(pilot);
    }
}