const DEFAULT_IMAGE = 'https://placehold.it/200x200';
const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;
//-----Без использования промисов-----
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

//-----С использованием промисов-----
// let getRequest = (url) => {
//     console.log(`start`);
//     return new Promise((resolve, reject) => {
//         console.log(`promise`);
//         let xhr = new XMLHttpRequest();
//         console.log(`new`);
//         xhr.open('GET', url, true);
//         console.log(`open`);
//         xhr.onreadystatechange = () => {
//             console.log(`ready`);
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     reject(xhr.status);
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     });
// };
// getRequest(`${API}/catalogData.json`).then((result) => {
//     console.log(result);
// }, (error) => {
//     console.log(`Ошибка ${error}`);
// });

class Products {
    constructor(container = `.products`) {
        this.container = container;
        this.data = [];
        this.allProduct = [];
        this._getProducts()
            .then(() => this._render());
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log(error));
    }
    _render() {
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            const product = new ProductItem(item);
            this.allProduct.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
    totalPrice() {
        let totalPrice = 0;
        for (let item of this.data) {
            if (typeof(item.price) == 'number') {
                totalPrice += item.price;
            }
        }
        return totalPrice;
    }
}

class ProductItem {
    constructor(item) {
        this.id_product = item.id_product;
        this.product_name = item.product_name;
        this.price = item.price;
        if (item.image) {
            this.image = 'img/' + item.image;
        } else {
            this.image = DEFAULT_IMAGE;
        }

    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.image}" alt="" class="product-item__img">
                    <h3>${this.product_name}</h3>
                    <p>${this.price ? this.price : 'Цена не указана'} ${typeof(this.price) == 'number' ? 'р.' : ''}</p>
                    <button class="buy-btn btn">Купить</button>
                </div>`
    }
}



class Cart {
    constructor() {
        this.items = []; //Массив с добавленными в корзину товарами (объекты класса CartItem)
        this.totalPrice = 0; //Общая стоимость корзины
        this.totalCount = 0; //Общее кол-во товаров в корзине
        this._setCart()
            .then(() => this._render());
    }
    _setCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(inCart => {
                this.totalPrice = inCart.amount;
                this.totalCount = inCart.countGoods;
                for (let item of inCart.contents) {
                    this.items.push(new CartItem(item.id_product, item.product_name, item.price, item.quantity));
                }
            })
            .catch(error => console.log(error))
    }
    _render() {
        const block = document.querySelector(`.cart-content`);
        let totalPrice = 0;
        let totalCount = 0;
        block.innerHTML = '';
        for (let item of this.items) {
            block.insertAdjacentHTML('beforeend', item.render());
            totalCount += item.quantity;
            totalPrice += item.price * item.quantity;
        }
        this.totalPrice = totalPrice;
        this.totalCount = totalCount;
        document.querySelector('#cartTotalCount').textContent = this.totalCount;
        document.querySelector('#cartTotalPrice').textContent = this.totalPrice;

    }
    clear() {} //Метод для полной отчистки корзины
    addItem() {} //Добавляем новую позицию в корзину
    deleteItem() {} //Удаляем позицию из корзины
    getItemById(id) {
        let index = null;
        this.items.forEach((item, i) => {
            if (item.id_product == id) {
                index = i;
            }
        });
        return index;
    }
}

class CartItem {
    constructor(id_product, product_name, price, quantity) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity ? quantity : 1;
    }
    plusCount() {
        this.quantity++;
    }
    minusCount() {
        this.quantity--;
    }
    render() {
        return `<div class="cart-row cart-element" data-id="${this.id_product}">
            <div>${this.product_name}</div>
            <div>${this.price}</div>
            <div class="cart-quantity"><div class="btn btn-plus" onclick="btnPlus(${this.id_product})">+</div>${this.quantity}<div class="btn btn-minus" onclick="btnMinus(${this.id_product})">-</div></div>
            <div>${this.price*this.quantity}</div>
            <div class="btn btn-delete">Удалить</div>`;
    }
}

// function cartElementClick(event) {
//     event
//     cart.items[cart.getItemById()]
// }

function btnPlus(id) {
    cart.items[cart.getItemById(id)].plusCount();
    cart._render();
}

function btnMinus(id) {
    cart.items[cart.getItemById(id)].minusCount();
    cart._render();
}

// function eventsAdd() {
//     document.querySelectorAll('.cart-element').addEventListener('click', cartElementClick(event));
// }
const products = new Products();
const cart = new Cart();
//eventsAdd();