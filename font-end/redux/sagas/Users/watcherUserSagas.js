/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
import CONFIG_TYPE_ACTION from 'config/configTypeAction';

import { take, fork } from 'redux-saga/effects';
import workerUserSagas from 'redux/sagas/Users/workerUserSagas';

function* watcherLogin() {
    while (true) {
        const dataTake = yield take(CONFIG_TYPE_ACTION.SAGA.USER.LOGIN);
        const { email, password, providerId } = dataTake.payload;
        switch (providerId) {
            case 'google.com':
                yield fork(workerUserSagas.workerLoginGoogle, dataTake.payload, dataTake._function);
                break;
            default:
                yield email && password && fork(workerUserSagas.workerLogin, email, password, dataTake._function);
                break;
        }
    }
}

const watcherUserSagas = {
    watcherLogin,
};
export default watcherUserSagas;
