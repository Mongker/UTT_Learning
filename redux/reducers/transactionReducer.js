/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 11/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import typeAction from 'redux/actions/typeAction';

function Transaction(transaction = [], action) {
    switch (action.type) {
        case typeAction.TRANSACTION.GET:
            return action.payload.data;
        case typeAction.TRANSACTION.POST:
            return action.payload.data;
        case typeAction.TRANSACTION.PUT:
            return action.payload.data;
        case typeAction.TRANSACTION.DEL:
            return action.payload.data;
        default:
            return transaction;
    }
}

export default Transaction;
