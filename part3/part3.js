class Element {
    constructor(name, cal, price, title) {
        this.name = name;
        this.cal = cal;
        this.price = price;
        this.title = title;
    }
}

const size = [
    new Element(`small`, 20, 50, `Маленький`),
    new Element(`big`, 40, 100, `Большой`)
];

const stuffing = [
    new Element(`cheese`, 20, 10, `Сыр`),
    new Element(`salad`, 5, 20, `Салат`),
    new Element(`potato`, 10, 15, `Картофель`)
];

const topping = [
    new Element(`spice`, 0, 15, `Специи`),
    new Element(`mayo`, 5, 20, `Майонез`)
];

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
    }
    setTopping() {
        sortCheckbox(topping, this.topping, '.topping');
    }
    getToppings() {
        return this.topping;
    }
    getSize() {
        return this.size;
    }
    getStuffing() {
        return this.stuffing;
    }
    calculatePrice() {
        let totalPrice = 0;
        for (let top of this.topping) {
            totalPrice += top.price;
        }
        totalPrice += this.size.price + this.stuffing.price;
        return totalPrice;
    }
    calculateCalories() {
        let totalCal = 0;
        for (let top of this.topping) {
            totalCal += top.cal;
        }
        totalCal += this.size.cal + this.stuffing.cal;
        return totalCal;
    }
}

function sortRadio(elements, selector) {
    const fields = document.querySelectorAll(selector);
    for (let field of fields) {
        if (field.checked) {
            for (let elem of elements) {
                if (elem.name == field.value) {
                    return elem;
                }
            }
        }
    }
}

function sortCheckbox(elements, outputArray, selector) {
    const fields = document.querySelectorAll(selector);
    for (let field of fields) {
        if (field.checked) {
            for (let elem of elements) {
                if (elem.name == field.value) {
                    outputArray.push(elem);
                }
            }
        }
    }
}

function submit(event) {
    let hamburger = new Hamburger(sortRadio(size, '.size'), sortRadio(stuffing, '.stuffing'));
    hamburger.setTopping();
    document.getElementById('res-size').textContent = hamburger.getSize().title;
    document.getElementById('res-stuffing').textContent = hamburger.getStuffing().title;

    let toppingString = [];
    for (let top of hamburger.getToppings()) {
        toppingString.push(top.title);
    }
    document.getElementById('res-topping').textContent = toppingString;
    document.getElementById('res-cal').textContent = hamburger.calculateCalories();
    document.getElementById('res-price').textContent = hamburger.calculatePrice();

    event.preventDefault();
}

document.getElementById('submit').addEventListener('click', submit);