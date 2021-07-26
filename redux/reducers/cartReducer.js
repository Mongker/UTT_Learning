/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 11/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import typeAction from 'redux/actions/typeAction';

function Cart(cart = [], action) {
    switch (action.type) {
        case typeAction.CART.GET_LIST:
            return action.payload.data;
        case typeAction.CART.POST:
            return action.payload.data;
        case typeAction.CART.PUT:
            return action.payload.data;
        case typeAction.CART.DEL:
            return action.payload.data;
        default:
            return cart;
    }
}

export default Cart;
