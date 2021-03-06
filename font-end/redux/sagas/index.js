/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mong_Le_Van on 09/09/2020
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import { all } from 'redux-saga/effects';
// watch saga
import Users from 'redux/sagas/Users';
import Base from 'redux/sagas/Base';
import Category from 'redux/sagas/Category';

// saga
export default function* index() {
    yield all([Users(), Base(), Category()]);
}
