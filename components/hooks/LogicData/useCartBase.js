/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 11/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeStore, url_api } from '../../../util/TypeUI';
import baseAPI from 'redux/api/baseAPI';
import typeAction from 'redux/actions/typeAction';
import { message as messageAnt } from 'antd';
import MergeArr from '../../../util/MergeArr';
// import PropTypes from 'prop-types';

function useCartBase() {
    const cart = useSelector((store) => store[typeStore.CART]);
    const dispatch = useDispatch();
    let cartObj = {};
    cart.map((item) => (cartObj[item.id] = item));
    // handle func
    const postCart = async (obj = {}, callback) => {
        const { message, data } = await baseAPI.add(url_api.CART, obj);
        if (message === 'OK') {
            cart.push(data);
            dispatch({ type: typeAction.CART.POST, payload: { data: [...cart] } });
            callback ? callback(data) : messageAnt.success('Thêm thành công');
        } else messageAnt.warn(message);
    };

    const getListCart = async (obj) => {
        const { message, data } = await baseAPI.getAll(url_api.CART, obj);
        if (message === 'OK') {
            const newData = MergeArr(cart, data);
            dispatch({
                type: typeAction.CART.GET_LIST,
                payload: { data: [...newData] },
            });
        } else messageAnt.warn(message);
    };

    const deleteCart = async (id) => {
        const { message } = await baseAPI.delete(url_api.CART, id);
        if (message === 'OK') {
            const newData = cart.filter((item) => item.id !== id);
            dispatch({ type: typeAction.CART.DEL, payload: { data: [...newData] } });
        } else messageAnt.warn(message);
    };

    return {
        cart,
        cartObj,
        postCart,
        getListCart,
        deleteCart,
    };
}

useCartBase.propTypes = {};

useCartBase.defaultProps = {};

export default useCartBase;
