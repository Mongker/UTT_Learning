/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author monglv@bkav.com on 30/09/2021
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';
import CONFIG_TYPE_ACTION from 'config/configTypeAction';

import { take, fork } from 'redux-saga/effects';
import workerCategorySagas from 'redux/sagas/Category/workerCategorySagas';

function* watcherGetList() {
    while (true) {
        yield take(CONFIG_TYPE_ACTION.SAGA.CATEGORY.GET_LIST);
        yield fork(workerCategorySagas.workerGetList);
    }
}
function* watcherDelete() {
    while (true) {
        const dataTake = yield take(CONFIG_TYPE_ACTION.SAGA.CATEGORY.DELETE);
        debugger; // Todo by MongLV
        const { id } = dataTake.payload && dataTake.payload;
        yield fork(workerCategorySagas.workerDelete, id, dataTake._function);
    }
}

function* watcherAdd() {
    while (true) {
        const dataTake = yield take(CONFIG_TYPE_ACTION.SAGA.CATEGORY.ADD);
        const {
            rootId = '0',
            status = '1',
            name = '',
            description = '',
            icon = '',
            sort_order = '1',
        } = dataTake.payload && dataTake.payload;
        const data = {
            rootId,
            status,
            name,
            description,
            icon,
            sort_order,
        };
        yield fork(workerCategorySagas.workerPost, data, dataTake._function);
    }
}

const watcherCategorySagas = {
    watcherGetList,
    watcherDelete,
    watcherAdd,
};
export default watcherCategorySagas;
