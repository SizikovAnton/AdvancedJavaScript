Vue.component('cart', {
    data() {
        return {
            //getBasketUrl: `${API}/getBasket.json`, //получить содержимое корзины
            //addBasketUrl: `${API}/addToBasket.json`, //добавить товар в корзину
            //deleteBasketUrl: `${API}/deleteFromBasket.json`, //удалить товар из корзины
            cart: {
                totalPrice: 0,
                totalCount: 0,
                cartItems: [],
            },
            cartStatusStr: ``,
            showCart: false,
        }
    },
    methods: {
        plusCartItem(cartItem) {
            this.$parent.putJson(`/api/cart/${cartItem.id_product}`, {quantity: 1})
                .then(data => {
                    if (data.result) {
                        cartItem.quantity++;
                        this.recountCart();
                    }
                });
        },
        minusCartItem(cartItem) {
            this.$parent.putJson(`/api/cart/${cartItem.id_product}`, {quantity: -1})
                .then(data => {
                    if (data.result) {
                        cartItem.quantity--;
                        this.recountCart();
                    }
                });
        },
        deleteCartItem(cartItem) {
            this.$parent.delJson(`/api/cart/${cartItem.id_product}`)
                .then(data => {
                    if (data.result) {
                        this.cart.cartItems.splice(this.cart.cartItems.indexOf(cartItem), 1);
                        this.recountCart();
                    }
                });
        },
        addProduct(product) {
            let temp = this.cart.cartItems.find(item => item.id_product === product.id_product);
            if (temp) {
                this.plusCartItem(temp);
            } else {
                let newCartItem = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`/api/cart`, newCartItem)
                .then(data => {
                    if(data.result){
                        this.cart.cartItems.push(newCartItem);
                        this.recountCart();
                    }
                })
            }
        },
        recountCart() {
            this.cart.totalCount = 0;
            this.cart.totalPrice = 0;
            let indexDel = -1;
            this.cart.cartItems.forEach((item, index) => {
                if (item.quantity > 0) {
                    this.cart.totalCount += item.quantity;
                    this.cart.totalPrice += item.quantity * item.price;
                } else {
                    //this.cart.cartItems.splice(index, 1);
                    indexDel = index;
                }
            });
            if (indexDel !== -1) {
                this.deleteCartItem(this.cart.cartItems[indexDel]);
            }
            this.cartStatus();
        },
        cartStatus() {
            if (this.cart.totalCount) {
                this.cartStatusStr = `В корзине ${this.cart.totalCount} товаров на сумму ${this.cart.totalPrice} рублей`;
            } else {
                this.cartStatusStr = `Корзина пуста`;
            }
        },
    },
    template: `<div class="cart-top">
                    <div class="cart-info">{{cart.totalPrice}} р.</div>
                    <div class="btn-cart btn" @click="showCart = !showCart">Корзина</div>
                    <div class="cart-div" v-show="showCart">
                        <table class="cart">
                            <tr class="cart__row">
                                <td class="cart__cell">Название</td>
                                <td class="cart__cell">Цена за ед.</td>
                                <td class="cart__cell">Количество</td>
                                <td class="cart__cell">Общая стоимость</td>
                                <td class="cart__cell"></td>
                            </tr>
                            <cart-item 
                                v-for="cartItem in cart.cartItems"
                                :key="cartItem.id_product"
                                :cart-item="cartItem"
                                @plusCartItem="plusCartItem"
                                @minusCartItem="minusCartItem"
                                @deleteCartItem="deleteCartItem">
                            </cart-item>
                        </table>
                        <div class="cart__status">{{cartStatusStr}}</div>
                    </div>
                </div>`,
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(inputCart => {
                this.cart.totalPrice = inputCart.amount;
                this.cart.totalCount = inputCart.countGoods;
                for (let item of inputCart.contents) {
                    this.cart.cartItems.push(item);
                }
            })
            .then(() => {
                this.cartStatus();
            })
            .catch(error => console.log(error));
    },
});