import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products';
import cart from './modules/cart';

Vue.use(Vuex)

// 注册插件，只要 cart.js 中 mutation 执行了就存储数据
const myPlugin = store => {
    store.subscribe((mutation, state) => {
        if(mutation.type.startsWith('cart/')) {
            window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
        }
    })
}

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        products,
        cart
    },
    plugins: [myPlugin]
})
