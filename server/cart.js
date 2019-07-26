let add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(recount(cart), null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(recount(cart), null, 4);
};
let del = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    return JSON.stringify(recount(cart), null, 4);
}

let recount = (cart) => {
    cart.countGoods = 0;
    cart.amount = 0;
    cart.contents.forEach((item, index) => {
        cart.countGoods += item.quantity;
        cart.amount += item.quantity * item.price;
    });
    return cart;
};
module.exports = {
    add,
    change,
    del
};