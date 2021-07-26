/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 05/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import typeAction from 'redux/actions/typeAction';

function Video(video = [], action) {
    switch (action.type) {
        case typeAction.VIDEO.GET_LIST:
            return action.payload.data;
        case typeAction.VIDEO.POST:
            return action.payload.data;
        case typeAction.VIDEO.PUT:
            return action.payload.data;
        case typeAction.VIDEO.DEL:
            return action.payload.data;
        default:
            return video;
    }
}

export default Video;
