/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
import { all } from 'redux-saga/effects';
import watcherUserSagas from 'redux/sagas/Users/watcherUserSagas';
// watch saga

// saga
export default function* Users() {
    yield all([watcherUserSagas.watcherLogin()]);
}
