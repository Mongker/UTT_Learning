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

function Category(category = [], action) {
    switch (action.type) {
        case typeAction.CATEGORY.GET:
            return action.payload.category;
        case typeAction.CATEGORY.POST:
            message.success('Thêm thành công');
            return action.payload.category;
        case typeAction.CATEGORY.PUT:
            message.success('Sửa thành công');
            return action.payload.category;
        case typeAction.CATEGORY.DEL:
            message.success('Xóa thành công');
            return action.payload.category;
        default:
            return category;
    }
}

export default Category;
