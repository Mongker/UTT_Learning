/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 28/09/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
const md5 = require('md5');
const UserModel = require('../../model/user.model');

const generateUUID = () => {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
};

const createUser = async (req, res, next) => {
    try {
        const {
            password,
            phone = '',
            email = '',
            uid = '',
            displayName,
            name = '',
            photoURL,
            avatar = '',
            phoneNumber,
        } = req.body;
        // phone, email
        const _password = uid.length > 0 ? md5('123456') : md5(password);
        const data = {
            phone: phoneNumber || phone,
            email: email,
            password: _password,
            name: displayName || name,
            avatar: photoURL || avatar,
            uid: uid,
            type: uid ? 'google' : 'system',
            timestamp: Number(new Date().getTime()),
        };
        req.body.account = phone || email;

        if ((email && phone) || req.statusCode === 204) {
            UserModel.create(req.con, data, function (err) {
                if (err) return res.status(404).json({ message: err });
                next();
            });
        } else if (req.statusCode === 402) {
            next();
        } else return res.status(200).json({ message: req.statusCode });
    } catch (e) {
        console.log('e', e);
    }
};

module.exports = createUser;
