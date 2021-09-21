import baseAPI from 'redux/api/baseAPI';
import CONFIG_TYPE_API from '../../../config/configTypeApi';
import { fork } from 'redux-saga/effects';
import workerBaseSagas from 'redux/sagas/Base/workerBaseSagas';

/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

function* workerLogin(email, password, _function) {
    if (typeof email === 'string' && typeof password === 'string' && email.length > 0 && password.length > 0) {
        // const { data, message, auth } = yield baseAPI.add(CONFIG_TYPE_API.LOGIN, email, password);
        const response = yield baseAPI.add(CONFIG_TYPE_API.LOGIN, { email, password });
        yield fork(workerBaseSagas.workerResponse, response);
    }
}
const workerUserSagas = {
    workerLogin: workerLogin,
};
export default workerUserSagas;
