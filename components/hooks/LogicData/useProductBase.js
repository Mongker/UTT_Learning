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
import { message, message as messageAnt } from 'antd';
import baseAPI from 'redux/api/baseAPI';
import typeAction from 'redux/actions/typeAction';
import { typeStore, url_api } from 'util/TypeUI';

// import PropTypes from 'prop-types';

function useProductBase() {
    // hooks
    const product = useSelector((store) => store[typeStore.PRODUCT]);
    const dispatch = useDispatch();
    let productObj = {};
    product.map((item) => (productObj[item.id] = item));

    // handle func
    const postProduct = async (obj = {}) => {
        const { message, data } = await baseAPI.add(url_api.PRODUCT, obj);
        if (message === 'OK') {
            product.push(data);
            dispatch({ type: typeAction.PRODUCT.POST, payload: { data: [...product] } });
            messageAnt.success('Thêm thành công');
        } else messageAnt.warn(message);
    };

    const getListProduct = async (obj = {}) => {
        const { message, data } = await baseAPI.getAll(url_api.PRODUCT, obj);
        if (message === 'OK') {
            dispatch({ type: typeAction.PRODUCT.GET_LIST, payload: { data: [...data] } });
        } else messageAnt.warn(message);
    };

    const updateProduct = async (obj = {}) => {
        const { message } = await baseAPI.update(url_api.PRODUCT, obj);
        if (message === 'OK') {
            const newData = product.map((item) => {
                if (item.id === obj.id) return { ...item, ...obj };
                return item;
            });
            dispatch({
                type: typeAction.PRODUCT.GET_LIST,
                payload: { data: [...newData] },
            });
            messageAnt.success('Thành công');
        } else messageAnt.warn(message);
    };
    const hideProduct = async (obj = {}) => {
        if (obj.id) {
            obj.status = obj.status === 0 ? 1 : 0;
            await updateProduct(obj);
        }
    };

    return {
        product,
        productObj,
        postProduct,
        getListProduct,
        hideProduct,
        updateProduct,
    };
}

useProductBase.propTypes = {};

useProductBase.defaultProps = {};

export default useProductBase;
