/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 21/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const UserModel = require('../model/user.model');

/**
 * checkEmail: Kiểm tra xem email có tồn tại hay không
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const checkEmail = async (req, res, next) => {
    await UserModel.checkEmail(req.con, req.body, (err, rows) => {
        if (err) return res.json({ message: err });
        if (rows.length > 1) return res.json({ message: 402 });
        else {
            req.statusCode = 204;
            next();
        }
    });
};

module.exports = checkEmail;
