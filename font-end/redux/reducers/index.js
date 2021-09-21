/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker 04/01/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import { combineReducers } from 'redux';
import LIST_STORE from 'config/listStore';

const store = {};
LIST_STORE.map((item) => (store[item.path] = item.value));
const rootReducer = combineReducers(store);
export { rootReducer };
