/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import { fromJS } from 'immutable';
import CONFIG_STORE from 'config/configStore';
import CONFIG_TYPE_ACTION from 'config/configTypeAction';

const userReducer = {};

userReducer.path = CONFIG_STORE.User;
userReducer.value = (User = fromJS({}), action) => {
    switch (action.type) {
        case `${userReducer.path}_${CONFIG_TYPE_ACTION.STORE.MERGE}`:
            return User.merge(fromJS(action.merge));
        default:
            return User;
    }
};
export default userReducer;
