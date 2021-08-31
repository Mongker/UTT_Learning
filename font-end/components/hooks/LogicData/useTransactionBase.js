/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 11/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

import { useDispatch, useSelector } from 'react-redux';
import { typeStore, url_api } from '../../../util/TypeUI';
import baseAPI from 'redux/api/baseAPI';
import typeAction from 'redux/actions/typeAction';
import { message as messageAnt } from 'antd';
import MergeArr from '../../../util/MergeArr';
import stringToArr from '../../../util/stringToArr';

function useTransactionBase() {
    const transaction = useSelector((state) => state[typeStore.TRANSACTION]);
    const dispatch = useDispatch();

    let categoryObj = {};
    transaction.map((item) => (categoryObj[item.id] = item));

    // func handle

    const getListTransaction = async (obj = {}) => {
        const { message, data } = await baseAPI.getAll(url_api.TRANSACTION, obj);
        if (message === 'OK') {
            const dataNew = stringToArr(MergeArr(transaction, data), 'list_cart');
            dispatch({
                type: typeAction.TRANSACTION.GET,
                payload: { data: [...dataNew] },
            });
        } else messageAnt.warn(message);
    };

    // handle func
    const postTransaction = async (obj = {}, callBack = () => {}) => {
        const { message, data } = await baseAPI.add(url_api.TRANSACTION, obj);
        if (message === 'OK') {
            console.log('data', data); // MongLV log fix bug
            transaction.push(data);
            const dataNew = stringToArr(transaction, 'list_cart');
            console.log('dataNew', dataNew); // MongLV log fix bug
            dispatch({
                type: typeAction.TRANSACTION.POST,
                payload: { data: [...dataNew] },
            });
            messageAnt.success('Thêm thành công');
            callBack();
        } else messageAnt.warn(message);
    };

    const putTransaction = async (obj = {}, callBack = () => {}) => {
        delete obj.created;

        const dataConvert = { ...obj };
        dataConvert.list_cart = JSON.stringify(dataConvert.list_cart);
        const { message } = await baseAPI.update(url_api.TRANSACTION, dataConvert);
        if (message === 'OK') {
            const newData = transaction.map((item) => {
                if (item.id === obj.id) return { ...item, ...obj };
                return item;
            });
            dispatch({
                type: typeAction.TRANSACTION.PUT,
                payload: { data: [...newData] },
            });
            messageAnt.success('Cập nhật thành công');
            callBack();
        } else messageAnt.warn(message);
    };

    return {
        transaction,
        getListTransaction,
        postTransaction,
        putTransaction,
    };
}

useTransactionBase.propTypes = {};

useTransactionBase.defaultProps = {};

export default useTransactionBase;
