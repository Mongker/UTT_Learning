/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 28/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const validateEmail = require('../util/validateEmail');

/**
 * Điều hướng key account qua email hoặc phone
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const checkAccount = async (req, res, next) => {
    req.body.account && validateEmail(req.body.account)
        ? (req.body.email = req.body.account)
        : (req.body.phone = req.body.account);
    next();
};
module.exports = checkAccount;
