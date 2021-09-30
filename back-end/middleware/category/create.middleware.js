/**
 * Copyright 2016-present, Bkav, Corp.
 * All rights reserved.
 *
 * This source code is licensed under the Bkav license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @author monglv@bkav.com on 30/09/2021
 *
 * History:
 * @modifier abc@bkav.com on xx/xx/xxxx đã chỉnh sửa abcxyx (Chỉ các thay đổi quan trọng mới cần ghi lại note này)
 */

'use strict';
const CategoryModel = require('../../model/categoryModel');

const create = async (req, res, next) => {
    if (req.statusCode === 204 && req.dataJwtDecoded.role === 'admin') {
        const timestamp_create = Number(new Date().getTime());
        const data = {
            timestamp_create: timestamp_create,
            ...req.body,
        };
        await CategoryModel.create(req.con, data, function (err) {
            if (err) return res.status(404).json({ message: err });
            req.statusCode = 200;
            req.break = true;
            next();
        });
    } else if (req.dataJwtDecoded.role !== 'admin') {
        return res.status(200).json({ message: 505 });
    } else {
        next();
    }
};
module.exports = create;
