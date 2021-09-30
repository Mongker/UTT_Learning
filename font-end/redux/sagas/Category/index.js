/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
import { all } from 'redux-saga/effects';

// watch saga
import watcherCategorySagas from 'redux/sagas/Category/watcherCategorySagas';

// saga
export default function* Category() {
    yield all([
        watcherCategorySagas.watcherGetList(),
        watcherCategorySagas.watcherDelete(),
        watcherCategorySagas.watcherAdd(),
    ]);
}
