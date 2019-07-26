Vue.component('product', {
    props: ['product', 'image'],
    // data(){
    //     return {}
    // },
    template: `<div class="product">
                    <img :src="image" :alt="product.product_name" class="product__img">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}} р.</p>
                    <button class="buy-btn btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>`
});