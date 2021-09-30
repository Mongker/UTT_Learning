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
import baseAPI from 'redux/api/baseAPI';
import CONFIG_TYPE_API from '../../../config/configTypeApi';
import { fork, put } from 'redux-saga/effects';
import workerBaseSagas from 'redux/sagas/Base/workerBaseSagas';
import CONFIG_TYPE_ACTION from '../../../config/configTypeAction';

function* workerGetList(params) {
    const response = yield baseAPI.getAll(CONFIG_TYPE_API.CATEGORY, params);
    yield fork(workerBaseSagas.workerResponse, response);
}
function* workerDelete(id, _function) {
    const { message } = yield baseAPI.delete(CONFIG_TYPE_API.CATEGORY, id);
    if (message === 200) {
        yield put({ type: CONFIG_TYPE_ACTION.STORE.CATEGORY.DELETE, payload: { id } });
        _function && _function.funcSuccess && _function.funcSuccess();
    } else {
        _function && _function.funcError && _function.funcError();
    }
}

function* workerPost(data, _function) {
    const response = yield baseAPI.add(CONFIG_TYPE_API.CATEGORY, data);
    yield fork(workerBaseSagas.workerResponse, response, _function);
}
const workerCategorySagas = {
    workerGetList,
    workerDelete,
    workerPost,
};
export default workerCategorySagas;
