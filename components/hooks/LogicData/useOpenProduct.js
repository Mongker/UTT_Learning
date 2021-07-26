/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author monglv@bkav.com on 13/05/2021
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

import React from 'react';
import baseAPI from 'redux/api/baseAPI';
import { url_api } from '../../../util/TypeUI';
import MergeArr from '../../../util/MergeArr';
import typeAction from 'redux/actions/typeAction';
import { message as messageAnt } from 'antd';
import useUserBase from './useUserBase';
import { useDispatch } from 'react-redux';
import ContextApp from '../../../util/ContextApp';
// import PropTypes from 'prop-types';
const setLocalStore = (myUser) => {
    myUser &&
        Object.keys(myUser).map((item) => {
            localStorage.setItem(item, myUser[item]);
        });
};
function useOpenProduct() {
    const { updateUser, myUser, users } = useUserBase();
    const { setUser } = React.useContext(ContextApp);
    const dispatch = useDispatch();
    const handleOpenProduct = async (obj, handleCallBack = () => {}) => {
        const { message, data } = await baseAPI.getAll(url_api.OPEN, obj);
        if (message === 'OK') {
            handleCallBack();
            const newData = users.map((item) => {
                if (item.id === data.id) return { ...item, ...data };
                return item;
            });
            dispatch({
                type: typeAction.USER.GET_LIST,
                payload: { users: [...newData] },
            });
            // Update chính bản thân mình
            if (data.id === Number(myUser.id)) {
                setLocalStore({ ...myUser, ...data });
                console.log('myUser', myUser); // MongLV log fix bug
                console.log('data', data); // MongLV log fix bug
                console.log('xxxx', { ...myUser, ...data }); // MongLV log fix bug
                debugger; // MongLV
                setUser({ ...myUser, ...data });
            }
            messageAnt.success('Cập nhật thành công');
        } else messageAnt.warn(message);
    };

    return {
        handleOpenProduct,
    };
}

useOpenProduct.propTypes = {};

useOpenProduct.defaultProps = {};

export default useOpenProduct;
