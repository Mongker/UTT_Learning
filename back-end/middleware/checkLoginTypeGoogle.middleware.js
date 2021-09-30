/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author monglv@bkav.com on 29/09/2021
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';

const UserModel = require('../model/user.model');

/**
 * checkLoginTypeGoogle: Kiểm tra xem thông tin đăng nhập qua google
 * - Kiểm tra xem tài khoản có bị khóa không
 * - Kiểm tra xem đã tồn tại uid_google trên hệ thống chưa
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const checkLoginTypeGoogle = async (req, res, next) => {
    try {
        await UserModel.checkUidGoogle(req.con, req.body, (err, rows) => {
            if (err) return res.status(404).json({ message: err });
            if (Array.isArray(rows) && rows.length === 1) {
                const dataUser = rows[0];
                if (Number(dataUser.status_user) === 0)
                    return res.status(200).json({ message: 'Tài khoản đã bị khóa' });
                if (typeof dataUser === 'object') {
                    let info = {};
                    try {
                        info = JSON.parse(dataUser.info);
                    } catch (e) {}
                    delete dataUser.info;
                    req.user = { ...dataUser, ...info };
                    req.statusCode = 402;
                } else {
                    req.statusCode = 403;
                }
            } else {
                req.body.uid && (req.statusCode = 204);
            }
            next();
        });
    } catch (e) {
        console.log('e', e);
    }
};

module.exports = checkLoginTypeGoogle;
