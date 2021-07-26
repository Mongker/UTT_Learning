/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const UserModel = require('../model/userModel');

module.exports = {
    // Đăng nhập
    LOGIN: function (req, res) {
        UserModel.checkEmail(req.con, req.body, function (err, rows) {
            if (err) return res.status(404).json({ message: err });
            if (rows.length > 0) {
                const dataUser = rows[0];
                if (dataUser.status_user === 0) return res.status(200).json({ message: 'Tài khoản đã bị khóa' });
                if (dataUser.password === req.body.password) {
                    console.log('dataUser.info', dataUser.info); // MongLV log fix bug
                    let info = {};
                    try {
                        info = JSON.parse(dataUser.info);
                        console.log('SON.parse(rows[0].info)', JSON.parse(rows[0].info)); // MongLV log fix bug
                    } catch (e) {}
                    delete dataUser.info;
                    console.log('info', info);
                    const dataNew = { ...dataUser, ...info };
                    console.log('dataNew', dataNew); // MongLV log fix bug
                    return res.status(200).json({ message: 'OK', user: dataNew });
                } else {
                    return res.status(200).json({ message: 'Mật khẩu sai' });
                }
            } else return res.status(200).json({ message: 'Không tìm thấy Email' });
        });
    },

    // Tạo tài khoản
    CREATE: function (req, res) {
        try {
            const { name, phone, email, address, info, position, role, coin, password, status_user } = req.body;
            const data = {
                name: name || 'Người dùng mới',
                phone: phone || '',
                email: email,
                address: address || '',
                info: '{}',
                position: 'Học viên',
                role: 'user', // Khởi tạo mặc định là user => quản trị viên sẽ xét thêm cho
                coin: '0',
                password: password,
                status_user: '1',
            };
            try {
                UserModel.checkPhone(req.con, data, function (err, rows) {
                    try {
                        if (err) return res.status(200).json({ message: err });
                        if (rows.length > 0) {
                            return res.status(200).json({ message: 'LIMIT' });
                        }
                    } catch (e) {}
                });
            } catch (e) {
                console.log('e', e);
            }
            try {
                UserModel.checkEmail(req.con, data, function (err, rows) {
                    try {
                        if (err) return res.status(200).json({ message: err });
                        if (rows.length > 0) {
                            return res.status(200).json({ message: 'LIMIT' });
                        } else {
                            UserModel.create(req.con, data, function (err) {
                                if (err) return res.status(404).json({ message: err });
                                UserModel.checkEmail(req.con, data, function (err, rows) {
                                    if (err) return res.status(404).json({ message: err });
                                    if (rows.length > 0) {
                                        const dataUser = rows[0];
                                        if (dataUser.password === req.body.password) {
                                            return res.status(200).json({ message: 'OK', user: dataUser });
                                        } else {
                                            return res.status(200).json({ message: 'FALSE PASSWORD' });
                                        }
                                    } else return res.status(200).json({ message: 'FALSE EMAIL' });
                                });
                            });
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });
            } catch (e) {
                console.log('e', e); // MongLV log fix bug
            }
        } catch (e) {
            console.log('e', e); // MongLV log fix bug
        }
    },

    // Lấy danh sách người dùng theo role
    GET_LIST: function (req, res) {
        try {
            let querySQL = '';

            // Mới hỗ trợ phương thức tìm kiếm where =
            // Sẽ làm thêm các phương thức khác thành base
            Object.entries(req.query).map((item, index) => {
                const key = item[0];
                const value = typeof item[1] === 'string' ? `'${item[1]}'` : item[1];
                index === 0 ? (querySQL = `${key} = ${value}`) : (querySQL = querySQL + ' and ' + `${key} = ${value}`);
            });
            UserModel.getList(req.con, querySQL, function (err, rows) {
                try {
                    const rowNew =
                        rows &&
                        rows.map((item) => {
                            let info = {};
                            try {
                                info = JSON.parse(`${item.info}`);
                            } catch (e) {}
                            delete item.password;
                            delete item.info;
                            return { ...item, ...info };
                        });
                    return res.status(200).json({ message: 'OK', users: rowNew });
                } catch (e) {
                    console.log('e', e); // MongLV log fix bug
                }
            });
        } catch (e) {
            console.log('e', e); // MongLV log fix bug
        }
    },
    UPDATE: function (req, res) {
        try {
            let querySQL = '';
            const id = req.body && req.body.id;
            const data = { email: req.body.email };
            const new_password = req.body['new_password'];
            console.log('new_password', new_password); // MongLV log fix bug
            const password = req.body['password'];
            delete req.body.id;
            delete req.body.email;
            delete req.body.create;
            delete req.body['new_password'];
            delete req.body['password'];

            Object.entries(req.body).map((item, index) => {
                const key = item[0];
                const value = `'${item[1]}'`;
                index === 0 ? (querySQL = `${key} = ${value}`) : (querySQL = querySQL + ', ' + `${key} = ${value}`);
            });

            // Note: cập nhật lại mật khẩu
            if (new_password) {
                UserModel.checkEmail(req.con, data, function (err, rows) {
                    try {
                        if (err) return res.status(404).json({ message: err });
                        if (rows.length > 0) {
                            const dataUser = rows[0];
                            if (dataUser.password === password) {
                                UserModel.update(req.con, id, `password = '${new_password}'`, function (err, data) {
                                    if (err) return res.status(200).json({ message: err });
                                    else return res.status(200).json({ message: 'OK' });
                                });
                            } else {
                                return res.status(200).json({ message: 'Mật khẩu không đúng' });
                            }
                        } else return res.status(200).json({ message: 'Lỗi không xác định email' });
                    } catch (e) {
                        console.log('e', e); // MongLV log fix bug
                    }
                });
            } else {
                if (querySQL.length > 0) {
                    UserModel.update(req.con, id, querySQL, function (err, data) {
                        if (err) return res.status(200).json({ message: err });
                        else return res.status(200).json({ message: 'OK' });
                    });
                } else return res.status(200).json({ message: 'Không có dữ liệu nào được gửi lên' });
            }
        } catch (e) {
            console.log('e', e); // MongLV log fix bug
        }
    },
};
