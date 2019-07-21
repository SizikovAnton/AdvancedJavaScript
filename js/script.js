const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;
const DEFAULT_IMAGE = 'https://placehold.it/200x200';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: `${API}/catalogData.json`, //получить список товаров
        getBasketUrl: `${API}/getBasket.json`, //получить содержимое корзины
        addBasketUrl: `${API}/addToBasket.json`, //добавить товар в корзину
        deleteBasketUrl: `${API}/deleteFromBasket.json`, //удалить товар из корзины
        defaultImage: `https://placehold.it/200x200`,
        products: [],
        filter: [],
        cart: {
            totalPrice: 0,
            totalCount: 0,
            cartItems: [],
        },
        cartStatusStr: ``,
        searchLine: ``,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        cartVisible() {
            document.querySelector(`.cart-div`).classList.toggle(`invisible`);
        },
        plusCartItem(cartItem) {
            this.getJson(this.addBasketUrl)
                .then(data => {
                    if (data.result) {
                        cartItem.quantity++;
                        this.recountCart();
                    }
                });
        },
        minusCartItem(cartItem) {
            this.getJson(this.deleteBasketUrl)
                .then(data => {
                    if (data.result) {
                        cartItem.quantity--;
                        this.recountCart();
                    }
                });
        },
        deleteCartItem(cartItem) {
            this.getJson(this.deleteBasketUrl)
                .then(data => {
                    if (data.result) {
                        this.cart.cartItems.splice(this.cart.cartItems.indexOf(cartItem), 1);
                        this.recountCart();
                    }
                });
        },
        addProduct(product) {
            this.getJson(this.addBasketUrl)
                .then(data => {
                    if (data.result) {
                        temp = this.cart.cartItems.find(item => item.id_product === product.id_product);
                        if (temp) {
                            this.plusCartItem(temp);
                        } else {
                            let newCartItem = Object.assign({ quantity: 1 }, product);
                            this.cart.cartItems.push(newCartItem);
                            this.recountCart();
                        }
                    }
                });
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
                this.cart.cartItems.splice(indexDel, 1);
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
        filterGoods() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filter = this.products.filter(item => regexp.test(item.product_name));
        }
    },
    mounted() {
        //Получаем от сервера список продуктов
        this.getJson(this.catalogUrl)
            .then(items => {
                for (let item of items) {
                    this.products.push(item);
                }
            })
            .then(() => {
                this.filterGoods();
            });
        //Получаем от сервера корзину
        this.getJson(this.getBasketUrl)
            .then(inputCart => {
                this.cart.totalPrice = inputCart.amount;
                this.cart.totalCount = inputCart.countGoods;
                for (let item of inputCart.contents) {
                    this.cart.cartItems.push(item);
                }
            })
            .then(() => {
                this.cartStatus();
            });

    }
});