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
        return `<div class="product-item">
                    <img src="${this.image}" alt="" class="product-item__img">
                    <h3>${this.product_name}</h3>
                    <p>${this.price ? this.price : 'Цена не указана'} ${typeof(this.price) == 'number' ? 'р.' : ''}</p>
                    <button class="buy-btn btn">Купить</button>
                </div>`
    }
}

// class Cart {
//     constructor() {
//         this.items //Массив с добавленными в корзину товарами (объекты класса CartItem)
//         this.totalPrice //Общая стоимость корзины
//         this.totalCount //Общее кол-во товаров в корзине
//     }
//     render() {} //Метод для отрисовки корзины. Во времня рендера подсчитывается общее кол-во и стоимость товаров, а так же удаляются из массива элементы, чей count = 0.
//     clear() {} //Метод для полной отчистки корзины
//     addItem() {} //Добавляем новую позицию в корзину
//     deleteItem() {} //Удаляем позицию из корзины
// }

// class CartItem() {
//     constructor(item) { //Конструктор принимает ссылку на экземпляр класса ProductItem
//         this.link = item //Ссылка на экземпляр класса
//         this.count = 1; //Колличество данного товара в корзине
//     }
//     plusCount() {} //Увеличение кол-ва на единицу
//     minusCount() {} //Уменьшение кол-ва на единицу
// }

const products = new Products();
console.log(products.totalPrice());