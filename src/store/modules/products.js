import axios from 'axios';

export default {
    namespaced: true,
    state: {
        products: []
    },
    getters: {},
    mutations: {
        setProducts(state, data) {
            state.products = data
        }
    },
    actions: {
        async getProducts({ commit }) {
            const { data } = await axios.get('http://127.0.0.1:3000/products')
            commit('setProducts', data)
        }
    }
}
