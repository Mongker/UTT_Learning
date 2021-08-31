/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 05/05/2021
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
import MergeArr from '../../../util/MergeArr';

// import PropTypes from 'prop-types';

function useVideoBase() {
    // hooks
    const video = useSelector((store) => store[typeStore.VIDEO]);
    const dispatch = useDispatch();

    // handle func
    const postStudyVideo = async (obj = {}) => {
        const { message, data } = await baseAPI.add(url_api.VIDEO, obj);
        if (message === 'OK') {
            video.push(data);
            dispatch({ type: typeAction.VIDEO.POST, payload: { data: [...video] } });
            messageAnt.success('Thêm thành công');
        } else messageAnt.warn(message);
    };
    const getListStudyVideo = async (obj) => {
        const { message, data } = await baseAPI.getAll(url_api.VIDEO, obj);
        if (message === 'OK') {
            const newData = MergeArr(video, data);
            dispatch({
                type: typeAction.VIDEO.GET_LIST,
                payload: { data: [...newData] },
            });
        } else messageAnt.warn(message);
    };
    const putStudyVideo = async (data = {}) => {
        const { message } = await baseAPI.update(url_api.VIDEO, data);
        const id = data.id;
        if (message === 'OK') {
            const newData = video.map((item) => {
                if (item.id === id) return { ...item, ...data };
                return item;
            });
            dispatch({
                type: typeAction.VIDEO.GET_LIST,
                payload: { data: [...newData] },
            });
        } else messageAnt.warn(message);
    };

    const deleteVideo = async (id) => {
        const { message } = await baseAPI.delete(url_api.VIDEO, id);
        if (message === 'OK') {
            const newData = video.filter((item) => item.id !== id);
            dispatch({ type: typeAction.VIDEO.DEL, payload: { data: [...newData] } });
        } else messageAnt.warn(message);
    };
    return {
        video,
        postStudyVideo,
        getListStudyVideo,
        putStudyVideo,
        deleteVideo,
    };
}

useVideoBase.propTypes = {};

useVideoBase.defaultProps = {};

export default useVideoBase;
