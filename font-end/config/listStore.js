/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
import hasUserReducer from 'redux/reducers/Users/hasUserReducer';
import userReducer from 'redux/reducers/Users/userReducer';

const LIST_STORE = [hasUserReducer, userReducer];
export default LIST_STORE;
