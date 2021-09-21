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
 * checkEmail: Kiểm tra xem thông tin đăng nhập
 * - Kiểm tra xem tài khoản có bị khóa không
 * - Kiểm tra xem mật khẩu có chính xác không
 * - Kiểm tra xem email đã có trong dữ liệu chưa
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const checkEmail = async (req, res, next) => {
    await UserModel.checkEmail(req.con, req.body, (err, rows) => {
        if (err) return res.status(404).json({ message: err });
        if (rows.length > 0) {
            const dataUser = rows[0];
            if (dataUser.status_user === 0) return res.status(200).json({ message: 'Tài khoản đã bị khóa' });
            if (dataUser.password === req.body.password) {
                let info = {};
                try {
                    info = JSON.parse(dataUser.info);
                } catch (e) {}
                delete dataUser.info;
                req.user = { ...dataUser, ...info };
                next();
            } else {
                return res.status(200).json({ message: 'Mật khẩu sai' });
            }
        } else return res.status(200).json({ message: 'Không tìm thấy Email' });
    });
};

module.exports = checkEmail;
