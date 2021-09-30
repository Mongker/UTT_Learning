/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const CONFIG_TYPE_ACTION = {
    STORE: {
        MERGE: 'MERGE',
        CATEGORY: {
            DELETE: 'DELETE_STORE_CATEGORY',
            // ADD: 'ADD_CATEGORY',
        },
    },
    SAGA: {
        USER: {
            LOGIN: 'LOGIN',
            SIG_UP: 'SIG_UP',
            RESET_TOKEN: 'RESET_TOKEN',
            CHECK_POINT: 'CHECK_POINT',
        },
        CATEGORY: {
            GET_LIST: 'GET_LIST_CATEGORY',
            DELETE: 'DELETE_CATEGORY',
            ADD: 'ADD_CATEGORY',
        },
    },
};
export default CONFIG_TYPE_ACTION;
