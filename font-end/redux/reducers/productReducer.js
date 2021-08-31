/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 04/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import typeAction from 'redux/actions/typeAction';

function Product(product = [], action) {
    switch (action.type) {
        case typeAction.PRODUCT.GET_LIST:
            return action.payload.data;
        case typeAction.PRODUCT.POST:
            return action.payload.data;
        case typeAction.PRODUCT.PUT:
            return action.payload.data;
        case typeAction.PRODUCT.DEL:
            return action.payload.data;
        default:
            return product;
    }
}

export default Product;
