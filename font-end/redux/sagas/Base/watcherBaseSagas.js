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
import workerBaseSagas from 'redux/sagas/Base/workerBaseSagas';

function* watcherResetToken() {
    while (true) {
        yield take(CONFIG_TYPE_ACTION.SAGA.USER.RESET_TOKEN);
        yield fork(workerBaseSagas.workerResetToken);
    }
}

const watcherBaseSagas = {
    watcherResetToken,
};
export default watcherBaseSagas;
