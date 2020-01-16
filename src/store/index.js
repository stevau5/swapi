import vue from 'vue';
import vuex from 'vuex';
import starwars from './modules/starwars'

vue.use(vuex);

export default new vuex.Store({
    ...starwars
});