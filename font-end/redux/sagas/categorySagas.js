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
import categoryAPI from 'redux/api/categoryAPI';

function* watcherGetCategory() {
    while (true) {
        yield take(typeAction.CATEGORY.GET_LOGIC);
        const { categories, message } = yield categoryAPI.getAll();
        if (message === 'OK') {
            yield put({
                type: typeAction.CATEGORY.GET,
                payload: { category: categories },
            });
        }
    }
}
function* watcherPostCategory() {
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

function* watcherPutCategory() {
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

function* watcherDeleteCategory() {
    while (true) {
        const dataTake = yield take(typeAction.CATEGORY.DEL_LOGIC);

        const { id } = dataTake.payload;
        const { message } = yield categoryAPI.delete(id);

        if (message === 'OK') {
            const { category } = yield select();
            const newState = category.filter((item) => item.id !== id);
            console.log('newState', newState); // MongLV log fix bug
            console.log('category', category); // MongLV log fix bug
            yield put({
                type: typeAction.CATEGORY.DEL,
                payload: { category: [...newState] },
            });
        }
    }
}
export { watcherGetCategory, watcherPostCategory, watcherDeleteCategory, watcherPutCategory };
