/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 02/05/2021
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
import { message } from 'antd';

function Users(users = [], action) {
    switch (action.type) {
        case typeAction.USER.GET_LIST:
            return action.payload.users;
        case typeAction.USER.POST:
            message.success('Thêm thành công');
            return action.payload.users;
        case typeAction.USER.PUT:
            message.success('Sửa thành công');
            return action.payload.users;
        case typeAction.USER.DEL:
            message.success('Xóa thành công');
            return action.payload.users;
        default:
            return users;
    }
}
export default Users;
