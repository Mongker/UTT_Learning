/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
import { all, fork, put } from 'redux-saga/effects';
import CONFIG_STORE from '../../../config/configStore';
import CONFIG_TYPE_ACTION from '../../../config/configTypeAction';

/**
 * workerResponse: nơi sử lý dữ liệu từ API trả về và điều hướng để merge vào Store của Redux
 * @param response
 * @param _function
 * @returns {Generator<*|SimpleEffect<"FORK", ForkEffectDescriptor<(function(*=, *=): Generator<*, void, *>)|* extends ((...args: any[]) => SagaIterator<infer RT>) ? RT : ((function(*=, *=): Generator<*, void, *>)|* extends ((...args: any[]) => Promise<infer RT>) ? RT : ((function(*=, *=): Generator<*, void, *>)|* extends ((...args: any[]) => infer RT) ? RT : never))>>, void, *>}
 */
function* workerResponse(response, _function) {
    const { message, auth, data } = response;
    if (message === 200) {
        const { meId, accessToken, refreshToken } = auth;
        if (typeof data === 'object') {
            yield all(
                Object.entries(data).map(function* (list = ['', {}]) {
                    const nextMerge = yield Object.values(CONFIG_STORE).includes(list[0]);
                    if (!nextMerge) {
                        throw new Error(`CONFIG_STORE thiếu trường ${list[0]} mà dữ liệu API trả về`);
                    }
                    yield nextMerge && fork(workerMergeResponse, list);
                }),
            );
        }
        yield accessToken && refreshToken && fork(workerCacheAuth, meId, accessToken, refreshToken);
        yield _function.funcSuccess();
    } else {
		yield _function.funcError();
	}
    
}

/**
 * workerMergeResponse: Thực hiện nhiệm vụ put dữ liệu lên reducer để merger lại
 * @param data {[{string}, {object}]}
 * @returns {Generator<*, void, *>}
 */
function* workerMergeResponse(data) {
    yield put({ type: `${data[0]}_${CONFIG_TYPE_ACTION.STORE.MERGE}`, merge: data[1] });
}

/**
 * workerCacheAuth: Lưu dữ liệu vào window.localStorage để thực hiện tác vụ đăng nhập
 * @param meId
 * @param accessToken
 * @param refreshToken
 * @returns {Generator<*, void, *>}
 */
function* workerCacheAuth(meId, accessToken, refreshToken) {
    window.localStorage.setItem('meId', meId);
    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('refreshToken', refreshToken);
}

const workerBaseSagas = {
    workerResponse,
};
export default workerBaseSagas;
