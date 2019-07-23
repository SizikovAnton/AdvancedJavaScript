Vue.component('cart-item', {
    props: ['cartItem'],
    template: `<tr class="cart__row">
                    <td class="cart__cell">{{cartItem.product_name}}</td>
                    <td class="cart__cell">{{cartItem.price}}</td>
                    <td class="cart__quantity cart__cell">
                        <i class="fas fa-plus cursor-pointer" @click="$emit('plusCartItem', cartItem)"></i>
                        <div class="cart-quantity">{{cartItem.quantity}}</div>
                        <i class="fas fa-minus cursor-pointer" @click="$emit('minusCartItem', cartItem)"></i>
                    </td>
                    <td class="cart__cell">{{cartItem.price*cartItem.quantity}}</td>
                    <td class="cart__cell"><i class="far fa-trash-alt cursor-pointer" @click="$emit('deleteCartItem', cartItem)"></i></td>
                </tr>`
});