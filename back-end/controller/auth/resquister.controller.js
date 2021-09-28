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

const createUser = async (req, res, next) => {
    try {
        const { password, phone = '', email = '' } = req.body;
        // phone, email
        const data = {
            phone: phone,
            email: email,
            password: md5(password),
        };
		delete req.body.email;
		delete req.body.phone;
		req.body.account = phone || email;
		if(email && phone) {
			UserModel.create(req.con, data, function (err) {
				if (err) return res.status(404).json({ message: err });
				next();
			});
		} else return res.status(200).json({ message: 404 });
	} catch (e) {
        console.log('e', e);
    }
};

module.exports = createUser;
