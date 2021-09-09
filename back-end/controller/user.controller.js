/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const UserModel = require('../model/user.model');

const createUser = async (req, res) => {
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
            await UserModel.checkPhone(req.con, data, function (err, rows) {
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
            await UserModel.checkEmail(req.con, data, function (err, rows) {
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
};

const login = async (req, res) => {
    await UserModel.checkEmail(req.con, req.body, function (err, rows) {
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
                const dataNew = { ...dataUser, ...info };
                return res.status(200).json({ message: 'OK', user: dataNew });
            } else {
                return res.status(200).json({ message: 'Mật khẩu sai' });
            }
        } else return res.status(200).json({ message: 'Không tìm thấy Email' });
    });
};

const updateUser = async (req, res) => {
    try {
        let querySQL = '';
        const id = req.body && req.body.id;
        const data = { email: req.body.email };
        const new_password = req.body['new_password'];
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
            await UserModel.checkEmail(req.con, data, function (err, rows) {
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
                await UserModel.update(req.con, id, querySQL, function (err, data) {
                    if (err) return res.status(200).json({ message: err });
                    else return res.status(200).json({ message: 'OK' });
                });
            } else return res.status(200).json({ message: 'Không có dữ liệu nào được gửi lên' });
        }
    } catch (e) {
        console.log('e', e); // MongLV log fix bug
    }
};

const getListUser = (req, res) => {
    try {
        let querySQL = '';

        // Mới hỗ trợ phương thức tìm kiếm where =
        // Sẽ làm thêm các phương thức khác thành base
        Object.entries(req.query).map((item, index) => {
            const key = item[0];
            const value = typeof item[1] === 'string' ? `'${item[1]}'` : item[1];
            req.con.index === 0
                ? (querySQL = `${key} = ${value}`)
                : (querySQL = querySQL + ' and ' + `${key} = ${value}`);
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
};

module.exports = {
    // Đăng nhập
    LOGIN: login,

    // Tạo tài khoản
    CREATE: createUser,

    // Lấy danh sách người dùng theo role
    GET_LIST: getListUser,

    UPDATE: updateUser,
};
