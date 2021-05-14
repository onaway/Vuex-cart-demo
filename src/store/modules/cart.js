const cartProducts = window.localStorage.getItem('cart-products')

export default {
    namespaced: true,
    state: {
        cartProducts: JSON.parse(cartProducts) || []
    },
    getters: {
        totalCount(state) {
            return state.cartProducts.reduce((sum, goods) => sum + goods.count, 0)
        },
        totalPrice(state) {
            return state.cartProducts.reduce((sum, goods) => sum + goods.totalPrice, 0)
        },
        checkedTotalCount(state) {
            return state.cartProducts.reduce((sum, goods) => {
                if(goods.isChecked) sum += goods.count
                return sum
            }, 0)
        },
        checkedTotalPrice(state) {
            return state.cartProducts.reduce((sum, goods) => {
                if(goods.isChecked) sum += goods.totalPrice
                return sum
            }, 0).toFixed(2)
        },
    },
    mutations: {
        addToCart(state, product) {
            // 1. cartProducts 中没有该商品，将该商品添加到数组中，并添加属性 isChecked, count, totalPrice
            // 2. cartProducts 有该商品，count++，选中，计算价格
            const goods = state.cartProducts.find(item => item.id === product.id)
            if(goods) {
                goods.count++
                goods.isChecked = true;
                goods.totalPrice = goods.count * goods.price
            } else {
                state.cartProducts.push({
                    ...product,
                    isChecked: true,
                    count: 1,
                    totalPrice: product.price
                })
            }
        },
        deleteCartProduct(state, goodsId) {
            const goods = state.cartProducts.findIndex(item => item.id === goodsId)
            state.cartProducts.splice(goods, 1)
        },
        checkedAll(state, checked) {
            state.cartProducts.forEach(item => {
                item.isChecked = checked
            })
        },
        checkedSingle(state, { goodsId, checked }) {
            const goods = state.cartProducts.find(item => item.id === goodsId)
            goods && (goods.isChecked = checked)
        },
        updateProduct(state, { goodsId, count }) {
            const goods = state.cartProducts.find(item => item.id === goodsId)
            if(goods) {
                goods.count = count
                goods.totalPrice = goods.count * goods.price
            }
        }
    },
    actions: {}
}
