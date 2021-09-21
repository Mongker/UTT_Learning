/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
import React from 'react';
import { useDispatch } from 'react-redux';

// util
import funcDefault from 'util/default/funcDefault';

function useDispatchUtil() {
    const dispatch = useDispatch();
    return (type = '', payload = {}, funcSuccess = funcDefault, funcError = funcDefault) => {
        if (typeof type !== 'string' || (typeof payload !== 'object' && !Array(payload))) {
            throw new Error('type phải là 1 string và payload phải là object');
        }
        dispatch({ type: type, payload: payload, _function: { funcSuccess, funcError } });
    };
}

export default useDispatchUtil;
