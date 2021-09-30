/**
 * Copyright 2020 present,Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 21/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const UserModel = require('../model/user.model');
const md5 = require('md5');

/**
 * checkEmail: Kiểm tra xem thông tin đăng nhập
 * - Kiểm tra xem tài khoản có bị khóa không
 * - Kiểm tra xem mật khẩu có chính xác không
 * - Kiểm tra xem email or số điện thoại đã có trong dữ liệu chưa
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const checkLogin = async (req, res, next) => {
    try {
        !req.body.password && (req.body.password = '');
        typeof req.dataJwtDecoded !== 'object' && (req.dataJwtDecoded = {});
        const pass_client = md5(req.body.password);
        if (req.body.email || req.dataJwtDecoded.email) {
            await UserModel.checkEmail(req.con, { email: req.body.email || req.dataJwtDecoded.email }, (err, rows) => {
                if (err) return res.status(404).json({ message: err });

                if (Array.isArray(rows) && rows.length > 0) {
                    const dataUser = rows[0];
                    if (dataUser.status_user === 0) return res.status(200).json({ message: 'Tài khoản đã bị khóa' });
                    if (dataUser.password === pass_client || dataUser.type !== 'system' || req.nextPasswold) {
                        let info = {};
                        console.log('case3');
                        try {
                            info = JSON.parse(dataUser.info);
                        } catch (e) {}
                        delete dataUser.info;
                        req.user = { ...dataUser, ...info };
                        next();
                    } else {
                        return res.status(200).json({ message: 403 });
                    }
                } else return res.status(200).json({ message: 204 });
            });
        } else if (req.body.phone || req.dataJwtDecoded.phone) {
            await UserModel.checkPhone(req.con, req.body, (err, rows) => {
                if (err) return res.status(404).json({ message: err });
                if (Array.isArray(rows) && rows.length > 0) {
                    const dataUser = rows[0];
                    if (dataUser.status_user === 0) return res.status(200).json({ message: 'Tài khoản đã bị khóa' });
                    if (dataUser.password === md5(req.body.password) || dataUser.type !== 'system') {
                        let info = {};
                        try {
                            info = JSON.parse(dataUser.info);
                        } catch (e) {}
                        delete dataUser.info;
                        req.user = { ...dataUser, ...info };
                        next();
                    } else {
                        return res.json({ message: 403 });
                    }
                } else return res.json({ message: 204 });
            });
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = checkLogin;
