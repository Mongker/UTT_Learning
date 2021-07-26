/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import typeAction from 'redux/actions/typeAction';
import createActionNoAppID from 'redux/actions/baseAction';

const getList = () => createActionNoAppID(typeAction.CATEGORY.GET_LOGIC);
const post = (data) => createActionNoAppID(typeAction.CATEGORY.POST_LOGIC, { data });
const put = (data) => createActionNoAppID(typeAction.CATEGORY.PUT_LOGIC, { data });
const remove = (id) => createActionNoAppID(typeAction.CATEGORY.DEL_LOGIC, { id });

export { getList, post, remove, put };
