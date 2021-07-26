/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 11/05/2021
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const CartModel = require('../model/cartModel');
function generateUUID() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}
module.exports = {
    CREATE: function (req, res) {
        let querySQL = '';
        req.body['status'] = 0;
        req.body['code'] = generateUUID().slice(0, 10);
        Object.entries(req.body).map((item, index) => {
            const key = item[0];
            const value = `'${item[1]}'`;
            index === 0 ? (querySQL = `${key} = ${value}`) : (querySQL = querySQL + ', ' + `${key} = ${value}`);
        });

        const querySQLGet = querySQL.replace(/,/g, ' and ');
        if (querySQL.length > 0 && req.body && req.body['product_id'] && req.body['user_id']) {
            CartModel.create(req.con, querySQL, function (err) {
                if (err) return res.status(404).json({ message: err });
                CartModel.getList(req.con, querySQLGet, function (err, row) {
                    console.log('row', row); // MongLV log fix bug
                    return res.status(200).json({ message: 'OK', data: row[0] });
                });
            });
        } else {
            return res.status(200).json({ message: 'Các trường thông tin không đầy đủ' });
        }
    },
    GET_LIST: function (req, res) {
        let querySQL = '';
        const isCode = req.query.code;
        delete req.query.code;
        Object.entries(req.query).map((item, index) => {
            const key = item[0];
            const value = `'${item[1]}'`;
            index === 0 ? (querySQL = `${key} = ${value}`) : (querySQL = querySQL + ' and ' + `${key} = ${value}`);
        });
        CartModel.getList(req.con, querySQL, function (err, row) {
            if (err) return res.status(404).json({ message: err });
            if (!isCode) {
                row.map((item) => {
                    delete item.code;
                });
            }

            return res.status(200).json({ message: 'OK', data: row });
        });
    },
    UPDATE: function (req, res) {
        let querySQL = '';
        const id = req.body && req.body.id;
        delete req.body.id;
        Object.entries(req.body).map((item, index) => {
            const key = item[0];
            const value = `'${item[1]}'`;
            index === 0 ? (querySQL = `${key} = ${value}`) : (querySQL = querySQL + ', ' + `${key} = ${value}`);
        });
        if (querySQL.length > 0) {
            CartModel.update(req.con, id, querySQL, function (err) {
                if (err) return res.status(200).json({ message: err });
                else return res.status(200).json({ message: 'OK' });
            });
        } else return res.status(200).json({ message: 'Không có dữ liệu nào được gửi lên' });
    },
    DELETE: function (req, res) {
        if(req.params.id) {
            CartModel.getList(req.con, `id = ${req.params.id}`, function (err, row) {
                if (err) return res.status(404).json({ message: err });
                console.log('row', row[0]); // MongLV log fix bug
                if (row[0].status === 0) {
                    CartModel.delete(req.con, req.params.id, function (err) {
                        if (err) return res.status(404).json({ message: err });
                        return res.status(200).json({ message: 'OK' });
                    });
                } else {
                    return res.status(200).json({ message: 'Bạn không có quyền xóa' });
                }
            });
        } else return res.status(200).json({ message: 'Không xác định được id để xóa' });
    },
};
