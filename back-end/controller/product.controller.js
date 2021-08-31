/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mongker on 22/04/2021
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const ProductModel = require('../model/productModel');

module.exports = {
    CREATE: function (req, res) {
        let querySQL = '';
        Object.entries(req.body).map((item, index) => {
            const key = item[0];
            const value = `'${item[1]}'`;
            index === 0
                ? (querySQL = `${key} = ${value}`)
                : (querySQL = querySQL + ', ' + `${key} = ${value}`);
        });
        if (
            querySQL.length > 0 &&
            req.body &&
            req.body['catalog_id'] &&
            req.body['catalog_id']
        ) {
            ProductModel.create(req.con, querySQL, function (err) {
                if (err) return res.status(404).json({ message: err });
                ProductModel.getByName(req.con, req.body.name, function (err, row) {
                    return res.status(200).json({ message: 'OK', data: row[0] });
                });
            });
        } else {
            return res.status(200).json({ message: 'Các trường thông tin không đầy đủ' });
        }
    },
    GET_LIST: function (req, res) {
        let querySQL = '';
        Object.entries(req.query).map((item, index) => {
            const key = item[0];
            const value = `'${item[1]}'`;
            index === 0
                ? (querySQL = `${key} = ${value}`)
                : (querySQL = querySQL + ', ' + `${key} = ${value}`);
        });
        ProductModel.getList(req.con, querySQL, function (err, row) {
            if (err) return res.status(404).json({ message: err });
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
            index === 0
                ? (querySQL = `${key} = ${value}`)
                : (querySQL = querySQL + ', ' + `${key} = ${value}`);
        });
        if (querySQL.length > 0) {
            ProductModel.update(req.con, id, querySQL, function (err) {
                if (err) return res.status(200).json({ message: err });
                else return res.status(200).json({ message: 'OK' });
            });
        } else
            return res.status(200).json({ message: 'Không có dữ liệu nào được gửi lên' });
    },
};
