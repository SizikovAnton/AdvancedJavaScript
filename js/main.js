const DEFAULT_IMAGE = 'https://placehold.it/200x200';

class Products {
    constructor(container = `.products`) {
        this.container = container;
        this.data = [];
        this.allProduct = [];
        this.init();
    }
    init() {
        this._fetchProducts();
        this._render();
    }
    _fetchProducts() {
        this.data = [
            { id: 1, title: 'Notebook', price: 2000, image: '' },
            { id: 2, title: 'Keyboard', price: 200, image: '' },
            { id: 3, title: 'Mouse', price: 47, image: '' },
            { id: 4, title: 'Gamepad', price: 87, image: 'gamepad.jpg' },
            { id: 5, title: 'Chair', price: 187, image: '' },
            { id: 6, title: 'Chair 2', image: '' },
            { id: 7, title: 'Chair 3', price: 187 },
            { id: 8, title: 'Chair 4', price: null },
        ];
    }
    _render() {
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            const product = new ProductItem(item);
            this.allProduct.push(product);
            block.insertAdjacentHTML('beforeend', product.render())
        }
    }
}

class ProductItem {
    constructor(item) {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        if (item.image) {
            this.image = 'img/' + item.image;
        } else {
            this.image = DEFAULT_IMAGE;
        }

    }
    render() {
        //console.log(this);
        return `<div class="product-item">
                    <img src="${this.image}" alt="" class="product-item__img">
                    <h3>${this.title}</h3>
                    <p>${this.price ? this.price : 'Цена не указана'} ${typeof(this.price) == 'number' ? 'р.' : ''}</p>
                    <button class="buy-btn btn">Купить</button>
                </div>`
    }
}

const products = new Products();