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

const checkName = async (req, res, next) => {
    await CategoryModel.getByName(req.con, req.body.name, function (err, row) {
        if (err) return res.status(200).json({ message: err });
        if (row.length === 0) {
            req.statusCode = 204;
            next();
        } else if (row.length === 1) {
            req.statusCode = 402;
            req.category = row;
            next();
        } else return res.status(200).json({ message: 402 });
    });
};
module.exports = checkName;
