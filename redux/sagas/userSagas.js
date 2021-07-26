/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 01/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import typeAction from 'redux/actions/typeAction';
import { call, take, put, select } from 'redux-saga/effects';
import baseAPI from 'redux/api/baseAPI';
import { url_api } from '../../util/TypeUI';

function* watcherGetListUser() {
    while (true) {
        const dataTake = yield take(typeAction.USER.GET_LIST_LOGIC);
        const { data } = dataTake.payload;
        const { users, message } = yield baseAPI.getAll(url_api.USER, data);
        if (message === 'OK') {
            yield put({ type: typeAction.USER.GET_LIST, payload: { users } });
        }
    }
}
function* watcherPostUser() {
    while (true) {
        const dataTake = yield take(typeAction.CATEGORY.POST_LOGIC);
        debugger; // MongLV
        const { data } = dataTake.payload;
        const { item, message } = yield categoryAPI.add(data);
        if (message === 'OK' && item) {
            const { category } = yield select();
            category.push(item);
            yield put({
                type: typeAction.CATEGORY.POST,
                payload: { category: [...category] },
            });
        }
    }
}

function* watcherPutUser() {
    while (true) {
        const dataTake = yield take(typeAction.CATEGORY.PUT_LOGIC);
        debugger; // MongLV
        const { data } = dataTake.payload;
        const { message } = yield categoryAPI.update(data);
        if (message === 'OK') {
            const { category } = yield select();
            const newCategory = category.map((item) => {
                if (item.id === data.id) {
                    item = data;
                }
                return item;
            });
            yield put({
                type: typeAction.CATEGORY.PUT,
                payload: { category: [...newCategory] },
            });
        }
    }
}

function* watcherDeleteUser() {
    while (true) {
        const dataTake = yield take(typeAction.CATEGORY.DEL_LOGIC);

        const { id } = dataTake.payload;
        const { message } = yield categoryAPI.delete(id);

        if (message === 'OK') {
            const { category } = yield select();
            const newState = category.filter((item) => item.id !== id);
            yield put({
                type: typeAction.CATEGORY.DEL,
                payload: { category: [...newState] },
            });
        }
    }
}
export { watcherGetListUser, watcherPostUser, watcherPutUser, watcherDeleteUser };
