/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 05/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 04/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message as messageAnt } from 'antd';
import baseAPI from 'redux/api/baseAPI';
import typeAction from 'redux/actions/typeAction';
import ContextApp from 'util/ContextApp';
import { typeStore, url_api } from 'util/TypeUI';

// import PropTypes from 'prop-types';

function useStudyProgramBase() {
    // hooks
    const studyProgram = useSelector((store) => store[typeStore.STUDY_PROGRAM]);
    const dispatch = useDispatch();
    let studyProgramObj = {};
    studyProgram.length > 0 &&
        studyProgram.map((item) => (studyProgramObj[item.id] = item));

    // handle func
    // handle func
    const postStudyProgram = async (obj = {}) => {
        const { message, data } = await baseAPI.add(url_api.STUDY_PROGRAM, obj);
        if (message === 'OK') {
            studyProgram.push(data);
            dispatch({
                type: typeAction.STUDY_PROGRAM.POST,
                payload: { data: [...studyProgram] },
            });
            debugger; // MongLV
            messageAnt.success('Thêm thành công');
        } else messageAnt.warn(message);
    };
    const getListStudyProgram = async (obj) => {
        const { message, data } = await baseAPI.getAll(url_api.STUDY_PROGRAM, obj);
        if (message === 'OK') {
            let objData = {};
            data.map((item) => (objData[item.id] = item));
            const newObj = { ...studyProgramObj, ...objData };
            dispatch({
                type: typeAction.STUDY_PROGRAM.GET_LIST,
                payload: { data: [...Object.values(newObj)] },
            });
        } else messageAnt.warn(message);
    };
    const putStudyProgram = async (data = {}) => {
        const { message } = await baseAPI.update(url_api.STUDY_PROGRAM, data);
        const id = data.id;
        if (message === 'OK') {
            const newData = studyProgram.map((item) => {
                if (item.id === id) return { ...item, ...data };
                return item;
            });
            dispatch({
                type: typeAction.STUDY_PROGRAM.GET_LIST,
                payload: { data: [...newData] },
            });
        } else messageAnt.warn(message);
    };
    return {
        studyProgram,
        studyProgramObj,
        postStudyProgram,
        getListStudyProgram,
        putStudyProgram,
    };
}

useStudyProgramBase.propTypes = {};

useStudyProgramBase.defaultProps = {};

export default useStudyProgramBase;
